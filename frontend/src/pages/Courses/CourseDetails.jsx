import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit2, Users, FileText, Code2, LineChart, Plus, FileEdit, BarChart2 } from 'lucide-react';
import { getCourseById } from '../../services/courseService';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        navigate('/courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, navigate]);

  if (loading) return <div className="text-center py-12">Loading course details...</div>;
  if (!course) return null;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link to="/courses" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-4">
          <ArrowLeft size={16} />
          Back to Courses
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-accent text-primary text-sm font-bold rounded-full">
                {course.courseCode}
              </span>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                course.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {course.status}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-secondary">{course.courseName}</h1>
          </div>
          <Link
            to={`/courses/edit/${course._id}`}
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Edit2 size={18} />
            Edit Course
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <h3 className="text-lg font-bold text-secondary mb-4">Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Department</p>
                <p className="font-medium text-gray-900">{course.department || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Semester</p>
                <p className="font-medium text-gray-900">Semester {course.semester}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Academic Year</p>
                <p className="font-medium text-gray-900">{course.academicYear || '2026-2027'}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Description</p>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                {course.description || 'No description provided for this course.'}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
             <h3 className="text-lg font-bold text-secondary mb-4">Statistics</h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Enrolled Students</p>
                    <p className="text-2xl font-bold text-gray-900">{course.students}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Assignments</p>
                    <p className="text-2xl font-bold text-gray-900">{course.assignments}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                    <Code2 size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Coding Problems</p>
                    <p className="text-2xl font-bold text-gray-900">{course.problems}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                    <LineChart size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avg. Score</p>
                    <p className="text-2xl font-bold text-gray-900">84%</p>
                  </div>
                </div>
             </div>
          </motion.div>
        </div>


      </div>
    </div>
  );
};

export default CourseDetails;
