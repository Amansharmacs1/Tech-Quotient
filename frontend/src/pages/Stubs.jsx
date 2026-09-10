import React from 'react';

const PagePlaceholder = ({ title }) => (
  <div className="max-w-7xl mx-auto animate-fade-in">
    <h1 className="text-3xl font-bold text-secondary mb-8">{title}</h1>
    <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
        <span className="text-primary text-2xl">🚧</span>
      </div>
      <h2 className="text-xl font-semibold text-secondary mb-2">Coming Soon</h2>
      <p className="text-gray-500 text-center max-w-md">
        The {title} module is currently under development. Please check back later.
      </p>
    </div>
  </div>
);

export const Courses = () => <PagePlaceholder title="Courses" />;
export const Problems = () => <PagePlaceholder title="Coding Problems" />;
export const Assignments = () => <PagePlaceholder title="Assignments" />;
export const Analytics = () => <PagePlaceholder title="Analytics" />;
export const Profile = () => <PagePlaceholder title="Profile" />;
export const Announcements = () => <PagePlaceholder title="Announcements" />;
