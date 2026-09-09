import { generateAiResponseService } from '../services/aiService.js';

export const handleAiChat = async (req, res, next) => {
  try {
    const { query, code, context } = req.body;
    const response = await generateAiResponseService({ query, code, context });

    return res.json({
      success: true,
      response
    });
  } catch (error) {
    next(error);
  }
};
