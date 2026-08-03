import React from 'react';
import { Play, CheckCircle2, FileCode2 } from 'lucide-react';

const TimelineItem = ({ title, timestamp, icon: Icon, isLast = false, isActive = false }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isActive ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-gray-100 text-gray-400'}`}>
        <Icon size={16} />
      </div>
      {!isLast && <div className={`w-0.5 h-full my-1 ${isActive ? 'bg-primary/30' : 'bg-gray-100'}`}></div>}
    </div>
    <div className="pb-8 pt-1">
      <h4 className={`text-sm font-bold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{title}</h4>
      <p className="text-xs text-gray-400 mt-1 font-mono">{timestamp}</p>
    </div>
  </div>
);

const SubmissionTimeline = ({ submission }) => {
  const submitTime = new Date(submission.submittedAt);
  const evalTime = new Date(submitTime.getTime() + 2 * 60000); // 2 mins later
  
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-6 text-lg">Activity Timeline</h3>
      
      <div className="pl-2">
        <TimelineItem 
          title="Code Submitted" 
          timestamp={submitTime.toLocaleString()} 
          icon={FileCode2} 
          isActive={true} 
        />
        <TimelineItem 
          title="Auto-Evaluation Started" 
          timestamp={new Date(submitTime.getTime() + 5000).toLocaleString()} 
          icon={Play} 
          isActive={true} 
        />
        <TimelineItem 
          title="Evaluation Completed" 
          timestamp={evalTime.toLocaleString()} 
          icon={CheckCircle2} 
          isActive={true} 
          isLast={true} 
        />
      </div>
    </div>
  );
};

export default SubmissionTimeline;
