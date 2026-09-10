export const assignmentsData = [
  {
    id: 1,
    title: "DSA Assignment 1",
    course: "Data Structures & Algorithms",
    description: "This assignment covers basic arrays and strings. Ensure you test your code against edge cases before submitting.",
    problemIds: [1, 2], // Corresponds to Two Sum and Binary Tree
    deadline: "2026-09-10",
    timeLimit: 120, // in minutes
    maxMarks: 100,
    attempts: "Unlimited",
    submissions: 95,
    status: "Published"
  },
  {
    id: 2,
    title: "Graphs Practice",
    course: "Algorithms",
    description: "Implement DFS and BFS algorithms to solve the following real-world graph problems.",
    problemIds: [3], // Corresponds to Course Schedule
    deadline: "2026-09-18",
    timeLimit: 180,
    maxMarks: 50,
    attempts: "Single Attempt",
    submissions: 42,
    status: "Draft"
  },
  {
    id: 3,
    title: "DBMS Lab",
    course: "Database Management Systems",
    description: "Write SQL queries to retrieve specific relational data from the university database schema.",
    problemIds: [],
    deadline: "2026-09-20",
    timeLimit: 60,
    maxMarks: 100,
    attempts: "Unlimited",
    submissions: 65,
    status: "Published"
  }
];
