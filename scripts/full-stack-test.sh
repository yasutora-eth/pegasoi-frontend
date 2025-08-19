#!/bin/bash
echo "🚀 Full Stack Integration Test"

# Backend URL
BACKEND_URL="http://localhost:8000"
FRONTEND_URL="http://localhost:3000"

echo "Testing Backend APIs..."

# Health check
echo "1. Health Check"
curl -s "$BACKEND_URL/health" | jq '.' || echo "❌ Health check failed"

# Articles CRUD
echo "2. Articles CRUD"
# Create
ARTICLE_ID=$(curl -s -X POST "$BACKEND_URL/articles/" \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Full Stack Test Article",
    "content": "Testing full integration between Next.js and FastAPI",
    "author": "Integration Test",
    "reference": "Full Stack Test"
  }' | jq -r '.id')

echo "Created article: $ARTICLE_ID"

# Read
curl -s "$BACKEND_URL/articles/$ARTICLE_ID" | jq '.' || echo "❌ Read failed"

# Update
curl -s -X PUT "$BACKEND_URL/articles/$ARTICLE_ID" \
  -H 'Content-Type: application/json' \
  -d '{"status": "published"}' | jq '.' || echo "❌ Update failed"

# List
curl -s "$BACKEND_URL/articles/" | jq 'length' || echo "❌ List failed"

# Multi-source search
echo "3. Multi-Source Search"
curl -s "$BACKEND_URL/search?query=quantum" | jq 'keys' || echo "❌ Search failed"

# Single source search
curl -s "$BACKEND_URL/search?query=quantum&source=arxiv" | jq '.' || echo "❌ Single source search failed"

# Cleanup
curl -s -X DELETE "$BACKEND_URL/articles/$ARTICLE_ID" || echo "❌ Delete failed"

echo "✅ Backend tests completed"

echo "Testing Frontend Integration..."
echo "Visit: $FRONTEND_URL/research-gallery"
echo "Visit: $FRONTEND_URL/system-check"

echo "🎉 Full stack test completed!"
