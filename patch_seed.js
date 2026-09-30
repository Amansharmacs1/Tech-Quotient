const fs = require('fs');
const path = 'backend/seed.js';
let content = fs.readFileSync(path, 'utf8');

const swapProblemStr = `
    const prob2 = await Problem.create({
      customId: 'prob-2',
      title: 'Swap Two Variables',
      topic: 'Math',
      category: 'Math & Logic',
      difficulty: 'Easy',
      points: 10,
      solvedCount: 142,
      accuracy: '88.5%',
      description: 'Given two integers **a** and **b**, your task is to swap their values so that **a** holds the original value of **b**, and **b** holds the original value of **a**. You can solve this using a temporary variable, or challenge yourself to do it *without* using a temporary third variable!\\n\\n**Input Format:**\\nA single line containing two space-separated integers, **a** and **b**.\\n\\n**Output Format:**\\nA single line containing the two space-separated integers after swapping.',
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
        java: 'import java.util.*;\\npublic class Solution {\\n    public static void main(String[] args) {\\n        Scanner sc = new Scanner(System.in);\\n        if (!sc.hasNextInt()) return;\\n        int a = sc.nextInt();\\n        int b = sc.nextInt();\\n        \\n        // Write your solution here to swap a and b\\n        \\n        \\n        System.out.println(a + " " + b);\\n    }\\n}',
        cpp: '#include <iostream>\\nusing namespace std;\\n\\nint main() {\\n    int a, b;\\n    if (!(cin >> a >> b)) return 0;\\n    \\n    // Write your solution here to swap a and b\\n    \\n    \\n    cout << a << " " << b << endl;\\n    return 0;\\n}',
        python: 'import sys\\n\\ndef main():\\n    input_data = sys.stdin.read().split()\\n    if not input_data: return\\n    a = int(input_data[0])\\n    b = int(input_data[1])\\n    \\n    # Write your solution here to swap a and b\\n    \\n    \\n    print(str(a) + " " + str(b))\\n\\nif __name__ == "__main__":\\n    main()',
        javascript: 'const fs = require("fs");\\n\\nfunction main() {\\n    const input = fs.readFileSync(0, "utf-8").trim().split("\\\\s+");\\n    if (input.length < 2) return;\\n    let a = parseInt(input[0], 10);\\n    let b = parseInt(input[1], 10);\\n    \\n    // Write your solution here to swap a and b\\n    \\n    \\n    console.log(a + " " + b);\\n}\\n\\nmain();'
      }
    });

    // 4. Create Assignment`;

content = content.replace('// 4. Create Assignment', swapProblemStr);
fs.writeFileSync(path, content);
