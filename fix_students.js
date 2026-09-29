const fs = require('fs');

const path = 'backend/controllers/studentController.js';
let content = fs.readFileSync(path, 'utf8');

content = content.replace("const query = {};", "const query = { role: 'student' };");
content = content.replace("const students = await Student.find(query)", "const students = await User.find(query).select('-password')");

fs.writeFileSync(path, content);
