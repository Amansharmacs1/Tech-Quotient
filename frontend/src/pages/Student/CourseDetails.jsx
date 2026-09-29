import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseDetailView from '../../components/student/CourseDetailView';
import { coursesData } from '../../data/mockData';
import { fetchCourses } from '../../services/api';

export default function CourseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentCourse, setCurrentCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourse = async () => {
      setLoading(true);
      const fetchedCourses = await fetchCourses();
      let foundCourse = null;
      if (fetchedCourses) {
        foundCourse = fetchedCourses.find(c => c._id === id || c.id === id || c.courseCode === id || c.code === id);
      }
      
      if (!foundCourse) {
        foundCourse = coursesData?.find(c => c.id === id || c.code === id) || coursesData?.[0];
      }
      
      setCurrentCourse(foundCourse);
      setLoading(false);
    };
    
    getCourse();
  }, [id]);

  if (loading) {
    return <div>Loading course details...</div>;
  }

  return (
    <CourseDetailView
      currentCourse={currentCourse}
      onBack={() => navigate('/student/courses')}
      onOpenAssignments={() => navigate('/student/assignments')}
    />
  );
}
