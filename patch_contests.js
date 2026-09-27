const fs = require('fs');
const file = 'frontend/src/components/student/Contests.jsx';
let code = fs.readFileSync(file, 'utf8');

// Import useAuth if needed
if (!code.includes("import { useAuth } from")) {
    code = code.replace(
        "import React, { useState } from 'react';",
        "import React, { useState } from 'react';\nimport { useAuth } from '../../contexts/AuthContext';"
    );
}

// Get user from useAuth
code = code.replace(
    "export default function Contests() {",
    "export default function Contests() {\n  const { user } = useAuth();\n  const myName = user?.name || 'Ansh Goyal';"
);

// Replace the string
code = code.replace(
    /\{ rank: 12, name: "Ansh Goyal \(You\)", score: 350, solved: 3, penalty: "48m" \}/,
    "{ rank: 12, name: `${myName} (You)`, score: 350, solved: 3, penalty: '48m' }"
);

// Replace includes
code = code.replace(/row\.name\.includes\('Ansh Goyal'\)/g, "row.name.includes(myName)");

fs.writeFileSync(file, code);
