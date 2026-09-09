import { aiGeneratedProblem, aiGeneratedAssignment, studentInsights } from '../data/aiResponses';

// Fetch the API key from Vite environment variables
// It should be defined in frontend/.env as VITE_GEMINI_API_KEY
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const callGemini = async (prompt, systemInstruction = "You are an AI teaching assistant for a computer science faculty portal. Return ONLY valid JSON matching the requested structure without markdown formatting or code blocks.") => {
  if (!API_KEY) {
    console.warn("No Gemini API Key found in environment variables. Falling back to mock data.");
    return null;
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const generateProblem = async (options) => {
  if (API_KEY) {
    const prompt = `Generate a programming problem based on these parameters:
    Course: ${options.course}
    Topic: ${options.topic}
    Difficulty: ${options.difficulty}
    Problem Type: ${options.problemType}
    Concept: ${options.concept}
    Instructions: ${options.instructions}
    
    Return ONLY a JSON object with this exact structure:
    {
      "title": "String",
      "difficulty": "${options.difficulty}",
      "topic": "${options.topic}",
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

    const result = await callGemini(prompt);
    if (result) return result;
  }

  // Fallback to mock data
  return new Promise((resolve) => setTimeout(() => resolve(aiGeneratedProblem), 2000));
};

export const generateAssignment = async (options) => {
  if (API_KEY) {
    const prompt = `Generate a programming assignment based on these parameters:
    Course: ${options.course}
    Topics: ${options.topics}
    Number of Problems: ${options.count}
    Difficulty Mix: ${options.difficultyMix}
    Duration: ${options.duration} minutes
    Total Marks: ${options.maxMarks}
    Objective: ${options.objective}
    
    Return ONLY a JSON object with this exact structure:
    {
      "title": "String",
      "course": "${options.course}",
      "description": "String",
      "learningObjectives": ["String", "String"],
      "estimatedDifficulty": "String",
      "totalMarks": ${options.maxMarks},
      "duration": ${options.duration},
      "problems": [
        { "title": "String", "marks": Number, "difficulty": "String", "topic": "String" }
      ],
      "skillsEvaluated": ["String", "String"]
    }`;

    const result = await callGemini(prompt);
    if (result) return result;
  }

  return new Promise((resolve) => setTimeout(() => resolve(aiGeneratedAssignment), 2500));
};

export const generateStudentInsights = async (filters) => {
  // Insights usually require large amounts of student data.
  // For the prototype, we return the mock structure unless we want to send dummy CSV data to the AI.
  return new Promise((resolve) => setTimeout(() => resolve(studentInsights), 1500));
};

export const sendAssistantMessage = async (message, history = []) => {
  if (API_KEY) {
    try {
      // Format history for Gemini API
      const formattedHistory = history.map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));
      
      // Add current message
      formattedHistory.push({ role: 'user', parts: [{ text: message }] });

      const response = await fetch(`${API_URL.replace('generateContent', 'generateContent')}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: formattedHistory,
          systemInstruction: { parts: [{ text: "You are an AI teaching assistant for computer science faculty. You help them analyze student data, create coding problems, and manage their courses. Be helpful, concise, and professional. Do NOT return JSON, return regular markdown text." }] },
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      return {
        role: 'ai',
        content: data.candidates[0].content.parts[0].text
      };
    } catch (error) {
      console.error("Gemini API Error in Chat:", error);
    }
  }

  // Fallback
  return new Promise((resolve) => {
    setTimeout(() => {
      let response = "I'm here to help! What else would you like to know?";
      if (message.toLowerCase().includes('struggling') || message.toLowerCase().includes('weak')) {
        response = "Based on recent performance data, students are facing the most difficulty in:\n\n1. Dynamic Programming – 52% average\n2. Graphs – 58% average\n3. Backtracking – 63% average\n\nI recommend starting with additional Graph traversal exercises before moving to advanced Dynamic Programming problems.";
      }
      resolve({ role: 'ai', content: response });
    }, 1500);
  });
};
