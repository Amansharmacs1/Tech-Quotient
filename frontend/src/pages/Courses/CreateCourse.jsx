import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CourseForm from '../../components/course/CourseForm';
import { addGlobalCourse } from './Courses';

const CreateCourse = () => {
  const navigate = useNavigate();

  const handleCreate = (formData) => {
    // Generate dummy ID
    const newCourse = {
      ...formData,
      id: Date.now(),
      students: 0,
      assignments: 0,
      problems: 0
    };
    
    addGlobalCourse(newCourse);
    navigate('/courses');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/courses" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-4">
          <ArrowLeft size={16} />
          Back to Courses
        </Link>
        <h1 className="text-3xl font-bold text-secondary">Create New Course</h1>
        <p className="text-gray-500 mt-1">Set up a new course to start adding students and assignments.</p>
      </div>

      <CourseForm onSubmit={handleCreate} submitLabel="Create Course" />
    </div>
  );
};

export default CreateCourse;
