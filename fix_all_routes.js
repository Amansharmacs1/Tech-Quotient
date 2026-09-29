const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      // Don't touch Auth pages as they have correct root-level navigation like /verify-otp
      if (fullPath.includes('pages/Auth') || fullPath.includes('pages/Student')) continue;

      let content = fs.readFileSync(fullPath, 'utf8');
      
      const toReplacements = [
        ['to="/assignments"', 'to="/faculty/assignments"'],
        ['to="/assignments/', 'to="/faculty/assignments/'],
        ['to="/problems"', 'to="/faculty/problems"'],
        ['to="/problems/', 'to="/faculty/problems/'],
        ['to="/submissions"', 'to="/faculty/submissions"'],
        ['to="/submissions/', 'to="/faculty/submissions/'],
        ['to="/courses"', 'to="/faculty/courses"'],
        ['to="/courses/', 'to="/faculty/courses/'],
        ['to="/students"', 'to="/faculty/students"'],
        ['to="/students/', 'to="/faculty/students/'],
        ['to="/register"', 'to="/signup"']
      ];

      const navReplacements = [
        ["navigate('/assignments')", "navigate('/faculty/assignments')"],
        ["navigate('/assignments/", "navigate('/faculty/assignments/"],
        ["navigate('/problems')", "navigate('/faculty/problems')"],
        ["navigate('/problems/", "navigate('/faculty/problems/"],
        ["navigate('/submissions')", "navigate('/faculty/submissions')"],
        ["navigate('/submissions/", "navigate('/faculty/submissions/"],
        ["navigate('/courses')", "navigate('/faculty/courses')"],
        ["navigate('/courses/", "navigate('/faculty/courses/"],
        ["navigate('/students')", "navigate('/faculty/students')"],
        ["navigate('/students/", "navigate('/faculty/students/"]
      ];

      let modified = false;
      
      for (const [search, replace] of toReplacements) {
        if (content.includes(search)) {
          content = content.split(search).join(replace);
          modified = true;
        }
      }

      for (const [search, replace] of navReplacements) {
        if (content.includes(search)) {
          content = content.split(search).join(replace);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDirectory('frontend/src/pages');
