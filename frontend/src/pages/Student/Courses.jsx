import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentCourses from '../../components/student/Courses';

export default function Courses() {
  const navigate = useNavigate();

  const handleSelectCourse = (course) => {
    navigate(`/student/courses/${course?.id || course?.code || 'cse-201'}`);
  };

  return <StudentCourses onSelectCourse={handleSelectCourse} />;
}
