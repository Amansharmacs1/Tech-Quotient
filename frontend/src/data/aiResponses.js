export const aiGeneratedProblem = {
  title: "Valid Binary Search Tree Verification",
  statement: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.",
  inputFormat: "The input consists of a serialized array representation of a binary tree using level-order traversal, where 'null' signifies an empty node.",
  outputFormat: "Return a boolean value: true if the tree is a valid BST, otherwise false.",
  constraints: [
    "The number of nodes in the tree is in the range [1, 10^4].",
    "-2^31 <= Node.val <= 2^31 - 1"
  ],
  sampleInput: "[2,1,3]",
  sampleOutput: "true",
  hints: [
    "Consider using recursion.",
    "A simple in-order traversal of a valid BST will yield a strictly increasing sequence.",
    "If you pass down a min and max valid range for each node during recursion, you can validate in O(N) time."
  ],
  tags: ["Trees", "Binary Search Tree", "Recursion", "Depth-First Search"]
};

export const aiGeneratedAssignment = {
  title: "Dynamic Programming Foundations",
  learningObjectives: [
    "Understand overlapping subproblems and optimal substructure.",
    "Implement memoization (top-down).",
    "Implement tabulation (bottom-up)."
  ],
  estimatedDifficulty: "Medium-Hard",
  totalMarks: 100,
  problems: [
    { title: "Fibonacci Number (Memoization)", marks: 20, difficulty: "Easy" },
    { title: "Climbing Stairs", marks: 20, difficulty: "Easy" },
    { title: "Longest Increasing Subsequence", marks: 30, difficulty: "Medium" },
    { title: "0/1 Knapsack Problem", marks: 30, difficulty: "Hard" }
  ]
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
  "Generate an Easy Array problem.",
  "Suggest assignments for recursion.",
  "Which students need additional support?",
  "Recommend practice questions for Graphs.",
  "Explain why submissions are failing."
];
