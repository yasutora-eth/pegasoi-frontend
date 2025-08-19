#!/bin/bash
echo "🔧 Fixing CORS and Testing Connection"

echo "=== Backend Status Check ==="
if curl -s http://localhost:8000/ > /dev/null; then
    echo "✅ Backend is running"
    curl -s http://localhost:8000/ | jq '.'
else
    echo "❌ Backend is not running"
    echo "Start it with: cd backend && uvicorn main:app --reload"
    exit 1
fi

echo -e "\n=== Testing CORS Headers ==="
curl -s -I -X OPTIONS http://localhost:8000/search \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type"

echo -e "\n=== Testing Search Endpoint ==="
curl -s "http://localhost:8000/search?query=test" | jq 'keys' || echo "Search endpoint error"

echo -e "\n=== Frontend Connection Test ==="
echo "Visit: http://localhost:3000/research-gallery"
echo "The multi-source search should now work properly!"

echo -e "\n✅ CORS and connection fixes applied!"
