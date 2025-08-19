#!/usr/bin/env python3

import requests
import json
import urllib.parse

def test_doaj_endpoint(url, params, description):
    """Test a DOAJ API endpoint and return results"""
    print(f"\n🔍 Testing: {description}")
    print(f"URL: {url}")
    print(f"Params: {params}")
    
    headers = {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; Academic Research Bot/1.0)'
    }
    
    try:
        response = requests.get(url, params=params, headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                data = response.json()
                print("✅ SUCCESS - JSON Response received")
                
                # Analyze response structure
                print(f"Response keys: {list(data.keys())}")
                
                # Look for results
                if 'results' in data:
                    results = data['results']
                    print(f"Found {len(results)} results in 'results' key")
                    if results:
                        first_result = results[0]
                        print(f"First result keys: {list(first_result.keys())}")
                        if 'bibjson' in first_result:
                            bibjson = first_result['bibjson']
                            print(f"First result title: {bibjson.get('title', 'No title')}")
                
                elif 'response' in data:
                    response_data = data['response']
                    print(f"Response data keys: {list(response_data.keys())}")
                    if 'docs' in response_data:
                        docs = response_data['docs']
                        print(f"Found {len(docs)} docs in response")
                        if docs:
                            first_doc = docs[0]
                            print(f"First doc keys: {list(first_doc.keys())}")
                
                # Print first 500 chars of response for analysis
                response_text = json.dumps(data, indent=2)[:500]
                print(f"Response preview:\n{response_text}...")
                
                return True, data
                
            except json.JSONDecodeError:
                print("❌ FAILED - Invalid JSON response")
                print(f"Response text: {response.text[:200]}...")
                return False, None
        else:
            print(f"❌ FAILED - HTTP {response.status_code}")
            print(f"Response: {response.text[:200]}...")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED - Request error: {e}")
        return False, None

def main():
    print("🔍 DOAJ API Endpoint Testing with Python")
    print("=" * 50)
    
    query = "ancient rome"
    encoded_query = urllib.parse.quote(query)
    
    # Test different DOAJ endpoints
    endpoints_to_test = [
        {
            'url': 'https://doaj.org/api/search/articles',
            'params': {'q': query, 'pageSize': 5},
            'description': 'DOAJ Base API - /api/search/articles'
        },
        {
            'url': 'https://doaj.org/api/v1/search/articles',
            'params': {'q': query, 'pageSize': 5},
            'description': 'DOAJ v1 API - /api/v1/search/articles'
        },
        {
            'url': 'https://doaj.org/api/v2/search/articles',
            'params': {'query': query, 'pageSize': 5},
            'description': 'DOAJ v2 API - /api/v2/search/articles'
        },
        {
            'url': 'https://doaj.org/api/v3/search/articles',
            'params': {'q': query, 'pageSize': 5},
            'description': 'DOAJ v3 API - /api/v3/search/articles'
        },
        {
            'url': 'https://doaj.org/api/articles',
            'params': {'q': query, 'pageSize': 5},
            'description': 'DOAJ Articles - /api/articles'
        },
        {
            'url': 'https://doaj.org/api/search',
            'params': {'q': query, 'pageSize': 5},
            'description': 'DOAJ Search - /api/search'
        }
    ]
    
    working_endpoints = []
    
    for endpoint_config in endpoints_to_test:
        success, data = test_doaj_endpoint(
            endpoint_config['url'],
            endpoint_config['params'],
            endpoint_config['description']
        )
        
        if success:
            working_endpoints.append({
                'config': endpoint_config,
                'data': data
            })
    
    print("\n" + "=" * 50)
    print("📊 SUMMARY")
    print("=" * 50)
    
    if working_endpoints:
        print(f"✅ Found {len(working_endpoints)} working endpoint(s):")
        for i, endpoint in enumerate(working_endpoints, 1):
            config = endpoint['config']
            data = endpoint['data']
            print(f"\n{i}. {config['description']}")
            print(f"   URL: {config['url']}")
            print(f"   Params: {config['params']}")
            
            # Analyze data structure
            if 'results' in data and data['results']:
                print(f"   Results: {len(data['results'])} articles found")
                first_result = data['results'][0]
                if 'bibjson' in first_result:
                    title = first_result['bibjson'].get('title', 'No title')
                    print(f"   Sample title: {title[:100]}...")
            elif 'response' in data and 'docs' in data['response']:
                docs = data['response']['docs']
                print(f"   Results: {len(docs)} articles found")
                if docs:
                    first_doc = docs[0]
                    title = first_doc.get('title', 'No title')
                    print(f"   Sample title: {title[:100]}...")
    else:
        print("❌ No working DOAJ endpoints found!")
        print("This might indicate:")
        print("- DOAJ API is down")
        print("- API endpoints have changed")
        print("- Network/CORS issues")
        print("- Authentication required")

if __name__ == "__main__":
    main()
