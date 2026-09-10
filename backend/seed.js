import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';
import Problem from './models/Problem.js';
import Assignment from './models/Assignment.js';
import Student from './models/Student.js';
import Submission from './models/Submission.js';

dotenv.config();

const facultyId = 'faculty-123';

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techquotient');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data for this faculty
    await Course.deleteMany({ facultyId });
    await Problem.deleteMany({ facultyId });
    await Assignment.deleteMany({ facultyId });
    await Student.deleteMany({});
    await Submission.deleteMany(); // Delete all submissions for now

    console.log('Old data cleared.');

    // 1. Create Courses
    const course1 = await Course.create({
      courseCode: 'CS101',
      courseName: 'Intro to Programming',
      description: 'Basics of programming using Python.',
      facultyId,
      department: 'Computer Science',
      semester: 'Fall 2026',
      studentsEnrolled: 45
    });

    const course2 = await Course.create({
      courseCode: 'CS201',
      courseName: 'Data Structures',
      description: 'Core data structures and algorithms in C++.',
      facultyId,
      department: 'Computer Science',
      semester: 'Fall 2026',
      studentsEnrolled: 30
    });

    // 2. Create Problems
    const problem1 = await Problem.create({
      title: 'Two Sum',
      difficulty: 'Easy',
      topic: 'Arrays',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      inputFormat: 'Line 1: N\nLine 2: N space-separated integers\nLine 3: Target',
      outputFormat: 'Two space-separated integers representing indices.',
      constraints: ['2 <= nums.length <= 10^4'],
      sampleTestCases: [{
        input: '4\n2 7 11 15\n9',
        output: '0 1',
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9.'
      }],
      facultyId,
      courseId: course2._id,
      status: 'Published'
    });

    const problem2 = await Problem.create({
      title: 'Reverse Linked List',
      difficulty: 'Medium',
      topic: 'Linked Lists',
      description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
      inputFormat: 'Line 1: N\nLine 2: N space-separated integers',
      outputFormat: 'N space-separated integers representing reversed list.',
      constraints: ['0 <= N <= 5000'],
      sampleTestCases: [{
        input: '5\n1 2 3 4 5',
        output: '5 4 3 2 1',
        explanation: 'Reversing 1->2->3->4->5 yields 5->4->3->2->1.'
      }],
      facultyId,
      courseId: course2._id,
      status: 'Published'
    });

    // 3. Create Assignments
    const assignment1 = await Assignment.create({
      title: 'Week 1: Array Basics',
      courseId: course2._id,
      facultyId,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      totalMarks: 100,
      problems: [problem1._id],
      status: 'Published'
    });

    const assignment2 = await Assignment.create({
      title: 'Week 2: Linked List Operations',
      courseId: course2._id,
      facultyId,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      totalMarks: 100,
      problems: [problem2._id],
      status: 'Draft'
    });

    // 4. Create Students
    const student1 = await Student.create({
      studentId: 'STU001',
      name: 'Alice Smith',
      rollNumber: 'CS26001',
      email: 'alice@university.edu',
      department: 'Computer Science',
      semester: 'Fall 2026',
      enrolledCourses: [course1._id, course2._id],
      performance: 92,
      completedAssignments: 2
    });

    const student2 = await Student.create({
      studentId: 'STU002',
      name: 'Bob Johnson',
      rollNumber: 'CS26002',
      email: 'bob@university.edu',
      department: 'Computer Science',
      semester: 'Fall 2026',
      enrolledCourses: [course2._id],
      performance: 85,
      completedAssignments: 1
    });

    const student3 = await Student.create({
      studentId: 'STU003',
      name: 'Charlie Brown',
      rollNumber: 'CS26003',
      email: 'charlie@university.edu',
      department: 'Computer Science',
      semester: 'Fall 2026',
      enrolledCourses: [course1._id],
      performance: 45,
      completedAssignments: 0
    });

    // Also we need to make sure students are enrolled in course, wait, course model might have studentsEnrolled as Number.
    // Enrolling them in assignments might be handled in Submission.

    // 5. Create Submissions
    await Submission.create({
      studentId: student1._id,
      problemId: problem1._id,
      assignmentId: assignment1._id,
      code: 'def twoSum(nums, target):\n    return [0, 1]',
      language: 'Python',
      status: 'Evaluated',
      score: 100,
      testCaseResults: [{ passed: true, executionTime: 45, memoryUsed: 14.2 }]
    });

    await Submission.create({
      studentId: student2._id,
      problemId: problem1._id,
      assignmentId: assignment1._id,
      code: 'vector<int> twoSum(vector<int>& nums, int target) {\n    return {0, 1};\n}',
      language: 'C++',
      status: 'Evaluated',
      score: 100,
      testCaseResults: [{ passed: true, executionTime: 12, memoryUsed: 9.5 }]
    });

    await Submission.create({
      studentId: student3._id,
      problemId: problem1._id,
      assignmentId: assignment1._id,
      code: 'def twoSum(nums, target):\n    print("idk")',
      language: 'Python',
      status: 'Failed',
      score: 0,
      testCaseResults: [{ passed: false, executionTime: 30, memoryUsed: 13.8 }]
    });

    console.log('Successfully seeded database with dummy data!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
