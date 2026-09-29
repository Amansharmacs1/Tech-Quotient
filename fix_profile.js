const fs = require('fs');

const path = 'frontend/src/pages/Settings/Settings.jsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('useAuth')) {
    content = content.replace("import { changePasswordApi }", "import { useAuth } from '../../contexts/AuthContext';\nimport { changePasswordApi }");
}

if (!content.includes('const { user } = useAuth();')) {
    content = content.replace("const [activeTab, setActiveTab] = useState('profile');", "const { user } = useAuth();\n  const [activeTab, setActiveTab] = useState('profile');");
}

content = content.replace('defaultValue="John Smith"', 'value={user?.name || ""} disabled readOnly');
content = content.replace('defaultValue="john.smith@university.edu"', 'value={user?.email || ""} disabled readOnly');
content = content.replace('defaultValue="Computer Science"', 'value={user?.department || "Computer Science"} disabled readOnly');
content = content.replace('defaultValue="Senior Professor"', 'value={user?.title || "Faculty Member"} disabled readOnly');

// Also need to adjust the Role input to value, previously it might have been missing Role if it wasn't there? Oh wait, let's just make it readOnly
// We will change all those fields to be disabled/readOnly to emphasize they are fixed.

fs.writeFileSync(path, content);
