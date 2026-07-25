import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-[70px] bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-secondary">
          Faculty Dashboard
        </h2>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-background placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary transition duration-150 ease-in-out sm:text-sm"
            placeholder="Search courses, problems..."
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end space-x-6">
        <button className="text-gray-400 hover:text-primary transition-colors relative">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary ring-2 ring-white"></span>
        </button>

        <div className="flex items-center space-x-3 cursor-pointer group">
          <img
            className="h-10 w-10 rounded-full object-cover border-2 border-transparent group-hover:border-primary transition-colors"
            src="https://ui-avatars.com/api/?name=Professor+Doe&background=FFF1E8&color=F26422"
            alt="Profile"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-secondary">Prof. Doe</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </header>
  );
}
