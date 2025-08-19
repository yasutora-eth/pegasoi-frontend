#!/bin/bash
echo "🧪 Comprehensive Real API Testing"

# Test Python script for direct API calls
echo "=== Testing Direct API Calls ==="
cd backend && python test_real_apis.py

echo -e "\n=== Testing Backend Integration ==="
cd ..
./scripts/test-real-apis.sh

echo -e "\n=== Testing Frontend Processing ==="
echo "Visit: http://localhost:3000/api-testing"
echo "This page will test:"
echo "  ✅ Real API data retrieval"
echo "  ✅ XML/JSON parsing"
echo "  ✅ Data display formatting"
echo "  ✅ Error handling"

echo -e "\n=== Sample Queries to Test ==="
echo "  • 'quantum computing' - ArXiv speciality"
echo "  • 'machine learning' - DOAJ open access"
echo "  • 'artificial intelligence' - Crossref DOIs"
echo "  • 'ancient rome' - Getty cultural data"
echo "  • 'classical studies' - Multi-source"

echo -e "\n✅ Comprehensive testing setup complete!"
echo "Run the backend, then visit /api-testing to verify real data processing"
