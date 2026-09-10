import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProblemSelector from './ProblemSelector';
import { getCourses } from '../../services/courseService';

const AssignmentForm = ({ initialData, onSubmit, onCancel, submitLabel }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error('Failed to load courses');
      }
    };
    fetchCourses();
  }, []);

  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      courseId: '',
      description: '',
      problemIds: [],
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      duration: 120, // DB model expects 'duration' not 'timeLimit'
      maximumMarks: 100, // DB model expects 'maximumMarks'
      attemptsAllowed: 1, // DB model expects Number
      status: 'Draft',
      submissions: 0,
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProblemSelection = (newProblemIds) => {
    setFormData((prev) => ({ ...prev, problemIds: newProblemIds }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/assignments');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm"
    >
      <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
        
        {/* Basic Information */}
        <div className="p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title *</label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., DSA Assignment 1"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
              <select
                required
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              >
                <option value="">Select Course</option>
                {courses.map(c => (
                  <option key={c._id} value={c._id}>{c.courseName}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Describe the purpose of this assignment..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Coding Problems Selection */}
        <div className="p-8 bg-gray-50/30">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Coding Problems</h3>
          <p className="text-sm text-gray-500 mb-4">Select the programming questions to include in this assignment.</p>
          
          <ProblemSelector 
            selectedProblemIds={formData.problemIds} 
            onChange={handleProblemSelection} 
            courseId={formData.courseId} // Pass down to filter problems by course
          />
        </div>

        {/* Assignment Settings */}
        <div className="p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Assignment Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline *</label>
              <input
                required
                type="date"
                name="deadline"
                value={formData.deadline ? formData.deadline.substring(0, 10) : ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit (mins) *</label>
              <input
                required
                type="number"
                min="1"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Marks *</label>
              <input
                required
                type="number"
                min="1"
                name="maximumMarks"
                value={formData.maximumMarks}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attempts Allowed *</label>
              <input
                required
                type="number"
                min="1"
                name="attemptsAllowed"
                value={formData.attemptsAllowed}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Visibility Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              >
                <option value="Draft">Draft (Hidden from students)</option>
                <option value="Published">Published (Visible to students)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2.5 rounded-lg text-gray-700 font-medium border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <X size={18} />
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-sm shadow-primary/30"
          >
            <Save size={18} />
            {submitLabel || 'Save Assignment'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AssignmentForm;
