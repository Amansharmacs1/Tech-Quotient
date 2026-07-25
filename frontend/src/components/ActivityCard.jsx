import React from 'react';

const activities = [
  { id: 1, text: 'Created DSA Assignment', time: '2 hours ago' },
  { id: 2, text: 'Added 5 Coding Problems', time: 'Yesterday' },
  { id: 3, text: 'Reviewed 30 submissions', time: '3 days ago' },
];

export default function ActivityCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-secondary mb-6">Recent Activities</h3>
      
      <div className="relative border-l-2 border-accent ml-3">
        {activities.map((activity, index) => (
          <div key={activity.id} className="mb-8 ml-6 last:mb-0">
            <span className="absolute flex items-center justify-center w-3 h-3 bg-primary rounded-full -left-[7px] ring-4 ring-white"></span>
            <p className="text-sm font-medium text-secondary">{activity.text}</p>
            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
