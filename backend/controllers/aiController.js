import { generateProblemService, generateAssignmentService, chatWithAssistantService } from '../services/aiService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const generateProblem = async (req, res) => {
  try {
    const result = await generateProblemService(req.body);
    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const generateAssignment = async (req, res) => {
  try {
    const result = await generateAssignmentService(req.body);
    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const chat = async (req, res) => {
  try {
    const { message, history } = req.body;
    const result = await chatWithAssistantService(message, history);
    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};
