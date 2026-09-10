import api from './api';
import { aiGeneratedProblem, aiGeneratedAssignment, studentInsights } from '../data/aiResponses';

export const generateProblem = async (options) => {
  try {
    const response = await api.post('/ai/generate-problem', options);
    return response.data.data;
  } catch (error) {
    console.error("Failed to generate problem via backend", error);
    // Fallback to mock data
    return new Promise((resolve) => setTimeout(() => resolve(aiGeneratedProblem), 2000));
  }
};

export const generateAssignment = async (options) => {
  try {
    const response = await api.post('/ai/generate-assignment', options);
    return response.data.data;
  } catch (error) {
    console.error("Failed to generate assignment via backend", error);
    return new Promise((resolve) => setTimeout(() => resolve(aiGeneratedAssignment), 2500));
  }
};

export const generateStudentInsights = async (filters) => {
  // Insights usually require large amounts of student data.
  // For the prototype, we return the mock structure
  return new Promise((resolve) => setTimeout(() => resolve(studentInsights), 1500));
};

export const sendAssistantMessage = async (message, history = []) => {
  try {
    const response = await api.post('/ai/chat', { message, history });
    return response.data.data;
  } catch (error) {
    console.error("Failed to chat via backend", error);
    return new Promise((resolve) => {
      setTimeout(() => {
        let response = "I'm here to help! What else would you like to know?";
        if (message.toLowerCase().includes('struggling') || message.toLowerCase().includes('weak')) {
          response = "Based on recent performance data, students are facing the most difficulty in:\n\n1. Dynamic Programming – 52% average\n2. Graphs – 58% average\n3. Backtracking – 63% average\n\nI recommend starting with additional Graph traversal exercises before moving to advanced Dynamic Programming problems.";
        }
        resolve({ role: 'ai', content: response });
      }, 1500);
    });
  }
};
