import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

async function runTests() {
  console.log("Starting backend API tests...");
  let passed = 0;
  let failed = 0;

  const endpoints = [
    { method: 'GET', url: '/courses' },
    { method: 'GET', url: '/problems' },
    { method: 'GET', url: '/assignments' },
    { method: 'GET', url: '/students' },
    { method: 'GET', url: '/submissions' },
    { method: 'GET', url: '/analytics/dashboard' },
    { method: 'GET', url: '/analytics/full' },
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await axios({
        method: endpoint.method,
        url: `${API_URL}${endpoint.url}`,
      });
      console.log(`✅ [${endpoint.method}] ${endpoint.url} - ${res.status}`);
      passed++;
    } catch (err) {
      console.error(`❌ [${endpoint.method}] ${endpoint.url} - Error: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nTests completed. Passed: ${passed}, Failed: ${failed}`);
  if (failed > 0) process.exit(1);
}

runTests();
