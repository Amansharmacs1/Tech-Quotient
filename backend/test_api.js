import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

async function runTests() {
  console.log("==========================================");
  console.log("🚀 Testing TechQuotient Unified API Suite");
  console.log("==========================================");

  let passed = 0;
  let failed = 0;
  let studentToken = 'mock-jwt-token-student';
  let facultyToken = 'mock-jwt-token-faculty';

  // 1. Healthcheck
  try {
    const res = await axios.get(`${API_URL}/health`);
    console.log(`✅ [GET] /health - Status: ${res.status}`);
    passed++;
  } catch (err) {
    console.error(`❌ [GET] /health - Error: ${err.message}`);
    failed++;
  }

  // 2. Student Login
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email: 'ansh.goyal@chitkarauniversity.edu.in',
      password: 'student123',
      role: 'student'
    });
    console.log(`✅ [POST] /auth/login (Student) - Token obtained`);
    if (res.data.token) studentToken = res.data.token;
    passed++;
  } catch (err) {
    console.error(`❌ [POST] /auth/login (Student) - Error: ${err.message}`);
    failed++;
  }

  // 3. Faculty Login
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email: 'prof.doe@chitkarauniversity.edu.in',
      password: 'faculty123',
      role: 'faculty'
    });
    console.log(`✅ [POST] /auth/login (Faculty) - Token obtained`);
    if (res.data.token) facultyToken = res.data.token;
    passed++;
  } catch (err) {
    console.error(`❌ [POST] /auth/login (Faculty) - Error: ${err.message}`);
    failed++;
  }

  // 4. Protected Student Profile
  try {
    const res = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    console.log(`✅ [GET] /auth/profile - User: ${res.data.profile?.name || res.data.user?.name}`);
    passed++;
  } catch (err) {
    console.error(`❌ [GET] /auth/profile - Error: ${err.message}`);
    failed++;
  }

  // 5. Courses List
  try {
    const res = await axios.get(`${API_URL}/courses`);
    const count = res.data.courses?.length || res.data.data?.length || 0;
    console.log(`✅ [GET] /courses - Found ${count} courses`);
    passed++;
  } catch (err) {
    console.error(`❌ [GET] /courses - Error: ${err.message}`);
    failed++;
  }

  // 6. Problems List
  try {
    const res = await axios.get(`${API_URL}/problems`);
    const count = res.data.problems?.length || res.data.data?.length || 0;
    console.log(`✅ [GET] /problems - Found ${count} problems`);
    passed++;
  } catch (err) {
    console.error(`❌ [GET] /problems - Error: ${err.message}`);
    failed++;
  }

  // 7. Assignments List
  try {
    const res = await axios.get(`${API_URL}/assignments`);
    const count = res.data.assignments?.length || res.data.data?.length || 0;
    console.log(`✅ [GET] /assignments - Found ${count} assignments`);
    passed++;
  } catch (err) {
    console.error(`❌ [GET] /assignments - Error: ${err.message}`);
    failed++;
  }

  // 8. Code Run (Judge0 / fallback)
  try {
    const res = await axios.post(`${API_URL}/submissions/run`, {
      code: 'print("Two Sum Solution")',
      language: 'python',
      problemId: 'prob-1'
    }, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    console.log(`✅ [POST] /submissions/run - Status: ${res.data.result?.status}`);
    passed++;
  } catch (err) {
    console.error(`❌ [POST] /submissions/run - Error: ${err.message}`);
    failed++;
  }

  // 9. Code Submit
  try {
    const res = await axios.post(`${API_URL}/submissions/submit`, {
      code: 'print("Two Sum Submit")',
      language: 'python',
      problemId: 'prob-1'
    }, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    console.log(`✅ [POST] /submissions/submit - Status: ${res.data.result?.status}`);
    passed++;
  } catch (err) {
    console.error(`❌ [POST] /submissions/submit - Error: ${err.message}`);
    failed++;
  }

  // 10. Faculty Submissions Review
  try {
    const res = await axios.get(`${API_URL}/submissions`);
    const count = res.data.submissions?.length || res.data.data?.length || 0;
    console.log(`✅ [GET] /submissions - Found ${count} submissions`);
    passed++;
  } catch (err) {
    console.error(`❌ [GET] /submissions - Error: ${err.message}`);
    failed++;
  }

  // 11. Faculty Students Directory
  try {
    const res = await axios.get(`${API_URL}/students`);
    const count = res.data.students?.length || res.data.data?.length || 0;
    console.log(`✅ [GET] /students - Found ${count} students`);
    passed++;
  } catch (err) {
    console.error(`❌ [GET] /students - Error: ${err.message}`);
    failed++;
  }

  // 12. Contests Arena
  try {
    const res = await axios.get(`${API_URL}/contests`);
    const count = res.data.contests?.length || res.data.data?.length || 0;
    console.log(`✅ [GET] /contests - Found ${count} contests`);
    passed++;
  } catch (err) {
    console.error(`❌ [GET] /contests - Error: ${err.message}`);
    failed++;
  }

  // 13. Faculty Dashboard Analytics
  try {
    const res = await axios.get(`${API_URL}/analytics/dashboard`);
    console.log(`✅ [GET] /analytics/dashboard - Metrics loaded`);
    passed++;
  } catch (err) {
    console.error(`❌ [GET] /analytics/dashboard - Error: ${err.message}`);
    failed++;
  }

  // 14. Student Performance Analytics
  try {
    const res = await axios.get(`${API_URL}/analytics/student`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    console.log(`✅ [GET] /analytics/student - Student stats loaded`);
    passed++;
  } catch (err) {
    console.error(`❌ [GET] /analytics/student - Error: ${err.message}`);
    failed++;
  }

  // 15. Notifications Hub
  try {
    const res = await axios.get(`${API_URL}/notifications`);
    const count = res.data.notifications?.length || res.data.data?.length || 0;
    console.log(`✅ [GET] /notifications - Found ${count} notifications`);
    passed++;
  } catch (err) {
    console.error(`❌ [GET] /notifications - Error: ${err.message}`);
    failed++;
  }

  // 16. AI Assistant Mentor Chat
  try {
    const res = await axios.post(`${API_URL}/ai/chat`, {
      query: 'Explain AVL tree rotations with code example',
      code: 'class Node { int key; }'
    });
    console.log(`✅ [POST] /ai/chat - AI responded`);
    passed++;
  } catch (err) {
    console.error(`❌ [POST] /ai/chat - Error: ${err.message}`);
    failed++;
  }

  console.log("==========================================");
  console.log(`Test Results: ${passed} PASSED, ${failed} FAILED`);
  console.log("==========================================");

  if (failed > 0) process.exit(1);
}

runTests();
