import React from 'react';

export default function ActivityCard({ activities = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-secondary mb-6">Recent Submissions</h3>
      
      <div className="relative border-l-2 border-accent ml-3">
        {activities.map((activity, index) => {
          const studentName = activity.studentId?.name || 'Unknown Student';
          const assignmentTitle = activity.assignmentId?.title || 'Unknown Assignment';
          const time = new Date(activity.createdAt).toLocaleDateString();
          return (
            <div key={activity._id || index} className="mb-8 ml-6 last:mb-0">
              <span className="absolute flex items-center justify-center w-3 h-3 bg-primary rounded-full -left-[7px] ring-4 ring-white"></span>
              <p className="text-sm font-medium text-secondary">{studentName} submitted {assignmentTitle}</p>
              <p className="text-xs text-gray-500 mt-1">{time} • Score: {activity.score}</p>
            </div>
          );
        })}
        {activities.length === 0 && (
          <p className="text-sm text-gray-500 ml-6">No recent activities.</p>
        )}
      </div>
    </div>
  );
}
