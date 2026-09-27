const fs = require('fs');
const file = 'backend/controllers/authController.js';
let code = fs.readFileSync(file, 'utf8');

// 1. Add whitelist
if (!code.includes('ALLOWED_FACULTY_EMAILS')) {
    code = code.replace("const generateToken = (user) => {", 
`const ALLOWED_FACULTY_EMAILS = [
  'amansharmacs11@gmail.com',
  'ansh1092.be24@chitkarauniversity.edu.in'
];

const generateToken = (user) => {`);
}

// 2. Remove role requirement from signupSendOTP
code = code.replace(
  "const { name, email, password, role } = req.body;\n    if (!name || !email || !password || !role) {",
  "const { name, email, password } = req.body;\n    if (!name || !email || !password) {"
);

// 3. Auto assign role in signupVerifyOTP
code = code.replace(
  "const { name, email, password, role, otp } = req.body;",
  "const { name, email, password, otp } = req.body;\n    const cleanEmailForRole = email.trim().toLowerCase();\n    const role = ALLOWED_FACULTY_EMAILS.includes(cleanEmailForRole) ? 'faculty' : 'student';"
);

// 4. Remove role requirement from loginUser
code = code.replace(
  "const { email, password, role } = req.body;\n    if (!email || !password || !role) return sendError(res, 'Please provide email, password, and portal role', 400);",
  "const { email, password } = req.body;\n    if (!email || !password) return sendError(res, 'Please provide email and password', 400);"
);

// 5. Remove role mismatch check from loginUser
code = code.replace(
  /    \/\/ Check role match\n    if \(dbUser\.role !== role\) {[\s\S]*?    }\n/,
  ""
);

fs.writeFileSync(file, code);
