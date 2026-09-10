import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConstraintsEditor from './ConstraintsEditor';
import TestCaseEditor from './TestCaseEditor';
import { getCourses } from '../../services/courseService';

const availableLanguages = ['C++', 'Java', 'Python', 'JavaScript'];

const ProblemForm = ({ initialData, onSubmit, onCancel, submitLabel }) => {
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
      topic: '',
      difficulty: 'Easy',
      status: 'Published',
      statement: '',
      inputFormat: '',
      outputFormat: '',
      explanation: '',
      language: ['C++', 'Java', 'Python'],
      constraints: ['1 <= n <= 10^5'],
      testCases: [
        { id: 1, input: '', output: '', visibility: 'Sample' }
      ],
      submissions: 0,
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageToggle = (lang) => {
    setFormData((prev) => {
      const current = prev.language || [];
      if (current.includes(lang)) {
        return { ...prev, language: current.filter(l => l !== lang) };
      } else {
        return { ...prev, language: [...current, lang] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/problems');
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Problem Title *</label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Two Sum"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              >
                <option value="">Select Topic</option>
                <option value="Arrays">Arrays</option>
                <option value="Strings">Strings</option>
                <option value="Trees">Trees</option>
                <option value="Graphs">Graphs</option>
                <option value="Dynamic Programming">Dynamic Programming</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Problem Description */}
        <div className="p-8 bg-gray-50/30">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Problem Description</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Problem Statement *</label>
              <textarea
                required
                name="statement"
                value={formData.statement}
                onChange={handleChange}
                rows="6"
                placeholder="Describe the problem clearly..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Input Format</label>
                <textarea
                  name="inputFormat"
                  value={formData.inputFormat}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe the input structure..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y text-sm"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Output Format</label>
                <textarea
                  name="outputFormat"
                  value={formData.outputFormat}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe the expected output..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y text-sm"
                ></textarea>
              </div>
            </div>

            <ConstraintsEditor 
              constraints={formData.constraints} 
              onChange={(newConstraints) => setFormData(prev => ({ ...prev, constraints: newConstraints }))} 
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Explanation (Optional)</label>
              <textarea
                name="explanation"
                value={formData.explanation}
                onChange={handleChange}
                rows="2"
                placeholder="Explain the sample test case..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y text-sm"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Execution & Testing</h3>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">Supported Languages</label>
            <div className="flex flex-wrap gap-4">
              {availableLanguages.map(lang => (
                <label key={lang} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(formData.language || formData.supportedLanguages || []).includes(lang)}
                    onChange={() => handleLanguageToggle(lang)}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">{lang}</span>
                </label>
              ))}
            </div>
          </div>

          <TestCaseEditor 
            testCases={formData.testCases} 
            onChange={(newTestCases) => setFormData(prev => ({ ...prev, testCases: newTestCases }))} 
          />
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
            {submitLabel || 'Save Problem'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProblemForm;
