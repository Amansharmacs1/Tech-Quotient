const fs = require('fs');

const path = 'frontend/src/pages/Settings/Settings.jsx';
let content = fs.readFileSync(path, 'utf8');

// Remove the Notifications tab button
content = content.replace(/<button[^>]*onClick={\(\) => setActiveTab\('notifications'\)}[\s\S]*?<\/button>/, '');

// Remove the Notifications content block
content = content.replace(/{activeTab === 'notifications' && \([\s\S]*?<\/div>\s*\)\s*}/, '');

fs.writeFileSync(path, content);
