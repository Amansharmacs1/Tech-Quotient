import Assignment from '../models/Assignment.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all assignments
// @route   GET /api/assignments
export const getAssignments = async (req, res) => {
  try {
    const { status, courseId } = req.query;
    
    const query = { facultyId: 'faculty-123' };
    if (status) query.status = status;
    if (courseId) query.courseId = courseId;

    const assignments = await Assignment.find(query)
      .populate('courseId', 'courseName')
      .populate('problemIds', 'title difficulty')
      .sort({ createdAt: -1 });

    return sendSuccess(res, assignments);
  } catch (error) {
    return sendError(res, 'Unable to load assignments', 500);
  }
};

// @desc    Get single assignment
// @route   GET /api/assignments/:id
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('courseId', 'courseName')
      .populate('problemIds', 'title difficulty topic');
      
    if (!assignment) return sendError(res, 'Assignment not found', 404);
    if (assignment.facultyId !== 'faculty-123') return sendError(res, 'Unauthorized', 403);
    
    return sendSuccess(res, assignment);
  } catch (error) {
    return sendError(res, 'Unable to load assignment', 500);
  }
};

// @desc    Create assignment
// @route   POST /api/assignments
export const createAssignment = async (req, res) => {
  try {
    const newAssignment = await Assignment.create({
      ...req.body,
      facultyId: 'faculty-123'
    });
    return sendSuccess(res, newAssignment, 201);
  } catch (error) {
    return sendError(res, error.message || 'Unable to create assignment', 400);
  }
};

// @desc    Update assignment
// @route   PUT /api/assignments/:id
export const updateAssignment = async (req, res) => {
  try {
    let assignment = await Assignment.findById(req.params.id);
    if (!assignment) return sendError(res, 'Assignment not found', 404);
    if (assignment.facultyId !== 'faculty-123') return sendError(res, 'Unauthorized', 403);

    assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return sendSuccess(res, assignment);
  } catch (error) {
    return sendError(res, error.message || 'Unable to update assignment', 400);
  }
};

// @desc    Delete assignment
// @route   DELETE /api/assignments/:id
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return sendError(res, 'Assignment not found', 404);
    if (assignment.facultyId !== 'faculty-123') return sendError(res, 'Unauthorized', 403);

    await assignment.deleteOne();
    return sendSuccess(res, { message: 'Assignment deleted successfully' });
  } catch (error) {
    return sendError(res, 'Unable to delete assignment', 500);
  }
};
