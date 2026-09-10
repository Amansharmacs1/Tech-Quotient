import { 
  generateAiResponseService, 
  generateProblemService, 
  generateAssignmentService, 
  chatWithAssistantService 
} from '../services/aiService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Unified AI Chat (Student Mentor & Faculty Assistant)
// @route   POST /api/ai/chat
export const handleAiChat = async (req, res, next) => {
  try {
    const { query, code, context, message, history } = req.body;

    // 1. If faculty assistant message
    if (message && !query) {
      const result = await chatWithAssistantService(message, history || []);
      return res.json({
        success: true,
        data: result,
        response: result
      });
    }

    // 2. Student mentor query
    const studentQuery = query || message || 'Hello TechBot!';
    const response = await generateAiResponseService({ query: studentQuery, code, context });

    return res.json({
      success: true,
      data: response,
      response
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Faculty AI Problem Generator
// @route   POST /api/ai/generate-problem
export const generateProblem = async (req, res, next) => {
  try {
    const result = await generateProblemService(req.body);
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

// @desc    Faculty AI Assignment Generator
// @route   POST /api/ai/generate-assignment
export const generateAssignment = async (req, res, next) => {
  try {
    const result = await generateAssignmentService(req.body);
    return sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};
