import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from '../../components/student/Dashboard';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleSelectCourse = (course) => {
    navigate('/student/courses');
  };

  const handleSelectProblem = (problem) => {
    navigate('/student/practice');
  };

  const handleTabChange = (tab) => {
    switch (tab) {
      case 'courses':
        navigate('/student/courses');
        break;
      case 'course-detail':
        navigate('/student/courses');
        break;
      case 'coding-workspace':
        navigate('/student/practice');
        break;
      case 'assignments':
        navigate('/student/assignments');
        break;
      case 'contests':
        navigate('/student/contests');
        break;
      case 'analytics':
        navigate('/student/analytics');
        break;
      case 'notifications':
        navigate('/student/notifications');
        break;
      case 'settings':
      case 'profile':
        navigate('/student/profile');
        break;
      case 'ai-mentor':
        navigate('/student/ai-mentor');
        break;
      default:
        navigate('/student/dashboard');
    }
  };

  return (
    <StudentDashboard
      role="student"
      setActiveTab={handleTabChange}
      onSelectCourse={handleSelectCourse}
      onSelectProblem={handleSelectProblem}
    />
  );
}
