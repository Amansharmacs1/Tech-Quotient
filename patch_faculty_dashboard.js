const fs = require('fs');
const file = 'frontend/src/pages/Dashboard.jsx';
let code = fs.readFileSync(file, 'utf8');

// Import useAuth if needed
if (!code.includes("import { useAuth } from")) {
    code = code.replace(
        "import React from 'react';",
        "import React from 'react';\nimport { useAuth } from '../contexts/AuthContext';"
    );
}

// Get user from useAuth
code = code.replace(
    "export default function Dashboard() {",
    "export default function Dashboard() {\n  const { user } = useAuth();"
);

// Replace welcome message
code = code.replace(
    "<h1 className=\"text-3xl font-bold text-secondary\">Welcome back, Professor 👋</h1>",
    "<h1 className=\"text-3xl font-bold text-secondary\">Welcome back, {user?.name ? user.name.split(' ')[0] : 'Professor'} 👋</h1>"
);

fs.writeFileSync(file, code);
