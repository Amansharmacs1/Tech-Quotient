export const aiGeneratedProblem = {
  title: "Longest Increasing Subsequence",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  statement: "Given an integer array nums, return the length of the longest strictly increasing subsequence.\n\nA subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].",
  inputFormat: "The first line contains an integer n (the size of the array).\nThe second line contains n space-separated integers representing the array nums.",
  outputFormat: "Return a single integer: the length of the longest strictly increasing subsequence.",
  constraints: [
    "1 <= nums.length <= 2500",
    "-10^4 <= nums[i] <= 10^4"
  ],
  sampleInput: "8\n10 9 2 5 3 7 101 18",
  sampleOutput: "4",
  explanation: "The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4.",
  suggestedTestCases: [
    "[0,1,0,3,2,3] -> 4",
    "[7,7,7,7,7,7,7] -> 1"
  ],
  expectedApproach: "Create a DP array where dp[i] represents the length of the longest increasing subsequence that ends with nums[i]. Initialize all dp values to 1. For each i from 1 to n-1, for each j from 0 to i-1, if nums[i] > nums[j], dp[i] = max(dp[i], dp[j] + 1). The result is the maximum value in the dp array.",
  timeComplexity: "O(N^2) using standard DP, or O(N log N) using binary search.",
  spaceComplexity: "O(N) to store the DP array.",
  hints: [
    "Consider using recursion with memoization first.",
    "Can you build the solution iteratively from the smallest subproblems?",
    "Think about how to keep track of the smallest ending element of an increasing subsequence of a given length to achieve O(N log N)."
  ],
  tags: ["Array", "Binary Search", "Dynamic Programming"]
};

export const aiGeneratedAssignment = {
  title: "Dynamic Programming Foundations",
  course: "Data Structures and Algorithms",
  description: "A comprehensive assignment to evaluate understanding of overlapping subproblems, optimal substructure, and bottom-up DP implementations.",
  learningObjectives: [
    "Understand overlapping subproblems and optimal substructure.",
    "Implement memoization (top-down).",
    "Implement tabulation (bottom-up)."
  ],
  estimatedDifficulty: "Medium-Hard",
  totalMarks: 100,
  duration: 120, // minutes
  problems: [
    { title: "Fibonacci Number (Memoization)", marks: 20, difficulty: "Easy", topic: "Recursion" },
    { title: "Climbing Stairs", marks: 20, difficulty: "Easy", topic: "Dynamic Programming" },
    { title: "Longest Increasing Subsequence", marks: 30, difficulty: "Medium", topic: "Dynamic Programming" },
    { title: "0/1 Knapsack Problem", marks: 30, difficulty: "Hard", topic: "Dynamic Programming" }
  ],
  skillsEvaluated: ["State Space Definition", "Transition Equations", "Optimization"]
};

export const studentInsights = {
  weakTopics: [
    { topic: "Graphs", score: 42, impact: "High" },
    { topic: "Dynamic Programming", score: 56, impact: "High" },
    { topic: "Tries", score: 61, impact: "Medium" }
  ],
  strongTopics: [
    { topic: "Arrays", score: 88 },
    { topic: "Strings", score: 85 },
    { topic: "Hash Maps", score: 82 }
  ],
  recommendations: [
    "Create additional Graph practice assignments focused on BFS and DFS fundamentals.",
    "Focus the next lecture on Dynamic Programming state transitions.",
    "Assignment 3 (Advanced Trees) difficulty was too high. Consider a review session."
  ],
  improvementTrend: "+12% overall improvement in the last 30 days."
};

export const dummyChatHistory = [
  { role: "ai", content: "Hello! I am your AI Teaching Assistant. How can I help you improve your course today?" },
  { role: "user", content: "Which students are struggling the most with Binary Trees?" },
  { role: "ai", content: "Based on recent submissions, 14 students scored below 60% on Binary Tree problems. The most common error is related to recursive stack overflow and failing to handle null pointer exceptions in edge cases. Would you like me to generate a remedial practice assignment for them?" },
  { role: "user", content: "Yes, generate an Easy practice assignment focused on recursion basics." },
  { role: "ai", content: "I have prepared an assignment with 3 easy problems: 'Print Tree In-Order', 'Find Tree Depth', and 'Count Leaves'. It should take them approximately 45 minutes to complete. Would you like to review and publish it?" }
];

export const suggestedPrompts = [
  "Generate a medium Graph problem",
  "Which topics are students struggling with?",
  "Create a 5-question DSA assignment",
  "How can I improve student performance in DP?",
  "Suggest practice problems for Trees",
  "Analyze Assignment 3 performance"
];
