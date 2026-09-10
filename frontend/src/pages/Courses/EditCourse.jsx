import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CourseForm from '../../components/course/CourseForm';
import { getCourseById, updateCourse } from '../../services/courseService';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        navigate('/courses');
      }
    };
    fetchCourse();
  }, [id, navigate]);

  const handleUpdate = async (formData) => {
    try {
      await updateCourse(id, formData);
      navigate('/courses');
    } catch (err) {
      alert('Failed to update course.');
    }
  };

  if (!course) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/courses" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-4">
          <ArrowLeft size={16} />
          Back to Courses
        </Link>
        <h1 className="text-3xl font-bold text-secondary">Edit Course: {course.courseCode}</h1>
        <p className="text-gray-500 mt-1">Update details for {course.courseName}.</p>
      </div>

      <CourseForm 
        initialData={course} 
        onSubmit={handleUpdate} 
        submitLabel="Update Course" 
      />
    </div>
  );
};

export default EditCourse;
