import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import { Assignments, Analytics, Profile } from './pages/Stubs';

import Courses from './pages/Courses/Courses';
import CreateCourse from './pages/Courses/CreateCourse';
import EditCourse from './pages/Courses/EditCourse';
import CourseDetails from './pages/Courses/CourseDetails';

import Problems from './pages/Problems/Problems';
import CreateProblem from './pages/Problems/CreateProblem';
import EditProblem from './pages/Problems/EditProblem';
import ProblemDetails from './pages/Problems/ProblemDetails';

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
        <Route path="assignments" element={<Assignments />} />
        <Route path="contests" element={<Courses />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="announcements" element={<Courses />} />
        <Route path="settings" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
