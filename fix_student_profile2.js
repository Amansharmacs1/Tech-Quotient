const fs = require('fs');

const path = 'frontend/src/components/student/Profile.jsx';
let content = fs.readFileSync(path, 'utf8');

// I will just do a regex replace to fix the syntax error
content = content.replace(
  /}\)\)\s*\)\s*\)\s*:\s*\(/g,
  '}) ) : ('
);

fs.writeFileSync(path, content);
