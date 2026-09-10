export const problemsData = [
  {
    id: 1,
    title: "Two Sum",
    course: "Data Structures & Algorithms",
    difficulty: "Easy",
    topic: "Arrays",
    language: ["C++", "Java", "Python"],
    submissions: 120,
    status: "Published",
    statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    inputFormat: "The first line contains an integer n. The second line contains n integers representing the array nums. The third line contains the target integer.",
    outputFormat: "Print two space-separated integers representing the indices.",
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
    sampleInput: "4\n2 7 11 15\n9",
    sampleOutput: "0 1",
    explanation: "nums[0] + nums[1] == 9, we return 0 and 1.",
    testCases: [
      { id: 1, input: "4\n2 7 11 15\n9", output: "0 1", visibility: "Sample" },
      { id: 2, input: "3\n3 2 4\n6", output: "1 2", visibility: "Hidden" }
    ]
  },
  {
    id: 2,
    title: "Binary Tree Level Order Traversal",
    course: "Data Structures & Algorithms",
    difficulty: "Medium",
    topic: "Trees",
    language: ["C++", "Java", "Python"],
    submissions: 75,
    status: "Published",
    statement: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    inputFormat: "An array representation of a binary tree.",
    outputFormat: "A 2D array representing the level order traversal.",
    constraints: ["The number of nodes in the tree is in the range [0, 2000].", "-1000 <= Node.val <= 1000"],
    sampleInput: "[3,9,20,null,null,15,7]",
    sampleOutput: "[[3],[9,20],[15,7]]",
    explanation: "Level 1: 3, Level 2: 9, 20, Level 3: 15, 7",
    testCases: [
      { id: 1, input: "[3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]", visibility: "Sample" }
    ]
  },
  {
    id: 3,
    title: "Course Schedule",
    course: "Algorithms",
    difficulty: "Hard",
    topic: "Graphs",
    language: ["C++", "Python"],
    submissions: 30,
    status: "Draft",
    statement: "There are a total of numCourses courses you have to take. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.",
    inputFormat: "The first line contains two integers numCourses and p (number of prerequisites). Next p lines contain pairs of integers.",
    outputFormat: "Print true if you can finish all courses. Otherwise, print false.",
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
    sampleInput: "2 1\n1 0",
    sampleOutput: "true",
    explanation: "To take course 1 you should have finished course 0. So it is possible.",
    testCases: [
      { id: 1, input: "2 1\n1 0", output: "true", visibility: "Sample" },
      { id: 2, input: "2 2\n1 0\n0 1", output: "false", visibility: "Hidden" }
    ]
  }
];
