import axios from 'axios';

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

const callGemini = async (prompt, systemInstruction, isJson = true) => {
  const API_KEY = process.env.AI_API_KEY;
  if (!API_KEY) {
    throw new Error("AI_API_KEY is not defined in environment variables");
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

  const response = await axios.post(`${API_URL}?key=${API_KEY}`, payload, {
    headers: { "Content-Type": "application/json" }
  });

  if (response.data.error) throw new Error(response.data.error.message);
  
  const text = response.data.candidates[0].content.parts[0].text;
  return isJson ? JSON.parse(text) : text;
};

export const generateProblemService = async (options) => {
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

  return await callGemini(prompt, "You are an AI teaching assistant. Return ONLY valid JSON matching the requested structure.");
};

export const generateAssignmentService = async (options) => {
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

  return await callGemini(prompt, "You are an AI teaching assistant. Return ONLY valid JSON matching the requested structure.");
};

export const chatWithAssistantService = async (message, history = []) => {
  const API_KEY = process.env.AI_API_KEY;
  if (!API_KEY) throw new Error("AI_API_KEY missing");
  
  const formattedHistory = history.map(msg => ({
    role: msg.role === 'ai' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
  
  formattedHistory.push({ role: 'user', parts: [{ text: message }] });

  const payload = {
    contents: formattedHistory,
    systemInstruction: { parts: [{ text: "You are an AI teaching assistant for computer science faculty. You help them analyze student data, create coding problems, and manage their courses. Be helpful, concise, and professional. Do NOT return JSON, return regular markdown text." }] },
  };

  let response;
  try {
    response = await axios.post(`${API_URL}?key=${API_KEY}`, payload, {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Axios Error:", err.response?.data || err.message);
    throw err;
  }

  if (response.data.error) throw new Error(response.data.error.message);
  
  return {
    role: 'ai',
    content: response.data.candidates[0].content.parts[0].text
  };
};
