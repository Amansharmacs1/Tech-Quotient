import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import Navbar from './Navbar';

export default function StudentLayout() {
  return (
    <div className="flex h-screen bg-background font-sans overflow-hidden">
      <StudentSidebar />
      
      <div className="flex-1 flex flex-col ml-[260px] overflow-hidden">
        <Navbar portalType="student" />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
