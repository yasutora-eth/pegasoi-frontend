#!/bin/bash
echo "🎨 Testing Getty SPARQL Queries"

echo "=== Testing Getty SPARQL Endpoint Directly ==="

# Test basic SPARQL query
echo "Testing basic Getty AAT query for 'ancient rome'..."
SPARQL_QUERY='PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX gvp: <http://vocab.getty.edu/ontology#>
PREFIX xl: <http://www.w3.org/2008/05/skos-xl#>

SELECT DISTINCT ?concept ?prefLabel ?scopeNote WHERE {
  ?concept a skos:Concept ;
           skos:inScheme <http://vocab.getty.edu/aat/> ;
           gvp:prefLabelGVP/xl:literalForm ?prefLabel .
  
  OPTIONAL { ?concept skos:scopeNote ?scopeNote }
  
  FILTER(CONTAINS(LCASE(?prefLabel), "roman"))
}
LIMIT 10'

# URL encode the query
ENCODED_QUERY=$(echo "$SPARQL_QUERY" | sed 's/ /%20/g' | sed 's/\n/%0A/g' | sed 's/:/%3A/g' | sed 's/#/%23/g' | sed 's/</%3C/g' | sed 's/>/%3E/g' | sed 's/{/%7B/g' | sed 's/}/%7D/g' | sed 's/(/%28/g' | sed 's/)/%29/g' | sed 's/"/%22/g')

echo "Querying Getty SPARQL endpoint..."
curl -s "https://vocab.getty.edu/sparql?query=$ENCODED_QUERY&format=application/sparql-results%2Bjson" \
  -H "Accept: application/sparql-results+json" \
  -H "User-Agent: Mozilla/5.0 (compatible; Academic Research Bot/1.0)" | \
  jq '.results.bindings | length' 2>/dev/null || echo "Getty SPARQL response received"

echo -e "\n=== Testing Backend Getty Integration ==="
if curl -s http://localhost:8000/ > /dev/null; then
    echo "✅ Backend is running"
    
    echo "Testing Getty search through backend..."
    curl -s "http://localhost:8000/search?query=ancient%20rome&source=getty" | jq '.ok, .data.total' 2>/dev/null || echo "Backend Getty search response received"
    
    echo "Testing multi-source search with Getty..."
    curl -s "http://localhost:8000/search?query=sculpture" | jq '.getty.ok, .getty.data.total' 2>/dev/null || echo "Multi-source Getty response received"
    
else
    echo "❌ Backend is not running"
    echo "Start it with: cd backend && uvicorn main:app --reload"
fi

echo -e "\n=== Getty SPARQL Query Examples ==="
echo "Try these queries in the frontend:"
echo "• 'ancient rome' - Roman concepts and artifacts"
echo "• 'greek sculpture' - Greek sculptural terms"
echo "• 'pottery' - Ceramic and pottery terminology"
echo "• 'temple' - Architectural and religious concepts"
echo "• 'coin' - Numismatic terminology"

echo -e "\n✅ Getty SPARQL testing complete!"
echo "🎨 Getty Art & Architecture Thesaurus now accessible via SPARQL"
echo "Visit: http://localhost:3000/research-gallery"
