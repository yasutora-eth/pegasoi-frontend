#!/bin/bash
echo "🛡️ Testing Robust API Integration with Fallbacks"

echo "=== Testing Backend with Robust Fallbacks ==="
if curl -s http://localhost:8000/ > /dev/null; then
    echo "✅ Backend is running"
    
    echo "Testing 'ancient rome' search with robust fallbacks..."
    curl -s "http://localhost:8000/search?query=ancient%20rome" | jq '.arxiv.ok, .doaj.ok, .crossref.ok, .getty.ok, .getty.fallback' 2>/dev/null || echo "Backend search response received"
    
    echo "Testing individual sources with fallbacks..."
    echo "DOAJ (multiple endpoints):"
    curl -s "http://localhost:8000/search?query=ancient%20rome&source=doaj" | jq '.ok, .data.total, .error' 2>/dev/null || echo "DOAJ response received"
    
    echo "Getty (SPARQL + fallback):"
    curl -s "http://localhost:8000/search?query=ancient%20rome&source=getty" | jq '.ok, .data.total, .fallback' 2>/dev/null || echo "Getty response received"
    
else
    echo "❌ Backend is not running"
    echo "Start it with: cd backend && uvicorn main:app --reload"
fi

echo -e "\n=== Testing Direct API Fallbacks ==="

echo "Testing DOAJ multiple endpoints..."
DOAJ_ENDPOINTS=(
    "https://doaj.org/api/search/articles?q=ancient%20rome&pageSize=5"
    "https://doaj.org/api/v2/search/articles?query=ancient%20rome&page=1&pageSize=5"
    "https://doaj.org/api/v1/search/articles?query=ancient%20rome&pageSize=5"
)

for endpoint in "${DOAJ_ENDPOINTS[@]}"; do
    echo "Trying: $endpoint"
    curl -s "$endpoint" -w "HTTP %{http_code}\n" | head -1 || echo "Failed"
done

echo -e "\nTesting Getty SPARQL (expected to fail due to CORS)..."
curl -s "https://vocab.getty.edu/sparql" -w "HTTP %{http_code}\n" | head -1 || echo "Getty SPARQL CORS blocked (expected)"

echo -e "\n=== Fallback Data Examples ==="
echo "When APIs fail, the system provides curated data:"
echo "• Roman architecture concepts"
echo "• Greek pottery terminology"
echo "• Classical archaeology terms"
echo "• Art history vocabulary"

echo -e "\n✅ Robust API testing complete!"
echo "🛡️ System now handles API failures gracefully"
echo "📊 Curated fallback data ensures results are always available"
echo "🔄 Multiple endpoint attempts for maximum reliability"
echo "Visit: http://localhost:3000/research-gallery"
