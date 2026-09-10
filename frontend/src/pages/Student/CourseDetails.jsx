import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseDetailView from '../../components/student/CourseDetailView';
import { coursesData } from '../../data/mockData';

export default function CourseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentCourse = coursesData?.find(c => c.id === id || c.code === id) || coursesData?.[0];

  return (
    <CourseDetailView
      currentCourse={currentCourse}
      onBack={() => navigate('/student/courses')}
      onOpenAssignments={() => navigate('/student/assignments')}
    />
  );
}
