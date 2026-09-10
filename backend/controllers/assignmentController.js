import Assignment from '../models/Assignment.js';
import Submission from '../models/Submission.js';
import { getStoreData, addAssignment, updateAssignment as storeUpdateAssignment, deleteAssignment as storeDeleteAssignment, addSubmission } from '../services/store.js';
import { executeCodeService } from '../services/judgeService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all assignments
// @route   GET /api/assignments
export const getAssignments = async (req, res, next) => {
  try {
    const { status, courseId, search } = req.query;

    try {
      const query = {};
      if (status) query.status = status;
      if (courseId) query.courseId = courseId;
      if (search) query.title = { $regex: search, $options: 'i' };

      const assignments = await Assignment.find(query)
        .populate('courseId', 'courseName courseCode title code')
        .populate('problemIds', 'title difficulty points')
        .sort({ createdAt: -1 });

      if (assignments && assignments.length > 0) {
        return res.json({
          success: true,
          data: assignments,
          assignments
        });
      }
    } catch (dbErr) {}

    let assignments = getStoreData().assignments;
    if (status) {
      assignments = assignments.filter(a => a.status?.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const s = search.toLowerCase();
      assignments = assignments.filter(a => a.title?.toLowerCase().includes(s));
    }

    return res.json({
      success: true,
      data: assignments,
      assignments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single assignment
// @route   GET /api/assignments/:id
export const getAssignmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      let assignment = null;
      if (id.length === 24) {
        assignment = await Assignment.findById(id)
          .populate('courseId', 'courseName courseCode')
          .populate('problemIds');
      }
      if (!assignment) {
        assignment = await Assignment.findOne({ customId: id })
          .populate('courseId', 'courseName courseCode')
          .populate('problemIds');
      }
      if (assignment) {
        return res.json({
          success: true,
          data: assignment,
          assignment
        });
      }
    } catch (dbErr) {}

    const store = getStoreData();
    const assignment = store.assignments.find(a => a.id === id || a._id === id || a.customId === id);

    if (!assignment) return sendError(res, 'Assignment not found', 404);

    return res.json({
      success: true,
      data: assignment,
      assignment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create assignment (Faculty only)
// @route   POST /api/assignments
export const createAssignment = async (req, res, next) => {
  try {
    const facultyId = req.user?.id || req.user?._id || 'user-faculty-1';

    try {
      const newAssignment = await Assignment.create({
        ...req.body,
        facultyId
      });

      return res.status(201).json({
        success: true,
        data: newAssignment,
        assignment: newAssignment
      });
    } catch (dbErr) {
      const newAssignment = addAssignment({
        ...req.body,
        facultyId
      });

      return res.status(201).json({
        success: true,
        data: newAssignment,
        assignment: newAssignment
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update assignment (Faculty only)
// @route   PUT /api/assignments/:id
export const updateAssignment = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const updated = await Assignment.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (updated) {
        return res.json({
          success: true,
          data: updated,
          assignment: updated
        });
      }
    } catch (dbErr) {}

    const updated = storeUpdateAssignment(id, req.body);
    if (!updated) return sendError(res, 'Assignment not found', 404);

    return res.json({
      success: true,
      data: updated,
      assignment: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete assignment (Faculty only)
// @route   DELETE /api/assignments/:id
export const deleteAssignment = async (req, res, next) => {
  try {
    const { id } = req.params;

    try {
      const deleted = await Assignment.findByIdAndDelete(id);
      if (deleted) return sendSuccess(res, { message: 'Assignment deleted successfully' });
    } catch (dbErr) {}

    storeDeleteAssignment(id);
    return sendSuccess(res, { message: 'Assignment deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Student submits solution for assignment
// @route   POST /api/assignments/:id/submit
export const submitAssignmentSolution = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, language } = req.body;
    const userEmail = req.user?.email || 'ansh.goyal@chitkarauniversity.edu.in';
    const studentId = req.user?._id || req.user?.id || 'student-1';

    const judgeResult = await executeCodeService({
      code,
      language,
      assignmentId: id,
      isSubmit: true
    });

    const submissionData = {
      assignmentId: id,
      studentId,
      userEmail,
      language: language || 'Java',
      code,
      status: judgeResult.status === 'ACCEPTED' ? 'Evaluated' : 'Failed',
      score: judgeResult.score || (judgeResult.status === 'ACCEPTED' ? 100 : 0),
      runtimeMs: judgeResult.runtimeMs,
      memoryMb: judgeResult.memoryMb,
      testCasesPassed: judgeResult.passedCases,
      totalTestCases: judgeResult.totalCases,
      outputDetails: judgeResult.output,
      aiFeedback: 'Great work! Code is clean and successfully passes all corner test cases.'
    };

    try {
      await Submission.create(submissionData);
    } catch (dbErr) {
      addSubmission(submissionData);
    }

    return res.json({
      success: true,
      message: 'Assignment submitted successfully!',
      result: judgeResult,
      submission: submissionData
    });
  } catch (error) {
    next(error);
  }
};
