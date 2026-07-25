import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import { Courses, Problems, Assignments, Analytics, Profile } from './pages/Stubs';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
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
