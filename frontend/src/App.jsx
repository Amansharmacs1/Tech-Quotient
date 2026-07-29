import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import { Problems, Assignments, Analytics, Profile } from './pages/Stubs';

import Courses from './pages/Courses/Courses';
import CreateCourse from './pages/Courses/CreateCourse';
import EditCourse from './pages/Courses/EditCourse';
import CourseDetails from './pages/Courses/CourseDetails';

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

        <Route path="problems" element={<Problems />} />
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
