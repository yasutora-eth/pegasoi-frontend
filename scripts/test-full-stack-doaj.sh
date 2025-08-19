#!/bin/bash

echo "🔍 Full Stack DOAJ Testing"
echo "========================="

# Test DOAJ from backend directly
echo "Step 1: Testing DOAJ from backend..."
cd backend
python3 test_doaj_direct.py
cd ..

echo ""
echo "Step 2: Starting backend server..."
cd backend
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Wait for server to start
sleep 5

echo ""
echo "Step 3: Testing backend search endpoint..."
echo "Testing DOAJ endpoint specifically:"
curl -s "http://localhost:8000/search?query=ancient%20rome&source=doaj" | jq '.ok, .data.total, .fallback'

echo ""
echo "Testing multi-source search:"
curl -s "http://localhost:8000/search?query=ancient%20rome" | jq '.doaj.ok, .doaj.data.total, .doaj.fallback'

echo ""
echo "Step 4: Cleanup..."
kill $BACKEND_PID

echo "✅ Full stack DOAJ testing complete!"
