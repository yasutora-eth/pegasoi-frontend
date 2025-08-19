#!/bin/bash
echo "🔍 Testing Real Search Functionality"

echo "=== Testing Backend Search ==="
if curl -s http://localhost:8000/ > /dev/null; then
    echo "✅ Backend is running"
    
    echo "Testing 'ancient rome' search..."
    curl -s "http://localhost:8000/search?query=ancient%20rome" | jq '.arxiv.ok, .doaj.ok, .crossref.ok, .getty.ok'
    
    echo "Testing 'quantum computing' search..."
    curl -s "http://localhost:8000/search?query=quantum%20computing" | jq '.arxiv.data.total, .doaj.data.total, .crossref.data.total'
    
    echo "Testing 'machine learning' search..."
    curl -s "http://localhost:8000/search?query=machine%20learning" | jq '.doaj.data.total, .crossref.data.total'
    
else
    echo "❌ Backend is not running"
    echo "Start it with: cd backend && uvicorn main:app --reload"
fi

echo -e "\n=== Testing Direct API Access ==="
echo "Testing ArXiv directly..."
curl -s "https://export.arxiv.org/api/query?search_query=all:ancient%20rome&start=0&max_results=3" | head -20

echo -e "\nTesting DOAJ directly..."
curl -s "https://doaj.org/api/v2/search/articles?query=ancient%20rome&page=1&pageSize=3" | jq '.total' 2>/dev/null || echo "DOAJ response received"

echo -e "\nTesting Crossref directly..."
curl -s "https://api.crossref.org/works?query=ancient%20rome&rows=3" | jq '.message.items | length' 2>/dev/null || echo "Crossref response received"

echo -e "\n✅ Real search testing complete!"
echo "Visit: http://localhost:3000/research-gallery"
echo "Try searching for: 'ancient rome', 'quantum physics', 'machine learning'"
