#!/bin/bash

echo "🚀 Running All DOAJ Tests"
echo "========================"

echo "1. Testing DOAJ endpoints with curl..."
./scripts/test-doaj-endpoints.sh

echo ""
echo "2. Testing DOAJ endpoints with Python..."
python3 scripts/test-doaj-python.py

echo ""
echo "3. Testing DOAJ from backend..."
cd backend
python3 test_doaj_direct.py
cd ..

echo ""
echo "4. Full stack DOAJ test..."
./scripts/test-full-stack-doaj.sh

echo ""
echo "✅ All DOAJ tests complete!"
echo "Check the output above to identify working endpoints."
