import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CourseDetailView from './components/CourseDetailView';
import CodingWorkspace from './components/CodingWorkspace';
import Assignments from './components/Assignments';
import Courses from './components/Courses';
import Analytics from './components/Analytics';
import Contests from './components/Contests';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import { enrolledCourses, practiceProblems } from './data/mockData';

export default function App() {
  // Global role state: 'student' or 'faculty'
  const [role, setRole] = useState('student');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(enrolledCourses[0]);
  const [selectedProblem, setSelectedProblem] = useState(practiceProblems[0]);

  const handleOpenCourseDetail = (course) => {
    setSelectedCourse(course || enrolledCourses[0]);
    setActiveTab('course-detail');
  };

  return (
    <div className="app-layout">
      
      {/* Left Sidebar */}
      <Sidebar 
        role={role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Area */}
      <div className="main-content">
        
        {/* Top Navbar Header */}
        <Navbar 
          role={role} 
          setRole={setRole} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Page Container */}
        <main className="page-container">
          {activeTab === 'dashboard' && (
            <Dashboard 
              role={role}
              setActiveTab={setActiveTab} 
              onSelectCourse={handleOpenCourseDetail}
              onSelectProblem={setSelectedProblem} 
            />
          )}

          {activeTab === 'courses' && (
            <Courses 
              role={role}
              onSelectCourse={handleOpenCourseDetail} 
            />
          )}

          {activeTab === 'course-detail' && (
            <CourseDetailView 
              role={role}
              currentCourse={selectedCourse} 
              onBack={() => setActiveTab('dashboard')}
              onOpenAssignments={() => setActiveTab('assignments')}
            />
          )}

          {activeTab === 'coding-workspace' && (
            <CodingWorkspace 
              role={role}
              selectedProblem={selectedProblem} 
              onSelectProblem={setSelectedProblem} 
            />
          )}

          {activeTab === 'assignments' && (
            <Assignments role={role} />
          )}

          {activeTab === 'analytics' && (
            <Analytics role={role} />
          )}

          {activeTab === 'contests' && (
            <Contests role={role} />
          )}

          {activeTab === 'notifications' && (
            <Notifications role={role} />
          )}

          {activeTab === 'settings' && (
            <Profile role={role} />
          )}
        </main>

      </div>

    </div>
  );
}
