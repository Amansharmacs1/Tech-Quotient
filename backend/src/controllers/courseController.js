import { getStoreData } from '../services/store.js';

export const getCourses = async (req, res, next) => {
  try {
    const store = getStoreData();
    return res.json({
      success: true,
      courses: store.courses
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = getStoreData();
    const course = store.courses.find(c => c.id === id || c.code === id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.json({
      success: true,
      course
    });
  } catch (error) {
    next(error);
  }
};
