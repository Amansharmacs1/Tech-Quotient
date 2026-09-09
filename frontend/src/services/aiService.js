import { aiGeneratedProblem, aiGeneratedAssignment, studentInsights } from '../data/aiResponses';

// Mock service architecture ready for future LLM integration
// e.g. replacing these with real fetch/axios calls to your backend

export const generateProblem = async (options) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(aiGeneratedProblem);
    }, 2000);
  });
};

export const generateAssignment = async (options) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(aiGeneratedAssignment);
    }, 2500);
  });
};

export const generateStudentInsights = async (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(studentInsights);
    }, 1500);
  });
};

export const sendAssistantMessage = async (message, history = []) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple mock logic for chat
      let response = "I'm here to help! What else would you like to know?";
      
      if (message.toLowerCase().includes('struggling') || message.toLowerCase().includes('weak')) {
        response = "Based on recent performance data, students are facing the most difficulty in:\n\n1. Dynamic Programming – 52% average\n2. Graphs – 58% average\n3. Backtracking – 63% average\n\nI recommend starting with additional Graph traversal exercises before moving to advanced Dynamic Programming problems.";
      } else if (message.toLowerCase().includes('generate') || message.toLowerCase().includes('create')) {
        response = "I can certainly help with that. Would you like me to open the Problem Generator or Assignment Generator with those parameters pre-filled?";
      }

      resolve({
        role: 'ai',
        content: response
      });
    }, 1500);
  });
};
