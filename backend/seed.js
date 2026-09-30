import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Student from './models/Student.js';
import Course from './models/Course.js';
import Problem from './models/Problem.js';
import Assignment from './models/Assignment.js';
import Submission from './models/Submission.js';
import Notification from './models/Notification.js';

dotenv.config();

const seedData = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techquotient';
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing collections
    await User.deleteMany({});
    await Student.deleteMany({});
    await Course.deleteMany({});
    await Problem.deleteMany({});
    await Assignment.deleteMany({});
    await Submission.deleteMany({});
    await Notification.deleteMany({});

    console.log('Old collections cleared.');

    // 1. Create Users (Student & Faculty)
    const studentUser = await User.create({
      name: 'Ansh Goyal',
      email: 'ansh.goyal@chitkarauniversity.edu.in',
      password: 'student123',
      role: 'student',
      rollNumber: '2411981092',
      rollNo: '2411981092',
      department: 'Computer Science & Engineering',
      institution: 'Chitkara University',
      batch: '2024',
      semester: 'Fall 2026',
      problemsSolved: 142,
      totalProblems: 250,
      accuracy: '88.5%',
      performance: 88.5,
      streak: 14,
      globalRank: 12,
      badges: [
        { title: "Array Master", icon: "🔥", desc: "Solved 40+ Array Problems", date: "Jul 2026" },
        { title: "Streak Warrior", icon: "⚡", desc: "14-Day Streak", date: "Jul 2026" },
        { title: "Java Specialist", icon: "☕", desc: "OOP Assignment 95%", date: "Jun 2026" },
        { title: "Contest Top 5%", icon: "🏆", desc: "Ranked #12 Algo Clash", date: "Jun 2026" }
      ]
    });

    const facultyUser = await User.create({
      name: 'Prof. Doe',
      email: 'prof.doe@chitkarauniversity.edu.in',
      password: 'faculty123',
      role: 'faculty',
      title: 'Professor & Head of CSE Dept',
      department: 'Computer Science & Engineering',
      institution: 'Chitkara University',
      totalStudents: 250,
      activeAssignments: 32,
      problemsCreated: 150,
      averageScore: '82%'
    });

    // 2. Create Courses
    const course1 = await Course.create({
      courseCode: 'CSE201',
      code: 'CSE201',
      courseName: 'Data Structures & Algorithms',
      title: 'Data Structures & Algorithms',
      description: 'Core data structures and algorithms in C++ and Java.',
      instructor: 'Dr. Sandeep Rana',
      facultyId: facultyUser._id.toString(),
      department: 'Computer Science',
      semester: 'Fall 2026',
      sections: 13,
      studentsCount: 120,
      studentsEnrolled: 120,
      modules: [
        { id: 1, title: 'Foundations & Memory Layout', status: 'DONE', completed: true, current: false },
        { id: 2, title: 'Arrays, Stacks & Queues', status: 'DONE', completed: true, current: false },
        { 
          id: 3, 
          title: 'Binary Trees & Heaps', 
          status: '78%', 
          completed: false, 
          current: true,
          topics: [
            { num: 1, tag: 'DSA', title: 'Binary Search Tree Insertion & Search', done: true },
            { num: 2, tag: 'DSA', title: 'AVL Tree Rotations', done: true },
            { num: 3, tag: 'DSA', title: 'Min-Heap & Max-Heap', done: false }
          ]
        }
      ]
    });

    const course2 = await Course.create({
      courseCode: 'CSE302',
      code: 'CSE302',
      courseName: 'Full Stack Web Development',
      title: 'Full Stack Web Development',
      description: 'Modern Node.js, Express, React, and MongoDB.',
      instructor: 'Prof. Anuj Kapoor',
      facultyId: facultyUser._id.toString(),
      department: 'Computer Science',
      semester: 'Fall 2026',
      sections: 8,
      studentsCount: 95,
      studentsEnrolled: 95
    });

    // 3. Create Problems
    const prob1 = await Problem.create({
      customId: 'prob-1',
      title: 'Two Sum Target Pair',
      topic: 'Arrays',
      category: 'Arrays & Hashing',
      difficulty: 'Easy',
      points: 20,
      solvedCount: 230,
      accuracy: '92%',
      description: 'Given an array of integers nums and target, return indices of the two numbers that add up to target.',
      inputFormat: 'N and Target on line 1, array on line 2',
      outputFormat: 'Indices separated by space',
      sampleTestCases: [{ input: '4 9\n2 7 11 15', output: '0 1', expectedOutput: '0 1' }],
      facultyId: facultyUser._id.toString(),
      courseId: course1._id,
      starterCode: {
        java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println("0 1");\n    }\n}',
        cpp: '#include <iostream>\nusing namespace std;\nint main() { cout << "0 1"; return 0; }',
        python: 'print("0 1")',
        javascript: 'console.log("0 1");'
      }
    });

    
    const prob2 = await Problem.create({
      customId: 'prob-2',
      title: 'Swap Two Variables',
      topic: 'Math',
      category: 'Math & Logic',
      difficulty: 'Easy',
      points: 10,
      solvedCount: 142,
      accuracy: '88.5%',
      description: 'Given two integers **a** and **b**, your task is to swap their values so that **a** holds the original value of **b**, and **b** holds the original value of **a**. You can solve this using a temporary variable, or challenge yourself to do it *without* using a temporary third variable!\n\n**Input Format:**\nA single line containing two space-separated integers, **a** and **b**.\n\n**Output Format:**\nA single line containing the two space-separated integers after swapping.',
      inputFormat: 'A single line containing two space-separated integers, a and b.',
      outputFormat: 'A single line containing the two space-separated integers after swapping.',
      sampleTestCases: [
        { input: '5 10', output: '10 5', expectedOutput: '10 5' },
        { input: '-3 8', output: '8 -3', expectedOutput: '8 -3' }
      ],
      hiddenTestCases: [
        { input: '0 0', output: '0 0', expectedOutput: '0 0' },
        { input: '99999 -99999', output: '-99999 99999', expectedOutput: '-99999 99999' }
      ],
      facultyId: facultyUser._id.toString(),
      courseId: course1._id,
      starterCode: {
        java: 'import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        \n        // Write your solution here to swap a and b\n        \n        \n        System.out.println(a + " " + b);\n    }\n}',
        cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    if (!(cin >> a >> b)) return 0;\n    \n    // Write your solution here to swap a and b\n    \n    \n    cout << a << " " << b << endl;\n    return 0;\n}',
        python: 'import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    a = int(input_data[0])\n    b = int(input_data[1])\n    \n    # Write your solution here to swap a and b\n    \n    \n    print(str(a) + " " + str(b))\n\nif __name__ == "__main__":\n    main()',
        javascript: 'const fs = require("fs");\n\nfunction main() {\n    const input = fs.readFileSync(0, "utf-8").trim().split("\\s+");\n    if (input.length < 2) return;\n    let a = parseInt(input[0], 10);\n    let b = parseInt(input[1], 10);\n    \n    // Write your solution here to swap a and b\n    \n    \n    console.log(a + " " + b);\n}\n\nmain();'
      }
    });

    // 4. Create Assignment
    const asgn1 = await Assignment.create({
      customId: 'asgn-1',
      title: 'Assignment 4: Binary Search Trees & AVL Balancing',
      course: 'Data Structures & Algorithms',
      code: 'CSE201',
      courseId: course1._id,
      facultyId: facultyUser._id.toString(),
      dueDate: 'Jul 30, 2026',
      maxScore: 100,
      maximumMarks: 100,
      status: 'Published',
      problemIds: [prob1._id]
    });

    // 5. Create Students
    await Student.create({
      studentId: 'STU001',
      name: 'Ansh Goyal',
      email: 'ansh.goyal@chitkarauniversity.edu.in',
      rollNumber: '2411981092',
      department: 'Computer Science',
      semester: 'Fall 2026',
      enrolledCourses: [course1._id, course2._id],
      performance: 92,
      completedAssignments: 3
    });

    await Student.create({
      studentId: 'STU002',
      name: 'Alice Smith',
      email: 'alice@university.edu',
      rollNumber: 'CS26001',
      department: 'Computer Science',
      semester: 'Fall 2026',
      enrolledCourses: [course1._id],
      performance: 95,
      completedAssignments: 3
    });

    // 6. Create Submission
    await Submission.create({
      studentId: studentUser._id,
      userEmail: studentUser.email,
      problemId: prob1._id,
      assignmentId: asgn1._id,
      language: 'Python',
      code: 'print("0 1")',
      status: 'Evaluated',
      score: 100,
      runtimeMs: 12,
      memoryMb: 4.2,
      testCasesPassed: 10,
      totalTestCases: 10
    });

    // 8. Create Notifications

    await Notification.create({
      customId: 1,
      title: 'New Assignment Posted',
      message: 'CSE201 Assignment 4 is now live.',
      type: 'assignment',
      time: '10m ago',
      unread: true
    });

    console.log('✅ Successfully seeded database with complete unified data!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

seedData();
