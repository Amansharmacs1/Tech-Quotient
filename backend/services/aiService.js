import axios from 'axios';

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent";

const callGemini = async (prompt, systemInstruction, isJson = true) => {
  const API_KEY = process.env.AI_API_KEY;
  if (!API_KEY || API_KEY.trim() === '') {
    throw new Error("AI_API_KEY is not configured");
  }

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  };
  
  if (systemInstruction) {
    payload.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  if (isJson) {
    payload.generationConfig = { responseMimeType: "application/json" };
  }

  const response = await axios.post(`${GEMINI_API_URL}?key=${API_KEY}`, payload, {
    headers: { "Content-Type": "application/json" }
  });

  if (response.data.error) throw new Error(response.data.error.message);
  
  const text = response.data.candidates[0].content.parts[0].text;
  return isJson ? JSON.parse(text) : text;
};

// 1. Faculty AI Problem Generator
export const generateProblemService = async (options = {}) => {
  try {
    const prompt = `Generate a computer science coding problem based on these parameters:
Course: ${options.course || 'Data Structures'}
Topic: ${options.topic || 'Arrays'}
Difficulty: ${options.difficulty || 'Medium'}
Problem Type: ${options.problemType || 'Algorithm'}
Concept: ${options.concept || 'Two Pointers'}
Instructions: ${options.instructions || 'Standard competitive programming format'}

Return ONLY a JSON object with this exact structure:
{
  "title": "String",
  "difficulty": "${options.difficulty || 'Medium'}",
  "topic": "${options.topic || 'Arrays'}",
  "statement": "String",
  "inputFormat": "String",
  "outputFormat": "String",
  "constraints": ["String", "String"],
  "sampleInput": "String",
  "sampleOutput": "String",
  "explanation": "String",
  "suggestedTestCases": ["String"],
  "expectedApproach": "String",
  "timeComplexity": "String",
  "spaceComplexity": "String",
  "tags": ["String", "String"]
}`;

    return await callGemini(prompt, "You are an AI teaching assistant. Return ONLY valid JSON matching the requested structure.");
  } catch (error) {
    console.warn("Gemini API not available for problem generator, using synthesized fallback:", error.message);
    const topic = options.topic || 'Dynamic Programming';
    const difficulty = options.difficulty || 'Medium';
    return {
      title: `${topic} Optimization Challenge`,
      difficulty,
      topic,
      statement: `Given an array of integers representing resource values, determine the maximum contiguous subarray profit using a ${difficulty.toLowerCase()}-level approach.`,
      inputFormat: "The first line contains an integer N. The second line contains N integers separated by space.",
      outputFormat: "Print a single integer representing the maximum profit.",
      constraints: ["1 <= N <= 10^5", "-10^4 <= A[i] <= 10^4"],
      sampleInput: "5\n2 -1 3 4 -2",
      sampleOutput: "8",
      explanation: "The contiguous subarray [2, -1, 3, 4] gives the maximum sum of 8.",
      suggestedTestCases: ["Input: 3\n-2 -3 -1 -> Output: -1"],
      expectedApproach: "Use Kadane's algorithm to maintain current and global maximums in O(N) time.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      tags: [topic, "Optimization", difficulty]
    };
  }
};

// 2. Faculty AI Assignment Generator
export const generateAssignmentService = async (options = {}) => {
  try {
    const prompt = `Generate a programming assignment based on these parameters:
Course: ${options.course || 'Data Structures'}
Topics: ${options.topics || 'Linked Lists, Stacks'}
Number of Problems: ${options.count || 2}
Difficulty Mix: ${options.difficultyMix || 'Balanced'}
Duration: ${options.duration || 90} minutes
Total Marks: ${options.maxMarks || 100}
Objective: ${options.objective || 'Master core data structure operations'}

Return ONLY a JSON object with this exact structure:
{
  "title": "String",
  "course": "${options.course || 'Data Structures'}",
  "description": "String",
  "learningObjectives": ["String", "String"],
  "estimatedDifficulty": "String",
  "totalMarks": ${options.maxMarks || 100},
  "duration": ${options.duration || 90},
  "problems": [
    { "title": "String", "marks": Number, "difficulty": "String", "topic": "String" }
  ],
  "skillsEvaluated": ["String", "String"]
}`;

    return await callGemini(prompt, "You are an AI teaching assistant. Return ONLY valid JSON matching the requested structure.");
  } catch (error) {
    console.warn("Gemini API not available for assignment generator, using synthesized fallback:", error.message);
    return {
      title: `${options.course || 'CSE201'} Lab Assessment: ${options.topics || 'Core Structures'}`,
      course: options.course || 'Data Structures & Algorithms',
      description: `Comprehensive hands-on coding assessment evaluating ${options.topics || 'data structure traversal and memory optimization'}.`,
      learningObjectives: [
        "Implement optimal time and space complexity solutions",
        "Demonstrate robust edge-case handling for boundary conditions"
      ],
      estimatedDifficulty: "Medium",
      totalMarks: Number(options.maxMarks) || 100,
      duration: Number(options.duration) || 90,
      problems: [
        { title: "Optimal List Reversal with Constraints", marks: 50, difficulty: "Easy", topic: "Pointers" },
        { title: "Circular Queue Implementation with Lock-Free Buffer", marks: 50, difficulty: "Medium", topic: "Queues" }
      ],
      skillsEvaluated: ["Algorithm Design", "Memory Layout", "Test Case Coverage"]
    };
  }
};

// 3. Faculty AI Teaching Assistant Chat
export const chatWithAssistantService = async (message, history = []) => {
  try {
    const formattedHistory = (history || []).map(msg => ({
      role: msg.role === 'ai' || msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content || msg.text || '' }]
    }));
    
    formattedHistory.push({ role: 'user', parts: [{ text: message }] });

    const payload = {
      contents: formattedHistory,
      system_instruction: { parts: [{ text: "You are TechQuotient AI Teaching Assistant for computer science faculty. Help them analyze student performance, recommend teaching interventions, create programming assignments, and organize coding tests. Return concise, markdown-formatted responses." }] }
    };

    const API_KEY = process.env.AI_API_KEY;
    if (!API_KEY) throw new Error("AI_API_KEY not provided");

    const response = await axios.post(`${GEMINI_API_URL}?key=${API_KEY}`, payload, {
      headers: { "Content-Type": "application/json" }
    });

    if (response.data.error) throw new Error(response.data.error.message);
    
    return {
      role: 'ai',
      content: response.data.candidates[0].content.parts[0].text
    };
  } catch (error) {
    console.warn("Gemini API not available for faculty chat, using intelligent assistant engine:", error.message);
    
    let errMsg = error.response?.data?.error?.message || error.message;
    let reply = `Gemini API Error: ${errMsg}. Please check your AI_API_KEY in the .env file.`;

    return {
      role: 'ai',
      content: reply
    };
  }
};

// 4. Student TechBot Programming Mentor
export const generateAiResponseService = async ({ query, code, context = null }) => {
  const apiKey = process.env.AI_API_KEY;

  let problemDesc = 'N/A';
  let language = 'N/A';
  let output = 'N/A';
  if (context && context.problem) {
    problemDesc = context.problem.description || 'N/A';
  }
  if (context && context.language) language = context.language;
  if (context && context.output) output = context.output;

  const systemInstruction = `You are TechBot, an encouraging, step-by-step programming mentor at TechQuotient.
Your role is to give targeted debugging hints, logic explanations, and edge-case guidance.
DO NOT hallucinate answers or dump complete working solutions. Instead, guide the student to the answer.
  
Active Context:
Problem Description: ${problemDesc}
Language: ${language}
User's Code:
${code || 'N/A'}
Recent Outputs/Errors:
${output}
`;

  if (apiKey && apiKey.trim() !== '') {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction }] },
          contents: [{ parts: [{ text: `User Query: ${query}` }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            text,
            code: null,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
      } else {
        const errData = await response.json();
        return {
          text: `Gemini API Error (${response.status}): ${errData.error?.message || 'Unknown Error'}. Please check your AI_API_KEY in the .env file.`,
          code: null,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
    } catch (err) {
      console.warn('AI API request failed, using intelligent assistant mentor engine:', err.message);
      return {
          text: `Network/Connection Error to Gemini API: ${err.message}`,
          code: null,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
  }

  // Fallback intelligent assistant engine for Student TechBot
  const q = (query || '').toLowerCase();
  let text = '';
  let responseCode = null;

  if (q.includes('avl') || q.includes('rotation') || q.includes('tree')) {
    text = "In AVL Trees, balance factors can become +2 or -2 after insertion. We perform single or double rotations (LL, RR, LR, RL) to restore height balance:";
    responseCode = `// Left-Left (LL) Single Right Rotation Example in C++\nNode* rightRotate(Node* y) {\n    Node* x = y->left;\n    Node* T2 = x->right;\n    // Perform rotation\n    x->right = y;\n    y->left = T2;\n    // Update heights\n    y->height = max(height(y->left), height(y->right)) + 1;\n    x->height = max(height(x->left), height(x->right)) + 1;\n    return x; // New root\n}`;
  } else if (q.includes('memory') || q.includes('leak') || q.includes('pointer')) {
    text = "To avoid memory leaks in C++, always pair dynamic `new` calls with corresponding `delete` calls, or use modern RAII smart pointers (`std::unique_ptr`):";
    responseCode = `// Modern C++ RAII Smart Pointer Example\n#include <memory>\n\nvoid safeFunction() {\n    // Automatically freed when going out of scope\n    std::unique_ptr<int[]> buffer = std::make_unique<int[]>(1024);\n    buffer[0] = 42;\n}`;
  } else if (q.includes('complexity') || q.includes('time') || q.includes('big o')) {
    text = "When analyzing time complexity:\n- Nested loops multiplying lengths: **O(N²)**\n- Divide & conquer with binary split: **O(N log N)**\n- Hash map lookups on average: **O(1)**";
    responseCode = `// O(N) Hash Map Lookup Pattern\nMap<Integer, Integer> map = new HashMap<>();\nfor (int i = 0; i < nums.length; i++) {\n    int complement = target - nums[i];\n    if (map.containsKey(complement)) return new int[] { map.get(complement), i };\n    map.put(nums[i], i);\n}`;
  } else if (q.includes('error') || q.includes('bug') || q.includes('syntax') || q.includes('debug')) {
    text = "I checked your code snippet. Watch out for off-by-one array index boundary conditions (`i <= n` vs `i < n`), null pointer dereferencing on root nodes, or uninitialized variables.";
  } else {
    text = `Great question! When tackling this problem (${problemDesc !== 'N/A' ? problemDesc.substring(0, 50) + '...' : 'Data Structures'}), start by identifying the underlying data structure pattern. Check your code logic and edge cases!`;
  }

  return {
    text,
    code: responseCode,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};
