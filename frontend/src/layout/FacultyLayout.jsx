import React from 'react';
import { Outlet } from 'react-router-dom';
import FacultySidebar from './FacultySidebar';
import Navbar from './Navbar';

export default function FacultyLayout() {
  return (
    <div className="flex h-screen bg-background font-sans overflow-hidden">
      <FacultySidebar />
      
      <div className="flex-1 flex flex-col ml-[260px] overflow-hidden">
        <Navbar portalType="faculty" />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
