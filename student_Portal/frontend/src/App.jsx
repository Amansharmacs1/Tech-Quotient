import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import CourseDetailView from './components/CourseDetailView';
import CodingWorkspace from './components/CodingWorkspace';
import Assignments from './components/Assignments';
import { 
  Code2, 
  LayoutDashboard, 
  BookOpen,
  FileText 
} from 'lucide-react';
import { studentInfo, practiceProblems, enrolledCourses } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(enrolledCourses[0]);
  const [selectedProblem, setSelectedProblem] = useState(practiceProblems[0]);

  const handleOpenCourseDetail = (course) => {
    setSelectedCourse(course || enrolledCourses[0]);
    setActiveTab('course-detail');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      
      {/* Navbar Header */}
      <header className="simple-header">
        <div className="brand-logo" onClick={() => setActiveTab('dashboard')}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--primary-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Code2 size={18} />
          </div>
          <span>Tech<span style={{ color: 'var(--primary-orange)' }}>Quotient</span></span>
        </div>

        {/* Core Nav Tabs */}
        <nav className="nav-links-row">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`nav-tab-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            <LayoutDashboard size={16} /> Dashboard
          </button>

          <button 
            onClick={() => setActiveTab('course-detail')} 
            className={`nav-tab-item ${activeTab === 'course-detail' ? 'active' : ''}`}
          >
            <BookOpen size={16} /> Course Details
          </button>

          <button 
            onClick={() => setActiveTab('coding-workspace')} 
            className={`nav-tab-item ${activeTab === 'coding-workspace' ? 'active' : ''}`}
          >
            <Code2 size={16} /> Practice Workspace
          </button>

          <button 
            onClick={() => setActiveTab('assignments')} 
            className={`nav-tab-item ${activeTab === 'assignments' ? 'active' : ''}`}
          >
            <FileText size={16} /> Assignments
          </button>
        </nav>

        {/* Student Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ textAlign: 'right', fontSize: '0.775rem' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{studentInfo.name}</div>
            <div style={{ color: 'var(--text-muted)' }}>Roll: {studentInfo.rollNo}</div>
          </div>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'var(--primary-orange)', color: 'white', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
            AG
          </div>
        </div>
      </header>

      {/* Main View Container */}
      <main className="container">
        {activeTab === 'dashboard' && (
          <Dashboard 
            setActiveTab={setActiveTab} 
            onSelectCourse={handleOpenCourseDetail}
            onSelectProblem={setSelectedProblem} 
          />
        )}

        {activeTab === 'course-detail' && (
          <CourseDetailView 
            currentCourse={selectedCourse} 
            onBack={() => setActiveTab('dashboard')}
            onOpenAssignments={() => setActiveTab('assignments')}
          />
        )}

        {activeTab === 'coding-workspace' && (
          <CodingWorkspace 
            selectedProblem={selectedProblem} 
            onSelectProblem={setSelectedProblem} 
          />
        )}

        {activeTab === 'assignments' && (
          <Assignments />
        )}
      </main>

    </div>
  );
}
