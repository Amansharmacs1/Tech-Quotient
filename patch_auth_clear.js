const fs = require('fs');
const path = 'frontend/src/contexts/AuthContext.jsx';
let content = fs.readFileSync(path, 'utf-8');

const patch = `
const CURRENT_AUTH_VERSION = 'v2_clean';
if (typeof window !== 'undefined' && localStorage.getItem('auth_version') !== CURRENT_AUTH_VERSION) {
  localStorage.removeItem('techquotient_user');
  localStorage.removeItem('techquotient_token');
  localStorage.removeItem('token');
  localStorage.setItem('auth_version', CURRENT_AUTH_VERSION);
}

const AuthContext = createContext(null);
`;

content = content.replace('const AuthContext = createContext(null);', patch);
fs.writeFileSync(path, content);
