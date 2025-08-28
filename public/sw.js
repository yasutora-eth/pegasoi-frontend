/**
 * Service Worker for PWA functionality.
 * Implements caching strategies and offline support.
 */

const CACHE_NAME = "research-portal-v1"
const STATIC_CACHE = "pegasoi-static-v1"
const DYNAMIC_CACHE = "pegasoi-dynamic-v1"

// Static assets to cache
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/_next/static/css/app/layout.css",
  "/_next/static/chunks/webpack.js",
  "/_next/static/chunks/main.js",
]

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /^https:\/\/api\.crossref\.org/,
  /^http:\/\/export\.arxiv\.org/,
  /^https:\/\/doaj\.org\/api/,
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...")

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => {
        console.log("Service Worker: Static assets cached")
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error("Service Worker: Error caching static assets", error)
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...")

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("Service Worker: Activated")
        return self.clients.claim()
      }),
  )
})

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  // Handle different types of requests
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request))
  } else if (isAPIRequest(request)) {
    event.respondWith(handleAPIRequest(request))
  } else if (isPageRequest(request)) {
    event.respondWith(handlePageRequest(request))
  } else {
    event.respondWith(handleOtherRequest(request))
  }
})

// Check if request is for static asset
function isStaticAsset(request) {
  const url = new URL(request.url)
  return url.pathname.includes("/_next/static/") || url.pathname.includes("/icon-") || url.pathname === "/manifest.json"
}

// Check if request is for API
function isAPIRequest(request) {
  const url = new URL(request.url)
  return url.pathname.startsWith("/api/") || API_CACHE_PATTERNS.some((pattern) => pattern.test(request.url))
}

// Check if request is for page
function isPageRequest(request) {
  const url = new URL(request.url)
  return request.headers.get("accept")?.includes("text/html")
}

// Handle static assets - Cache First strategy
async function handleStaticAsset(request) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.error("Service Worker: Error handling static asset", error)
    return new Response("Asset not available offline", { status: 503 })
  }
}

// Handle API requests - Network First with cache fallback
async function handleAPIRequest(request) {
  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      // Cache successful API responses
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log("Service Worker: Network failed, trying cache for API request")

    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      // Add offline indicator header
      const response = cachedResponse.clone()
      response.headers.set("X-Served-By", "service-worker-cache")
      return response
    }

    // Return offline response for API requests
    return new Response(
      JSON.stringify({
        error: "Service temporarily unavailable",
        message: "Please check your internet connection",
        offline: true,
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
          "X-Served-By": "service-worker-offline",
        },
      },
    )
  }
}

// Handle page requests - Network First with cache fallback
async function handlePageRequest(request) {
  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log("Service Worker: Network failed, trying cache for page request")

    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Return offline page
    return (
      caches.match("/") ||
      new Response(
        `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Offline - Pegasoi</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .offline-message { max-width: 400px; margin: 0 auto; }
          </style>
        </head>
        <body>
          <div class="offline-message">
            <h1>You're Offline</h1>
            <p>Please check your internet connection and try again.</p>
            <button onclick="window.location.reload()">Retry</button>
          </div>
        </body>
      </html>
      `,
        {
          status: 503,
          headers: { "Content-Type": "text/html" },
        },
      )
    )
  }
}

// Handle other requests - Network only
async function handleOtherRequest(request) {
  try {
    return await fetch(request)
  } catch (error) {
    return new Response("Service unavailable", { status: 503 })
  }
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Background sync triggered", event.tag)

  if (event.tag === "background-sync-articles") {
    event.waitUntil(syncOfflineActions())
  }
})

// Sync offline actions when connection is restored
async function syncOfflineActions() {
  try {
    // Get offline actions from IndexedDB or localStorage
    const offlineActions = await getOfflineActions()

    for (const action of offlineActions) {
      try {
        await fetch(action.url, {
          method: action.method,
          headers: action.headers,
          body: action.body,
        })

        // Remove successful action
        await removeOfflineAction(action.id)
      } catch (error) {
        console.error("Service Worker: Failed to sync action", error)
      }
    }
  } catch (error) {
    console.error("Service Worker: Background sync failed", error)
  }
}

// Placeholder functions for offline action management
async function getOfflineActions() {
  // Implementation would use IndexedDB
  return []
}

async function removeOfflineAction(actionId) {
  // Implementation would use IndexedDB
  // Offline action removed: actionId
}

// Push notification handling
self.addEventListener("push", (event) => {
  // Service Worker: Push notification received

  const options = {
    body: event.data ? event.data.text() : "New research articles available",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Explore",
        icon: "/icon-192.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/icon-192.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("Pegasoi Research Platform", options))
})

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Notification clicked")

  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"))
  }
})
