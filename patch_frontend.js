const fs = require('fs');

// Patch Login.jsx
let loginFile = 'frontend/src/pages/Auth/Login.jsx';
let loginCode = fs.readFileSync(loginFile, 'utf8');

// Remove activeRole state
loginCode = loginCode.replace(/const \[activeRole, setActiveRole\] = useState\('student'\);\n/, '');

// Remove roleHint from login call
loginCode = loginCode.replace(/const result = await login\(email, password, activeRole\);/, 'const result = await login(email, password);');

// Remove Login as buttons grid block
loginCode = loginCode.replace(
  /<div style=\{\{ marginBottom: '1\.5rem' \}\}>\s*<label style=\{\{ display: 'block'.*?Login as<\/label>\s*<div style=\{\{ display: 'grid'.*?<\/button>\s*<\/button>\s*<\/div>\s*<\/div>/s,
  ''
);

fs.writeFileSync(loginFile, loginCode);

// Patch Signup.jsx
let signupFile = 'frontend/src/pages/Auth/Signup.jsx';
let signupCode = fs.readFileSync(signupFile, 'utf8');

// Remove role state
signupCode = signupCode.replace(/const \[role, setRole\] = useState\('student'\);\n/, '');

// Remove role from data payload
signupCode = signupCode.replace(/const data = \{ name, email, password, role \};/, 'const data = { name, email, password };');

fs.writeFileSync(signupFile, signupCode);
