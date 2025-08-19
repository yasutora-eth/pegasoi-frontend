#!/bin/bash

echo "🚀 Comprehensive Full Stack API Testing"
echo "======================================="

# Make all scripts executable
chmod +x scripts/test-doaj-endpoints.sh
chmod +x scripts/test-full-stack-doaj.sh

echo "📋 Test Plan:"
echo "1. Test individual API endpoints"
echo "2. Test backend comprehensive API testing"
echo "3. Start backend and test search endpoints"
echo "4. Test frontend integration"
echo ""

# Step 1: Test individual endpoints
echo "🔍 Step 1: Testing individual API endpoints"
echo "============================================"

echo "Testing DOAJ endpoints..."
./scripts/test-doaj-endpoints.sh

echo ""
echo "Testing with Python comprehensive script..."
python3 scripts/test-doaj-python.py

# Step 2: Backend comprehensive testing
echo ""
echo "🔍 Step 2: Backend comprehensive API testing"
echo "============================================="

cd backend
echo "Running comprehensive API test..."
python3 test_all_apis_comprehensive.py
cd ..

# Step 3: Backend integration testing
echo ""
echo "🔍 Step 3: Backend integration testing"
echo "======================================"

echo "Starting backend server..."
cd backend
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 5

# Test health endpoint
echo "Testing health endpoint..."
curl -s "http://localhost:8000/health" | jq '.'

# Test multi-source search
echo ""
echo "Testing multi-source search endpoint..."
curl -s "http://localhost:8000/search?query=ancient%20rome" | jq '.doaj.ok, .arxiv.ok, .crossref.ok, .getty.ok'

# Test individual source endpoints
echo ""
echo "Testing individual source endpoints..."

echo "DOAJ endpoint:"
curl -s "http://localhost:8000/search?query=ancient%20rome&source=doaj" | jq '.ok, .data.total'

echo "ArXiv endpoint:"
curl -s "http://localhost:8000/search?query=ancient%20rome&source=arxiv" | jq '.ok, .data.total'

echo "Crossref endpoint:"
curl -s "http://localhost:8000/search?query=ancient%20rome&source=crossref" | jq '.ok, .data.total'

echo "Getty endpoint:"
curl -s "http://localhost:8000/search?query=ancient%20rome&source=getty" | jq '.ok, .data.total'

# Step 4: Frontend testing
echo ""
echo "🔍 Step 4: Frontend integration testing"
echo "======================================="

echo "Starting Next.js frontend..."
npm run dev &
FRONTEND_PID=$!

echo "Waiting for frontend to start..."
sleep 10

echo "Frontend should be running at http://localhost:3000"
echo "Test the search functionality manually in the browser"

# Cleanup
echo ""
echo "🧹 Cleanup"
echo "=========="

echo "Stopping backend server..."
kill $BACKEND_PID

echo "Stopping frontend server..."
kill $FRONTEND_PID

echo ""
echo "✅ Comprehensive testing complete!"
echo ""
echo "📊 Summary:"
echo "- Check the output above for API endpoint status"
echo "- Working endpoints will show 'ok: true' and 'total > 0'"
echo "- Failed endpoints will show 'ok: false' with error messages"
echo "- DOAJ fallback data should always work even if API fails"
echo "- Getty Museum fallback data provides curated content"
echo ""
echo "🎯 Next Steps:"
echo "1. Review the test output to identify working APIs"
echo "2. Update backend configuration if needed"
echo "3. Test the frontend search interface"
echo "4. Verify fallback systems are working"
