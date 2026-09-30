const fs = require('fs');

function replaceInFile(filePath, regex, replacement) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(filePath, content);
}

replaceInFile('frontend/src/layout/Navbar.jsx', 
  /const displayName = .*;/, 
  "const displayName = user?.name || 'User';"
);

replaceInFile('frontend/src/components/student/Profile.jsx', 
  /const displayName = .*;/, 
  "const displayName = user?.name || 'Student';"
);

replaceInFile('frontend/src/components/student/Dashboard.jsx', 
  /Welcome back, \{user\?\.email \? user\.email\.split\('@'\)\[0\]\.replace\(\/\[0-9\]\/g, ''\) : \(user\?\.name \? user\.name\.split\(' '\)\[0\] : 'Student'\)\} 👋/, 
  "Welcome back, {user?.name ? user.name.split(' ')[0] : 'Student'} 👋"
);
