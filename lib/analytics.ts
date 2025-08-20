// Google Analytics 4 implementation
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Type declaration for gtag
type GtagCommand = 'config' | 'event' | 'js'
type GtagEvent = string
type GtagConfig = Record<string, unknown>

declare global {
  interface Window {
    gtag: (command: GtagCommand, target: string, config?: GtagConfig) => void
  }
}
