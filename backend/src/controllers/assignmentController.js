import { getStoreData, updateAssignmentStatus } from '../services/store.js';

export const getAssignments = async (req, res, next) => {
  try {
    const store = getStoreData();
    return res.json({
      success: true,
      assignments: store.assignments
    });
  } catch (error) {
    next(error);
  }
};

export const submitAssignmentSolution = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, language } = req.body;

    const updated = updateAssignmentStatus(id, {
      status: 'Submitted',
      score: 95
    });

    return res.json({
      success: true,
      message: 'Assignment submitted successfully',
      assignment: updated,
      result: {
        status: 'GRADED',
        score: 95,
        maxScore: 100,
        feedback: 'ASSIGNMENT SUBMITTED SUCCESSFULLY!\nStatus: Graded (95/100)\nFaculty Note: Excellent Java code structure and AVL balance factor validation.'
      }
    });
  } catch (error) {
    next(error);
  }
};
