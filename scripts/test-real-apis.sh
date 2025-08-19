#!/bin/bash
echo "🧪 Testing Real External APIs with Live Data"

BACKEND_URL="http://localhost:8000"

echo "=== Testing ArXiv API ==="
echo "Query: quantum computing"
curl -s "$BACKEND_URL/search?query=quantum%20computing&source=arxiv" | jq '.ok, .data' | head -20

echo -e "\n=== Testing DOAJ API ==="
echo "Query: machine learning"
curl -s "$BACKEND_URL/search?query=machine%20learning&source=doaj" | jq '.ok, .data.results[0].bibjson.title' 2>/dev/null || echo "DOAJ response format check"

echo -e "\n=== Testing Crossref API ==="
echo "Query: artificial intelligence"
curl -s "$BACKEND_URL/search?query=artificial%20intelligence&source=crossref" | jq '.ok, .data.message.items[0].title[0]' 2>/dev/null || echo "Crossref response format check"

echo -e "\n=== Testing Getty API ==="
echo "Query: ancient rome"
curl -s "$BACKEND_URL/search?query=ancient%20rome&source=getty" | jq '.ok, .error' 2>/dev/null || echo "Getty response check"

echo -e "\n=== Testing Multi-Source Search ==="
echo "Query: classical studies"
curl -s "$BACKEND_URL/search?query=classical%20studies" | jq 'keys'

echo -e "\n✅ Real API tests completed"
