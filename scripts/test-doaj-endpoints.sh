#!/bin/bash

echo "🔍 Testing DOAJ API Endpoints"
echo "============================="

QUERY="ancient rome"
ENCODED_QUERY=$(echo "$QUERY" | sed 's/ /%20/g')

echo "Query: $QUERY"
echo "Encoded: $ENCODED_QUERY"
echo ""

# Test different DOAJ endpoints
endpoints=(
    "https://doaj.org/api/search/articles?q=$ENCODED_QUERY&pageSize=5"
    "https://doaj.org/api/v1/search/articles?q=$ENCODED_QUERY&pageSize=5"
    "https://doaj.org/api/v2/search/articles?query=$ENCODED_QUERY&pageSize=5"
    "https://doaj.org/api/v3/search/articles?q=$ENCODED_QUERY&pageSize=5"
    "https://doaj.org/api/articles?q=$ENCODED_QUERY&pageSize=5"
    "https://doaj.org/api/search?q=$ENCODED_QUERY&pageSize=5"
)

for endpoint in "${endpoints[@]}"; do
    echo "Testing: $endpoint"
    echo "----------------------------------------"
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code}" \
        -H "Accept: application/json" \
        -H "User-Agent: Mozilla/5.0 (compatible; Academic Research Bot/1.0)" \
        "$endpoint")
    
    http_code=$(echo "$response" | grep -o "HTTPSTATUS:[0-9]*" | cut -d: -f2)
    body=$(echo "$response" | sed -E 's/HTTPSTATUS:[0-9]*$//')
    
    echo "HTTP Status: $http_code"
    
    if [ "$http_code" = "200" ]; then
        echo "✅ SUCCESS"
        echo "Response preview:"
        echo "$body" | jq '.' 2>/dev/null | head -20 || echo "$body" | head -5
    else
        echo "❌ FAILED"
        echo "Error response:"
        echo "$body" | head -3
    fi
    
    echo ""
    echo "========================================"
    echo ""
done

echo "✅ DOAJ endpoint testing complete!"
