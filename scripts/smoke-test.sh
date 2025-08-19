#!/bin/bash
echo "🧪 Running smoke tests..."

# Test health endpoint
echo "Testing health endpoint..."
curl -f http://localhost:3000/api/health || echo "❌ Health check failed"

# Test KV connection
echo "Testing KV connection..."
curl -f http://localhost:3000/api/test-connection || echo "❌ KV connection failed"

# Test articles API
echo "Testing articles API..."
curl -f http://localhost:3000/api/articles || echo "❌ Articles API failed"

# Test article creation
echo "Testing article creation..."
curl -X POST http://localhost:3000/api/articles \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Smoke Test Article",
    "content": "This is a test article created during smoke testing.",
    "author": "Test System",
    "reference": "Smoke Test Reference"
  }' || echo "❌ Article creation failed"

echo "✅ Smoke tests completed"
