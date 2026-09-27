const fs = require('fs');
const file = 'frontend/src/components/student/Dashboard.jsx';
let code = fs.readFileSync(file, 'utf8');

// Import useAuth if needed
if (!code.includes("import { useAuth } from")) {
    code = code.replace(
        "import React from 'react';",
        "import React from 'react';\nimport { useAuth } from '../../contexts/AuthContext';"
    );
}

// Get user from useAuth
code = code.replace(
    "export default function StudentDashboard({ role = 'student' }) {",
    "export default function StudentDashboard({ role = 'student' }) {\n  const { user } = useAuth();"
);

// Replace welcome message
code = code.replace(
    "Welcome back, {isFaculty ? 'Professor' : studentInfo.name.split(' ')[0]} 👋",
    "Welcome back, {user?.name ? user.name.split(' ')[0] : 'Student'} 👋"
);

fs.writeFileSync(file, code);
