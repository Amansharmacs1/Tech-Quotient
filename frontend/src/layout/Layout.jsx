import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="flex h-screen bg-background font-sans overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-[260px] overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
