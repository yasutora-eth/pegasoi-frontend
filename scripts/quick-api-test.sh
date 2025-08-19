#!/bin/bash

echo "⚡ Quick API Test - Find Working Endpoints"
echo "========================================="

# Test ArXiv (should always work)
echo "📚 Testing ArXiv..."
curl -s "http://export.arxiv.org/api/query?search_query=all:ancient%20rome&start=0&max_results=3" | grep -o "<title>[^<]*</title>" | head -3

# Test Crossref (should always work)
echo ""
echo "📖 Testing Crossref..."
curl -s "https://api.crossref.org/works?query=ancient%20rome&rows=3" | jq '.message.items[0].title[0]' 2>/dev/null || echo "Crossref failed"

# Test DOAJ endpoints
echo ""
echo "📰 Testing DOAJ endpoints..."

DOAJ_ENDPOINTS=(
    "https://doaj.org/api/search/articles?q=ancient%20rome&pageSize=3"
    "https://doaj.org/api/v1/search/articles?q=ancient%20rome&pageSize=3"
    "https://doaj.org/api/v2/search/articles?query=ancient%20rome&pageSize=3"
    "https://doaj.org/api/articles?q=ancient%20rome&pageSize=3"
)

for endpoint in "${DOAJ_ENDPOINTS[@]}"; do
    echo "Testing: $endpoint"
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" "$endpoint")
    http_code=$(echo "$response" | grep -o "HTTPSTATUS:[0-9]*" | cut -d: -f2)
    
    if [ "$http_code" = "200" ]; then
        echo "✅ SUCCESS - HTTP 200"
        # Try to extract a title
        echo "$response" | jq '.results[0].bibjson.title' 2>/dev/null || echo "$response" | jq '.response.docs[0].title' 2>/dev/null || echo "Response received but couldn't parse title"
    else
        echo "❌ FAILED - HTTP $http_code"
    fi
    echo ""
done

# Test Getty (likely to fail due to CORS/auth)
echo "🎨 Testing Getty Museum..."
curl -s -w "HTTPSTATUS:%{http_code}" "https://data.getty.edu/museum/collection/object?q=ancient%20rome&limit=3" | grep -o "HTTPSTATUS:[0-9]*" | cut -d: -f2

echo ""
echo "✅ Quick API test complete!"
echo "Use the working endpoints in your backend configuration."
