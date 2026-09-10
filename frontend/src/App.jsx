import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Layouts
import FacultyLayout from './layout/FacultyLayout';
import StudentLayout from './layout/StudentLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Student Pages
import StudentDashboard from './pages/Student/Dashboard';
import StudentCourses from './pages/Student/Courses';
import StudentCourseDetails from './pages/Student/CourseDetails';
import StudentPractice from './pages/Student/Practice';
import StudentAssignments from './pages/Student/Assignments';
import StudentContests from './pages/Student/Contests';
import StudentAnalytics from './pages/Student/Analytics';
import StudentAiMentor from './pages/Student/AiMentor';
import StudentNotifications from './pages/Student/Notifications';
import StudentProfile from './pages/Student/Profile';

// Faculty Pages
import FacultyDashboard from './pages/Dashboard';
import Announcements from './pages/Announcements/Announcements';
import Settings from './pages/Settings/Settings';

import Courses from './pages/Courses/Courses';
import CreateCourse from './pages/Courses/CreateCourse';
import EditCourse from './pages/Courses/EditCourse';
import CourseDetails from './pages/Courses/CourseDetails';

import Problems from './pages/Problems/Problems';
import CreateProblem from './pages/Problems/CreateProblem';
import EditProblem from './pages/Problems/EditProblem';
import ProblemDetails from './pages/Problems/ProblemDetails';

import Assignments from './pages/Assignments/Assignments';
import CreateAssignment from './pages/Assignments/CreateAssignment';
import EditAssignment from './pages/Assignments/EditAssignment';
import AssignmentDetails from './pages/Assignments/AssignmentDetails';
import AssignmentSubmissions from './pages/Assignments/AssignmentSubmissions';

import Students from './pages/Students/Students';
import StudentDetails from './pages/Students/StudentDetails';
import Submissions from './pages/Students/Submissions';
import SubmissionDetails from './pages/Students/SubmissionDetails';
import Performance from './pages/Students/Performance';

import Analytics from './pages/Analytics/Analytics';
import CourseAnalytics from './pages/Analytics/CourseAnalytics';
import FacultyStudentAnalytics from './pages/Analytics/StudentAnalytics';
import AssignmentAnalytics from './pages/Analytics/AssignmentAnalytics';
import Reports from './pages/Analytics/Reports';

import AIHome from './pages/AI/AIHome';
import ProblemGenerator from './pages/AI/ProblemGenerator';
import AssignmentGenerator from './pages/AI/AssignmentGenerator';
import StudentInsights from './pages/AI/StudentInsights';
import TeachingAssistant from './pages/AI/TeachingAssistant';
import AIHistory from './pages/AI/AIHistory';

function RoleRedirect() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard'} replace />;
}

export default function App() {
  return (
    <Routes>
      {/* 1. Public Entry Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 2. Student Portal Routes */}
      <Route path="/student" element={
        <ProtectedRoute requiredRole="student">
          <StudentLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="courses/:id" element={<StudentCourseDetails />} />
        <Route path="practice" element={<StudentPractice />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="contests" element={<StudentContests />} />
        <Route path="analytics" element={<StudentAnalytics />} />
        <Route path="ai-mentor" element={<StudentAiMentor />} />
        <Route path="notifications" element={<StudentNotifications />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* 3. Faculty Portal Routes */}
      <Route path="/faculty" element={
        <ProtectedRoute requiredRole="faculty">
          <FacultyLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/faculty/dashboard" replace />} />
        <Route path="dashboard" element={<FacultyDashboard />} />
        
        {/* Course Module */}
        <Route path="courses" element={<Courses />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="courses/:id/edit" element={<EditCourse />} />
        <Route path="courses/:id" element={<CourseDetails />} />

        {/* Problem Module */}
        <Route path="problems" element={<Problems />} />
        <Route path="problems/create" element={<CreateProblem />} />
        <Route path="problems/:id/edit" element={<EditProblem />} />
        <Route path="problems/:id" element={<ProblemDetails />} />

        {/* Assignment Module */}
        <Route path="assignments" element={<Assignments />} />
        <Route path="assignments/create" element={<CreateAssignment />} />
        <Route path="assignments/:id/edit" element={<EditAssignment />} />
        <Route path="assignments/:id" element={<AssignmentDetails />} />
        <Route path="assignments/:id/submissions" element={<AssignmentSubmissions />} />

        {/* Students & Submissions Module */}
        <Route path="students" element={<Students />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="students/:id/performance" element={<Performance />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="submissions/:id" element={<SubmissionDetails />} />

        {/* Analytics & Reports Module */}
        <Route path="analytics" element={<Analytics />} />
        <Route path="analytics/course/:id" element={<CourseAnalytics />} />
        <Route path="analytics/student/:id" element={<FacultyStudentAnalytics />} />
        <Route path="analytics/assignment/:id" element={<AssignmentAnalytics />} />
        <Route path="reports" element={<Reports />} />

        {/* AI Teaching Assistant Module */}
        <Route path="ai" element={<AIHome />} />
        <Route path="ai/problem-generator" element={<ProblemGenerator />} />
        <Route path="ai/assignment-generator" element={<AssignmentGenerator />} />
        <Route path="ai/student-insights" element={<StudentInsights />} />
        <Route path="ai/chat" element={<TeachingAssistant />} />
        <Route path="ai/history" element={<AIHistory />} />

        {/* Announcements & Settings */}
        <Route path="announcements" element={<Announcements />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 4. Backward Compatibility & Fallback Redirects */}
      <Route path="/dashboard" element={<RoleRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
