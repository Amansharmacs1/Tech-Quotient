const fs = require('fs');

// Patch Login.jsx
let loginFile = 'frontend/src/pages/Auth/Login.jsx';
let loginCode = fs.readFileSync(loginFile, 'utf8');

// 1. Remove activeRole
loginCode = loginCode.replace(/const \[activeRole, setActiveRole\] = useState\('student'\);\n\s*/, '');
// 2. Remove role pass to login
loginCode = loginCode.replace(/const result = await login\(email, password, activeRole\);/, 'const result = await login(email, password);');
// 3. Remove "Login as" block
const loginAsStart = loginCode.indexOf('<div style={{ marginBottom: \'1.5rem\' }}>\n            <label style={{ display: \'block\'');
if (loginAsStart !== -1) {
  const loginAsEnd = loginCode.indexOf('</button>\n            </div>\n          </div>', loginAsStart);
  if (loginAsEnd !== -1) {
    loginCode = loginCode.substring(0, loginAsStart) + loginCode.substring(loginAsEnd + 44);
  }
}

fs.writeFileSync(loginFile, loginCode);

// Patch Signup.jsx
let signupFile = 'frontend/src/pages/Auth/Signup.jsx';
let signupCode = fs.readFileSync(signupFile, 'utf8');

// 1. Remove setRole
signupCode = signupCode.replace(/const \[role, setRole\] = useState\('student'\);\n\s*/, '');
// 2. Remove role from data
signupCode = signupCode.replace(/const data = \{ name, email, password, role \};/, 'const data = { name, email, password };');

fs.writeFileSync(signupFile, signupCode);
