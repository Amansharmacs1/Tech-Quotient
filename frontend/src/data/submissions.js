export const submissionsData = [
  {
    id: 101,
    studentId: 1,
    assignmentId: 1, // DSA Assignment 1
    problemId: 1,    // Two Sum
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "Passed",
    score: 100,
    language: "C++",
    executionTime: "12ms",
    memoryUsed: "4.2 MB",
    code: `#include <vector>\n#include <unordered_map>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> numMap;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (numMap.count(complement)) {\n                return {numMap[complement], i};\n            }\n            numMap[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
    testCases: [
      { name: "Sample 1", status: "Passed", time: "12 ms" },
      { name: "Sample 2", status: "Passed", time: "15 ms" },
      { name: "Hidden 1", status: "Passed", time: "10 ms" },
      { name: "Hidden 2", status: "Passed", time: "14 ms" }
    ],
    feedback: {
      remarks: "Excellent use of a hash map to achieve O(n) time complexity.",
      strengths: "Optimal time complexity, clean code.",
      improvements: "None"
    }
  },
  {
    id: 102,
    studentId: 2,
    assignmentId: 1,
    problemId: 1,
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "Failed",
    score: 50,
    language: "Java",
    executionTime: "45ms",
    memoryUsed: "38.5 MB",
    code: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        for (int i = 0; i < nums.length; i++) {\n            for (int j = i + 1; j < nums.length; j++) {\n                if (nums[i] + nums[j] == target) {\n                    return new int[] { i, j };\n                }\n            }\n        }\n        return new int[] {};\n    }\n}`,
    testCases: [
      { name: "Sample 1", status: "Passed", time: "45 ms" },
      { name: "Sample 2", status: "Passed", time: "42 ms" },
      { name: "Hidden 1", status: "Failed (Time Limit Exceeded)", time: "> 2000 ms" },
      { name: "Hidden 2", status: "Failed (Time Limit Exceeded)", time: "> 2000 ms" }
    ],
    feedback: {
      remarks: "The O(n^2) brute force approach works for small inputs but fails on larger hidden test cases.",
      strengths: "Correct logic for basic cases.",
      improvements: "Try using a HashMap to reduce time complexity to O(n)."
    }
  },
  {
    id: 103,
    studentId: 1,
    assignmentId: 2,
    problemId: 3,
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Passed",
    score: 95,
    language: "Python",
    executionTime: "85ms",
    memoryUsed: "14.2 MB",
    code: `class Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        preMap = {i: [] for i in range(numCourses)}\n        for crs, pre in prerequisites:\n            preMap[crs].append(pre)\n            \n        visitSet = set()\n        \n        def dfs(crs):\n            if crs in visitSet:\n                return False\n            if preMap[crs] == []:\n                return True\n                \n            visitSet.add(crs)\n            for pre in preMap[crs]:\n                if not dfs(pre):\n                    return False\n            visitSet.remove(crs)\n            preMap[crs] = []\n            return True\n            \n        for crs in range(numCourses):\n            if not dfs(crs):\n                return False\n        return True`,
    testCases: [
      { name: "Sample 1", status: "Passed", time: "85 ms" },
      { name: "Sample 2", status: "Passed", time: "90 ms" },
      { name: "Hidden 1", status: "Passed", time: "110 ms" }
    ],
    feedback: null
  }
];
