const fs = require('fs');
const file = 'frontend/src/components/student/Profile.jsx';
let code = fs.readFileSync(file, 'utf8');

// Import useAuth
if (!code.includes("import { useAuth } from")) {
    code = code.replace(
        "import { studentProfile as initialProfile } from '../../data/mockData';",
        "import { studentProfile as initialProfile } from '../../data/mockData';\nimport { useAuth } from '../../contexts/AuthContext';"
    );
}

// Get user from useAuth
code = code.replace(
    "export default function Profile({ role = 'student', onUpdateProfile }) {",
    "export default function Profile({ role = 'student', onUpdateProfile }) {\n  const { user } = useAuth();"
);

// Inject user.name into initial state
code = code.replace(
    "name: profile.name,",
    "name: user?.name || profile.name,"
);

// Replace profile.name with user?.name || profile.name in banner
code = code.replace(
    "<h1 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800 }}>{profile.name}</h1>",
    "<h1 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800 }}>{user?.name || profile.name}</h1>"
);
// Also email
code = code.replace(
    "<Mail size={16} style={{ display: 'inline', marginRight: '4px' }} /> {profile.email}",
    "<Mail size={16} style={{ display: 'inline', marginRight: '4px' }} /> {user?.email || profile.email}"
);

fs.writeFileSync(file, code);
