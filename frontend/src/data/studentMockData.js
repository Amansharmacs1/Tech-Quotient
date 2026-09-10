export const facultyInfo = {
  name: "Prof. Doe",
  title: "Professor & Head of CSE Dept",
  department: "Computer Science & Engineering",
  institution: "Chitkara University",
  totalStudents: 250,
  activeAssignments: 32,
  problemsCreated: 150,
  averageScore: "82%"
};

export const studentInfo = {
  name: "Ansh Goyal",
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
  globalRank: 12
};

export const enrolledCourses = [
  {
    id: "cse-201",
    code: "CSE201",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Sandeep Rana",
    progress: 78,
    sections: 13,
    studentsCount: 120
  },
  {
    id: "cse-302",
    code: "CSE302",
    title: "Full Stack Web Development",
    instructor: "Prof. Anuj Kapoor",
    progress: 85,
    sections: 8,
    studentsCount: 95
  },
  {
    id: "cse-204",
    code: "CSE204",
    title: "Object-Oriented Programming in Java",
    instructor: "Dr. Sandeep Rana",
    progress: 92,
    sections: 11,
    studentsCount: 110
  }
];

export const practiceProblems = [
  {
    id: "prob-1",
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

export const studentAssignments = [
  {
    id: "asgn-1",
    course: "Data Structures & Algorithms",
    code: "CSE201",
    title: "Assignment 4: Binary Search Trees & AVL Balancing",
    dueDate: "2026-07-30",
    maxScore: 100,
    status: "Pending",
    submissionCount: 185
  },
  {
    id: "asgn-2",
    course: "Object-Oriented Programming in Java",
    code: "CSE204",
    title: "Assignment 3: Java Polymorphism & Exception Handlers",
    dueDate: "2026-07-24",
    maxScore: 100,
    status: "Submitted",
    score: 95,
    submissionCount: 242
  },
  {
    id: "asgn-3",
    course: "Full Stack Web Development",
    code: "CSE302",
    title: "Assignment 2: RESTful API & React Integration",
    dueDate: "2026-08-05",
    maxScore: 100,
    status: "In Progress",
    submissionCount: 140
  }
];

export const topicPerformanceData = {
  faculty: [
    { topic: "Arrays", count: 80, label: "80 problems solved" },
    { topic: "Strings", count: 65, label: "65 problems solved" },
    { topic: "Trees", count: 45, label: "45 problems solved" },
    { topic: "Graphs", count: 35, label: "35 problems solved" },
    { topic: "DP", count: 30, label: "30 problems solved" }
  ],
  student: [
    { topic: "Arrays", count: 45, label: "45 solved (92% acc)" },
    { topic: "Strings", count: 38, label: "38 solved (88% acc)" },
    { topic: "Trees", count: 28, label: "28 solved (75% acc)" },
    { topic: "Graphs", count: 19, label: "19 solved (68% acc)" },
    { topic: "DP", count: 12, label: "12 solved (42% acc)" }
  ]
};

export const accuracyTrendData = {
  faculty: [
    { week: "Week 1", value: 70 },
    { week: "Week 2", value: 75 },
    { week: "Week 3", value: 82 },
    { week: "Week 4", value: 88 }
  ],
  student: [
    { week: "Week 1", value: 75 },
    { week: "Week 2", value: 80 },
    { week: "Week 3", value: 84 },
    { week: "Week 4", value: 88.5 }
  ]
};

export const aiInsightData = {
  faculty: {
    highlight: "Students are struggling with Dynamic Programming.",
    recommendation: "Create more DP practice problems.",
    actionText: "Take Action →",
    actionTarget: "assignments"
  },
  student: {
    highlight: "Your Dynamic Programming accuracy is 42% (below target).",
    recommendation: "Solve '0/1 Knapsack' and 'Coin Change' to boost your score.",
    actionText: "Practice DP Now →",
    actionTarget: "coding-workspace"
  }
};

export const recentActivitiesData = {
  faculty: [
    { id: 1, text: "Aarav Sharma submitted CSE201 Assignment 4", time: "10 mins ago", type: "submission" },
    { id: 2, text: "Priya Patel completed Two Sum Target Pair", time: "25 mins ago", type: "solved" },
    { id: 3, text: "Automated test cases added to DP Knapsack", time: "2 hours ago", type: "system" },
    { id: 4, text: "Rohan Verma requested hint on Graph BFS", time: "3 hours ago", type: "help" }
  ],
  student: [
    { id: 1, text: "Solved Two Sum Target Pair (+20 pts)", time: "15 mins ago", type: "solved" },
    { id: 2, text: "Submitted Java Polymorphism Assignment 3 (Score: 95/100)", time: "Yesterday", type: "submission" },
    { id: 3, text: "Unlocked Badge: Array Master 🔥", time: "2 days ago", type: "badge" },
    { id: 4, text: "CSE302 Assignment 2 announced by Prof. Kapoor", time: "3 days ago", type: "announcement" }
  ]
};

export const notificationsData = [
  { id: 1, title: "New Assignment Posted", message: "CSE201 Assignment 4 is now live.", time: "10m ago", type: "assignment", unread: true },
  { id: 2, title: "Judge0 Testcases Passed", message: "Solution for Two Sum Target Pair accepted.", time: "1h ago", type: "ai", unread: false },
  { id: 3, title: "Contest Announcement", message: "Weekly Algo Clash starts tomorrow at 6 PM.", time: "3h ago", type: "contest", unread: true }
];

export const coursesData = enrolledCourses.map(c => ({
  ...c,
  modules: [
    { name: "Module 1: Foundations & Memory Layout", completed: true },
    { name: "Module 2: Arrays, Stacks & Queues", completed: true },
    { name: "Module 3: Binary Trees & Heaps", current: true },
    { name: "Module 4: Dynamic Programming", completed: false }
  ]
}));

export const contestsData = [
  { 
    id: "c-1", 
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

export const studentProfile = {
  ...studentInfo,
  streakDays: studentInfo.streak,
  rank: studentInfo.globalRank,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  email: "ansh.goyal@chitkara.edu.in",
  badges: [
    { title: "Array Master", icon: "🔥", desc: "Solved 40+ Array & Hashing Problems", date: "Jul 2026" },
    { title: "Streak Warrior", icon: "⚡", desc: "Maintained 14-Day Coding Streak", date: "Jul 2026" },
    { title: "Java Specialist", icon: "☕", desc: "Passed OOP & Polymorphism Assignment with 95%", date: "Jun 2026" },
    { title: "Contest Top 5%", icon: "🏆", desc: "Ranked #12 in TechQuotient Algo Clash", date: "Jun 2026" }
  ]
};
