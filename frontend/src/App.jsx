import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import { Profile } from './pages/Stubs';

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

import Analytics from './pages/Analytics/Analytics';
import CourseAnalytics from './pages/Analytics/CourseAnalytics';
import StudentAnalytics from './pages/Analytics/StudentAnalytics';
import AssignmentAnalytics from './pages/Analytics/AssignmentAnalytics';
import Reports from './pages/Analytics/Reports';

import AIHome from './pages/AI/AIHome';
import ProblemGenerator from './pages/AI/ProblemGenerator';
import AssignmentGenerator from './pages/AI/AssignmentGenerator';
import StudentInsights from './pages/AI/StudentInsights';
import TeachingAssistant from './pages/AI/TeachingAssistant';
import AIHistory from './pages/AI/AIHistory';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* Course Module Routes */}
        <Route path="courses">
          <Route index element={<Courses />} />
          <Route path="create" element={<CreateCourse />} />
          <Route path="edit/:id" element={<EditCourse />} />
          <Route path=":id" element={<CourseDetails />} />
        </Route>

        {/* Coding Problems Module Routes */}
        <Route path="problems">
          <Route index element={<Problems />} />
          <Route path="create" element={<CreateProblem />} />
          <Route path="edit/:id" element={<EditProblem />} />
          <Route path=":id" element={<ProblemDetails />} />
        </Route>
        {/* Assignment Module Routes */}
        <Route path="assignments">
          <Route index element={<Assignments />} />
          <Route path="create" element={<CreateAssignment />} />
          <Route path="edit/:id" element={<EditAssignment />} />
          <Route path=":id" element={<AssignmentDetails />} />
          <Route path=":id/submissions" element={<AssignmentSubmissions />} />
        </Route>
        <Route path="contests" element={<Courses />} />
        {/* Student Module Routes */}
        <Route path="students">
          <Route index element={<Students />} />
          <Route path=":id" element={<StudentDetails />} />
        </Route>

        {/* Submissions Module Routes */}
        <Route path="submissions">
          <Route index element={<Submissions />} />
          <Route path=":id" element={<SubmissionDetails />} />
        </Route>

        {/* Analytics & Reports Module Routes */}
        <Route path="analytics">
          <Route index element={<Analytics />} />
          <Route path="course" element={<CourseAnalytics />} />
          <Route path="student" element={<StudentAnalytics />} />
          <Route path="assignment" element={<AssignmentAnalytics />} />
        </Route>
        
        <Route path="reports" element={<Reports />} />
        
        {/* AI Workspace Routes */}
        <Route path="ai">
          <Route index element={<AIHome />} />
          <Route path="problem-generator" element={<ProblemGenerator />} />
          <Route path="assignment-generator" element={<AssignmentGenerator />} />
          <Route path="student-insights" element={<StudentInsights />} />
          <Route path="assistant" element={<TeachingAssistant />} />
          <Route path="history" element={<AIHistory />} />
        </Route>

        <Route path="announcements" element={<Courses />} />
        <Route path="settings" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
