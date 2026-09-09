import { executeCodeService } from '../services/judgeService.js';
import { addSubmission, getStoreData } from '../services/store.js';

export const runCode = async (req, res, next) => {
  try {
    const { code, language = 'java', problemId } = req.body;
    const result = await executeCodeService({ code, language, problemId, isSubmit: false });

    return res.json({
      success: true,
      result
    });
  } catch (error) {
    next(error);
  }
};

export const submitCode = async (req, res, next) => {
  try {
    const { code, language = 'java', problemId, assignmentId } = req.body;
    const result = await executeCodeService({ code, language, problemId, assignmentId, isSubmit: true });

    const submissionRecord = addSubmission({
      userEmail: req.user?.email || 'ansh.goyal@chitkara.edu.in',
      problemId,
      assignmentId,
      language,
      code,
      status: result.status,
      runtimeMs: result.runtimeMs,
      memoryMb: result.memoryMb,
      score: result.score,
      testCasesPassed: result.passedCases,
      totalTestCases: result.totalCases,
      outputDetails: result.output
    });

    return res.json({
      success: true,
      result,
      submission: submissionRecord
    });
  } catch (error) {
    next(error);
  }
};

export const getSubmissionHistory = async (req, res, next) => {
  try {
    const store = getStoreData();
    return res.json({
      success: true,
      submissions: store.submissions
    });
  } catch (error) {
    next(error);
  }
};
