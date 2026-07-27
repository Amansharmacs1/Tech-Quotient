export const studentInfo = {
  name: "Ansh Goyal",
  rollNo: "2411981092",
  department: "Computer Science & Engineering",
  institution: "Chitkara University",
  batch: "2024",
  problemsSolved: 142,
  totalProblems: 250,
  accuracy: "88.5%",
  streak: 14
};

export const enrolledCourses = [
  {
    id: "cse-201",
    code: "CSE201",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Sandeep Rana",
    progress: 78,
    sections: 13
  },
  {
    id: "cse-302",
    code: "CSE302",
    title: "Full Stack Web Development",
    instructor: "Prof. Anuj Kapoor",
    progress: 85,
    sections: 8
  },
  {
    id: "cse-204",
    code: "CSE204",
    title: "Object-Oriented Programming in Java",
    instructor: "Dr. Sandeep Rana",
    progress: 92,
    sections: 11
  }
];

export const practiceProblems = [
  {
    id: "prob-1",
    title: "Two Sum Target Pair",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    points: 20,
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    inputFormat: "First line contains N and Target. Second line contains N space-separated integers.",
    outputFormat: "Print indices of the two numbers.",
    starterCode: {
      java: `import java.util.*;\n\npublic className Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[] {};\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        int[] result = twoSum(nums, target);\n        if (result.length == 2) {\n            System.out.println(result[0] + " " + result[1]);\n        }\n    }\n}`,
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
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    inputFormat: "Single line containing string S.",
    outputFormat: "Print 'true' or 'false'.",
    starterCode: {
      java: `import java.util.*;\n\npublic className Solution {\n    public static boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '{' || c == '[') {\n                stack.push(c);\n            } else {\n                if (stack.isEmpty()) return false;\n                char top = stack.pop();\n                if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) {\n                    return false;\n                }\n            }\n        }\n        return stack.isEmpty();\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.next();\n            System.out.println(isValid(s) ? "true" : "false");\n        }\n    }\n}`,
      cpp: `#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main() {\n    string s;\n    if(cin >> s) cout << "true" << endl;\n    return 0;\n}`,
      python: `s = input().strip()\nprint("true")`
    }
  },
  {
    id: "prob-3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    points: 40,
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    inputFormat: "Single line containing string S.",
    outputFormat: "Print maximum length.",
    starterCode: {
      java: `import java.util.*;\n\npublic className Solution {\n    public static int lengthOfLongestSubstring(String s) {\n        Set<Character> set = new HashSet<>();\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < s.length(); right++) {\n            while (set.contains(s.charAt(right))) {\n                set.remove(s.charAt(left));\n                left++;\n            }\n            set.add(s.charAt(right));\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            System.out.println(lengthOfLongestSubstring(sc.next()));\n        }\n    }\n}`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    string s;\n    if(cin >> s) cout << 3 << endl;\n    return 0;\n}`
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
    status: "Pending"
  },
  {
    id: "asgn-2",
    course: "Object-Oriented Programming in Java",
    code: "CSE204",
    title: "Assignment 3: Java Polymorphism & Exception Handlers",
    dueDate: "2026-07-24",
    maxScore: 100,
    status: "Submitted",
    score: 95
  },
  {
    id: "asgn-3",
    course: "Full Stack Web Development",
    code: "CSE302",
    title: "Assignment 2: RESTful API & React Integration",
    dueDate: "2026-08-05",
    maxScore: 100,
    status: "In Progress"
  }
];
