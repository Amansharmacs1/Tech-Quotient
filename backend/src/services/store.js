import User from '../models/User.js';
import Course from '../models/Course.js';
import Problem from '../models/Problem.js';
import Assignment from '../models/Assignment.js';
import Contest from '../models/Contest.js';
import Notification from '../models/Notification.js';
import Submission from '../models/Submission.js';

// In-Memory Data Store (used when MONGODB_URI is blank or db is disconnected)
let mockUsers = [
  {
    _id: "user-student-1",
    name: "Ansh Goyal",
    email: "ansh.goyal@chitkara.edu.in",
    role: "student",
    rollNo: "2411981092",
    department: "Computer Science & Engineering",
    institution: "Chitkara University",
    batch: "2024",
    problemsSolved: 142,
    totalProblems: 250,
    accuracy: "88.5%",
    streak: 14,
    activeAssignmentsCount: 3,
    enrolledCoursesCount: 3,
    globalRank: 12,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    badges: [
      { title: "Array Master", icon: "🔥", desc: "Solved 40+ Array & Hashing Problems", date: "Jul 2026" },
      { title: "Streak Warrior", icon: "⚡", desc: "Maintained 14-Day Coding Streak", date: "Jul 2026" },
      { title: "Java Specialist", icon: "☕", desc: "Passed OOP & Polymorphism Assignment with 95%", date: "Jun 2026" },
      { title: "Contest Top 5%", icon: "🏆", desc: "Ranked #12 in TechQuotient Algo Clash", date: "Jun 2026" }
    ]
  },
  {
    _id: "user-faculty-1",
    name: "Prof. Doe",
    email: "prof.doe@chitkara.edu.in",
    role: "faculty",
    title: "Professor & Head of CSE Dept",
    department: "Computer Science & Engineering",
    institution: "Chitkara University",
    totalStudents: 250,
    activeAssignments: 32,
    problemsCreated: 150,
    averageScore: "82%"
  }
];

let mockCourses = [
  {
    id: "cse-201",
    code: "CSE201",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Sandeep Rana",
    progress: 78,
    sections: 13,
    studentsCount: 120,
    modules: [
      { id: 1, title: "Foundations & Memory Layout", status: "DONE", commentsCount: 2, docsCount: 8, completed: true, current: false },
      { id: 2, title: "Arrays, Stacks & Queues", status: "DONE", commentsCount: 1, docsCount: 12, completed: true, current: false },
      { 
        id: 3, 
        title: "Binary Trees & Heaps", 
        status: "78%", 
        commentsCount: 3, 
        docsCount: 10,
        completed: false, 
        current: true,
        topics: [
          { num: 1, tag: "DSA", title: "Binary Search Tree Insertion & Search", done: true },
          { num: 2, tag: "DSA", title: "AVL Tree Rotations: Single & Double", done: true },
          { num: 3, tag: "DSA", title: "Min-Heap & Max-Heap Implementation", done: false },
          { num: 4, tag: "DSA", title: "Heap Sort & Priority Queues", done: false }
        ]
      },
      { id: 4, title: "Dynamic Programming", status: "PENDING", commentsCount: 0, docsCount: 14, completed: false, current: false }
    ]
  },
  {
    id: "cse-302",
    code: "CSE302",
    title: "Full Stack Web Development",
    instructor: "Prof. Anuj Kapoor",
    progress: 85,
    sections: 8,
    studentsCount: 95,
    modules: [
      { id: 1, title: "HTML5 Semantic Elements", status: "DONE", commentsCount: 0, docsCount: 5, completed: true, current: false },
      { id: 2, title: "CSS Flexbox & Responsive Layouts", status: "DONE", commentsCount: 1, docsCount: 9, completed: true, current: false },
      { 
        id: 3, 
        title: "JavaScript Async & Promises", 
        status: "85%", 
        commentsCount: 4, 
        docsCount: 11,
        completed: false, 
        current: true,
        topics: [
          { num: 1, tag: "WEB", title: "Event Loop & Microtask Queue", done: true },
          { num: 2, tag: "WEB", title: "Promises & Async/Await Pattern", done: true },
          { num: 3, tag: "WEB", title: "Fetch API & REST Integrations", done: true },
          { num: 4, tag: "WEB", title: "Custom Hooks & React Context API", done: false }
        ]
      }
    ]
  },
  {
    id: "cse-204",
    code: "CSE204",
    title: "Object-Oriented Programming in Java",
    instructor: "Dr. Sandeep Rana",
    progress: 92,
    sections: 11,
    studentsCount: 110,
    modules: [
      { id: 1, title: "Classes, Objects & Constructors", status: "DONE", commentsCount: 0, docsCount: 7, completed: true, current: false },
      { id: 2, title: "Inheritance & Polymorphism", status: "DONE", commentsCount: 2, docsCount: 10, completed: true, current: false },
      { id: 3, title: "Interfaces & Abstract Classes", status: "DONE", commentsCount: 1, docsCount: 8, completed: true, current: false },
      { 
        id: 4, 
        title: "Java Exception Handling & Collections", 
        status: "92%", 
        commentsCount: 2, 
        docsCount: 12,
        completed: false, 
        current: true,
        topics: [
          { num: 1, tag: "JAVA", title: "Try-Catch-Finally & Custom Exceptions", done: true },
          { num: 2, tag: "JAVA", title: "Java Collections Framework: ArrayList & HashMap", done: true },
          { num: 3, tag: "JAVA", title: "Generics & Comparable Interface", done: true }
        ]
      }
    ]
  }
];

let mockProblems = [
  {
    id: "prob-1",
    customId: "prob-1",
    title: "Two Sum Target Pair",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    points: 20,
    solvedCount: 230,
    accuracy: "92%",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    inputFormat: "First line contains N and Target. Second line contains N space-separated integers.",
    outputFormat: "Print indices of the two numbers.",
    starterCode: {
      java: `import java.util.*;\n\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[] {};\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        int[] result = twoSum(nums, target);\n        if (result.length == 2) {\n            System.out.println(result[0] + " " + result[1]);\n        }\n    }\n}`,
      cpp: `#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    \n    unordered_map<int, int> mp;\n    for(int i=0; i<n; i++) {\n        int comp = target - nums[i];\n        if(mp.count(comp)) {\n            cout << mp[comp] << " " << i << endl;\n            return 0;\n        }\n        mp[nums[i]] = i;\n    }\n    return 0;\n}`,
      python: `nums = list(map(int, input().split()))\ntarget = int(input())\nmp = {}\nfor i, num in enumerate(nums):\n    comp = target - num\n    if comp in mp:\n        print(f"{mp[comp]} {i}")\n        break\n    mp[num] = i`,
      javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const comp = target - nums[i];\n        if (map.has(comp)) return [map.get(comp), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}\nconsole.log(twoSum([2, 7, 11, 15], 9).join(" "));`
    }
  },
  {
    id: "prob-2",
    customId: "prob-2",
    title: "Valid Parentheses Stack",
    difficulty: "Easy",
    category: "Stacks & Queues",
    points: 20,
    solvedCount: 198,
    accuracy: "86%",
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    inputFormat: "Single line containing string S.",
    outputFormat: "Print 'true' or 'false'.",
    starterCode: {
      java: `import java.util.*;\n\npublic class Solution {\n    public static boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '{' || c == '[') {\n                stack.push(c);\n            } else {\n                if (stack.isEmpty()) return false;\n                char top = stack.pop();\n                if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) {\n                    return false;\n                }\n            }\n        }\n        return stack.isEmpty();\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.next();\n            System.out.println(isValid(s) ? "true" : "false");\n        }\n    }\n}`,
      cpp: `#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n    string s;\n    if(cin >> s) cout << "true" << endl;\n    return 0;\n}`,
      python: `s = input().strip()\nprint("true")`,
      javascript: `console.log("true");`
    }
  },
  {
    id: "prob-3",
    customId: "prob-3",
    title: "0/1 Knapsack Dynamic Programming",
    difficulty: "Medium",
    category: "DP & Recursion",
    points: 40,
    solvedCount: 115,
    accuracy: "42%",
    description: "Given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack.",
    inputFormat: "N and W on first line. Next line N values. Next line N weights.",
    outputFormat: "Print maximum total value.",
    starterCode: {
      java: `public class Solution {\n    public static int knapsack(int W, int[] wt, int[] val, int n) {\n        int[][] dp = new int[n + 1][W + 1];\n        for (int i = 0; i <= n; i++) {\n            for (int w = 0; w <= W; w++) {\n                if (i == 0 || w == 0) dp[i][w] = 0;\n                else if (wt[i - 1] <= w)\n                    dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);\n                else dp[i][w] = dp[i - 1][w];\n            }\n        }\n        return dp[n][W];\n    }\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() { cout << 220; return 0; }`,
      python: `print(220)`,
      javascript: `console.log(220);`
    }
  }
];

let mockAssignments = [
  {
    id: "asgn-1",
    customId: "asgn-1",
    course: "Data Structures & Algorithms",
    code: "CSE201",
    title: "Assignment 4: Binary Search Trees & AVL Balancing",
    dueDate: "2026-07-30",
    maxScore: 100,
    status: "Pending",
    submissionCount: 185,
    problemStatement: "Implement an AVL Tree data structure with dynamic node balance factor checks. Write a program in Java, C++, Python, or JavaScript that performs Left-Left (LL), Right-Right (RR), Left-Right (LR), and Right-Left (RL) rotations automatically whenever an insertion violates the height balance constraint.",
    submissionGuidelines: [
      "Ensure all test case scenarios handle empty tree inputs cleanly.",
      "Use appropriate exception handlers for invalid integer keys.",
      "Type your code in the editor on the right and click Submit Assignment when ready."
    ]
  },
  {
    id: "asgn-2",
    customId: "asgn-2",
    course: "Object-Oriented Programming in Java",
    code: "CSE204",
    title: "Assignment 3: Java Polymorphism & Exception Handlers",
    dueDate: "2026-07-24",
    maxScore: 100,
    status: "Submitted",
    score: 95,
    submissionCount: 242,
    problemStatement: "Create a hierarchical class structure in Java demonstrating method overriding, abstract classes, and custom checked exceptions for banking transactions.",
    submissionGuidelines: [
      "Include custom InsufficientBalanceException class.",
      "Provide clean documentation comments for each public method."
    ]
  },
  {
    id: "asgn-3",
    customId: "asgn-3",
    course: "Full Stack Web Development",
    code: "CSE302",
    title: "Assignment 2: RESTful API & React Integration",
    dueDate: "2026-08-05",
    maxScore: 100,
    status: "In Progress",
    submissionCount: 140,
    problemStatement: "Build an Express REST API backend connected to React frontend with full CRUD routes and JWT token authorization.",
    submissionGuidelines: [
      "Ensure proper CORS configuration and HTTP response codes.",
      "Implement client-side error states."
    ]
  }
];

let mockContests = [
  {
    id: "c-1",
    customId: "c-1",
    title: "TechQuotient Algo Clash #14",
    status: "Live",
    participants: 142,
    duration: "2 Hours",
    questionsCount: 4,
    startTime: "Started 35m ago",
    userRank: 12,
    score: 350,
    leaderboard: [
      { rank: 1, name: "Aarav Sharma", score: 400, solved: 4, penalty: "42m" },
      { rank: 2, name: "Priya Patel", score: 380, solved: 4, penalty: "54m" },
      { rank: 3, name: "Rohan Verma", score: 360, solved: 4, penalty: "61m" },
      { rank: 12, name: "Ansh Goyal (You)", score: 350, solved: 3, penalty: "48m" },
      { rank: 13, name: "Neha Gupta", score: 320, solved: 3, penalty: "55m" }
    ]
  },
  {
    id: "c-2",
    customId: "c-2",
    title: "Speed Coding Sprint #18",
    status: "Upcoming",
    participants: 88,
    duration: "1.5 Hours",
    questionsCount: 3,
    startTime: "Tomorrow at 6:00 PM",
    userRank: null,
    score: 0,
    leaderboard: []
  },
  {
    id: "c-3",
    customId: "c-3",
    title: "Summer Code Cup 2026",
    status: "Completed",
    participants: 210,
    duration: "3 Hours",
    questionsCount: 5,
    startTime: "Jul 15, 2026",
    userRank: 8,
    score: 480,
    leaderboard: [
      { rank: 1, name: "Karan Singh", score: 500, solved: 5, penalty: "85m" },
      { rank: 8, name: "Ansh Goyal (You)", score: 480, solved: 5, penalty: "102m" }
    ]
  }
];

let mockNotifications = [
  { id: 1, title: "New Assignment Posted", message: "CSE201 Assignment 4 is now live.", time: "10m ago", type: "assignment", unread: true },
  { id: 2, title: "Judge0 Testcases Passed", message: "Solution for Two Sum Target Pair accepted (+20 pts).", time: "1h ago", type: "ai", unread: false },
  { id: 3, title: "Contest Announcement", message: "Speed Coding Sprint #18 starts tomorrow at 6 PM.", time: "3h ago", type: "contest", unread: true }
];

let mockSubmissions = [];

export const getStoreData = () => ({
  studentProfile: mockUsers[0],
  facultyInfo: mockUsers[1],
  courses: mockCourses,
  problems: mockProblems,
  assignments: mockAssignments,
  contests: mockContests,
  notifications: mockNotifications,
  submissions: mockSubmissions
});

export const updateStudentProfile = (updates) => {
  mockUsers[0] = { ...mockUsers[0], ...updates };
  return mockUsers[0];
};

export const addSubmission = (subData) => {
  const newSub = {
    id: "sub-" + Date.now(),
    ...subData,
    createdAt: new Date().toISOString()
  };
  mockSubmissions.unshift(newSub);
  
  // Update student stats if accepted
  if (subData.status === 'ACCEPTED') {
    mockUsers[0].problemsSolved = (mockUsers[0].problemsSolved || 0) + 1;
  }
  return newSub;
};

export const updateAssignmentStatus = (id, updates) => {
  const index = mockAssignments.findIndex(a => a.id === id || a.customId === id);
  if (index !== -1) {
    mockAssignments[index] = { ...mockAssignments[index], ...updates };
    return mockAssignments[index];
  }
  return null;
};

export const registerForContest = (contestId) => {
  const contest = mockContests.find(c => c.id === contestId || c.customId === contestId);
  if (contest) {
    contest.participants += 1;
    return true;
  }
  return false;
};

export const markNotificationsRead = (id = null) => {
  if (id) {
    const item = mockNotifications.find(n => n.id === Number(id));
    if (item) item.unread = false;
  } else {
    mockNotifications.forEach(n => n.unread = false);
  }
  return mockNotifications;
};

export const clearNotifications = () => {
  mockNotifications = [];
  return [];
};
