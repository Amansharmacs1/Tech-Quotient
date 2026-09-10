import React, { useState } from 'react';
import { 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown, 
  Check, 
  FileText, 
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export default function CourseDetailView({ currentCourse, onBack, onOpenAssignments }) {
  const initialCourse = currentCourse || {
    id: "23CS002",
    code: "23CS002-Introduction to Web Technologies_04-09-2024",
    progress: 94,
    modules: [
      { id: 1, title: "Basic HTML Tags", status: "DONE", commentsCount: 1, docsCount: 14, completed: true },
      { id: 2, title: "HTML Tables", status: "DONE", commentsCount: 0, docsCount: 2, completed: true },
      { id: 3, title: "HTML Forms", status: "DONE", commentsCount: 0, docsCount: 11, completed: true },
      { id: 4, title: "Introduction to CSS", status: "DONE", commentsCount: 0, docsCount: 11, completed: true },
      { id: 5, title: "CSS Box Model", status: "DONE", commentsCount: 0, docsCount: 11, completed: true },
      { 
        id: 6, 
        title: "Layout using Basic CSS", 
        status: "75%", 
        commentsCount: 0, 
        docsCount: 4,
        completed: false,
        topics: [
          { id: 't1', num: 1, tag: "WEB", title: "CSS Display and Positioning: Position", done: false },
          { id: 't2', num: 2, tag: "WEB", title: "CSS Display and Positioning: Z-index", done: true },
          { id: 't3', num: 3, tag: "WEB", title: "CSS Display and Positioning: Display", done: true },
          { id: 't4', num: 4, tag: "WEB", title: "CSS Display and Positioning: Float and Clear", done: true }
        ]
      }
    ]
  };

  const [course, setCourse] = useState(initialCourse);
  const [selectedTab, setSelectedTab] = useState('content');
  const [selectedModuleId, setSelectedModuleId] = useState(6);
  const [toastMessage, setToastMessage] = useState('');

  const selectedModule = course.modules?.find(m => m.id === selectedModuleId) || course.modules?.[0];

  const handleToggleTopic = (topicId) => {
    setCourse(prev => {
      const updatedModules = prev.modules.map(mod => {
        if (mod.id === selectedModuleId && mod.topics) {
          const updatedTopics = mod.topics.map(t => {
            if (t.id === topicId || t.num === topicId) {
              return { ...t, done: !t.done };
            }
            return t;
          });
          const doneCount = updatedTopics.filter(t => t.done).length;
          const status = `${Math.round((doneCount / updatedTopics.length) * 100)}%`;
          return { ...mod, topics: updatedTopics, status };
        }
        return mod;
      });

      // Calculate total course progress
      let totalTopics = 0;
      let completedTopics = 0;
      updatedModules.forEach(m => {
        if (m.topics) {
          totalTopics += m.topics.length;
          completedTopics += m.topics.filter(t => t.done).length;
        } else if (m.completed || m.status === 'DONE') {
          totalTopics += 4;
          completedTopics += 4;
        }
      });

      const newProgress = Math.round((completedTopics / Math.max(1, totalTopics)) * 100);

      return {
        ...prev,
        modules: updatedModules,
        progress: newProgress
      };
    });
  };

  const handleDownloadNotes = () => {
    setToastMessage(`📥 Downloading syllabus & slide notes for ${selectedModule.title}...`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#1e293b', color: 'white', padding: '0.85rem 1.25rem', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', zIndex: 1000, fontWeight: 600, fontSize: '0.875rem' }}>
          {toastMessage}
        </div>
      )}

      {/* Back Button & Course Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {onBack && (
            <button onClick={onBack} className="btn btn-light" style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}>
              <ArrowLeft size={14} /> Back to Courses
            </button>
          )}
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-orange)' }}>
            {course.code || "23CS002-Introduction to Web Technologies"}
          </div>
        </div>

        <button onClick={handleDownloadNotes} className="btn btn-outline btn-sm">
          <Download size={14} /> Download Module Notes
        </button>
      </div>

      {/* Navigation Subbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.925rem', fontWeight: 600 }}>
          <span 
            onClick={() => setSelectedTab('content')}
            style={{ 
              color: selectedTab === 'content' ? 'var(--text-dark)' : 'var(--text-muted)', 
              borderBottom: selectedTab === 'content' ? '3px solid var(--primary-orange)' : 'none', 
              paddingBottom: '0.5rem', 
              cursor: 'pointer' 
            }}
          >
            Learning Content
          </span>
          <span 
            onClick={() => { setSelectedTab('assignments'); if(onOpenAssignments) onOpenAssignments(); }}
            style={{ 
              color: selectedTab === 'assignments' ? 'var(--text-dark)' : 'var(--text-muted)', 
              borderBottom: selectedTab === 'assignments' ? '3px solid var(--primary-orange)' : 'none', 
              paddingBottom: '0.5rem', 
              cursor: 'pointer' 
            }}
          >
            Assignments
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="progress-bar-track" style={{ width: '100px', height: '6px' }}>
            <div className="progress-bar-fill" style={{ width: `${course.progress || 94}%` }}></div>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-orange)' }}>
            {course.progress || 94}% Completed
          </span>
        </div>
      </div>

      {/* Module Carousel Row */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', margin: '0.5rem 0 1rem 0' }}>
        <div 
          onClick={() => setSelectedModuleId(prev => Math.max(1, prev - 1))}
          style={{ color: 'var(--primary-orange)', cursor: 'pointer', paddingRight: '0.5rem' }}
        >
          <ChevronLeft size={24} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', flex: 1, paddingBottom: '0.5rem' }}>
          {(course.modules || []).map(mod => {
            const isSelected = mod.id === selectedModuleId;
            return (
              <div
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                style={{
                  minWidth: '180px',
                  width: '180px',
                  height: '115px',
                  backgroundColor: isSelected ? 'var(--primary-orange)' : 'white',
                  color: isSelected ? 'white' : 'var(--text-dark)',
                  border: isSelected ? '1px solid var(--primary-orange)' : '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 6px 16px rgba(242, 100, 34, 0.3)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : '#f1f5f9',
                    color: isSelected ? 'white' : '#64748b',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {mod.id}
                  </div>
                  <div style={{ fontSize: '0.725rem', fontWeight: 700, color: isSelected ? 'white' : 'var(--primary-orange)' }}>
                    {mod.status}
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.3 }}>
                  {mod.title}
                </div>

                <div style={{ fontSize: '0.7rem', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FileText size={11} /> {mod.docsCount || 4} Materials
                </div>
              </div>
            );
          })}
        </div>

        <div 
          onClick={() => setSelectedModuleId(prev => Math.min(course.modules.length, prev + 1))}
          style={{ color: 'var(--primary-orange)', cursor: 'pointer', paddingLeft: '0.5rem' }}
        >
          <ChevronRight size={24} />
        </div>
      </div>

      {/* Sub-Topics Interactive Checklist */}
      <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Sub-Topics Checklist for Module {selectedModule.id}: {selectedModule.title}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click topic to mark completed</span>
        </div>

        {(selectedModule.topics || [
          { id: 't1', num: 1, tag: "WEB", title: "CSS Display and Positioning: Position", done: false },
          { id: 't2', num: 2, tag: "WEB", title: "CSS Display and Positioning: Z-index", done: true },
          { id: 't3', num: 3, tag: "WEB", title: "CSS Display and Positioning: Display", done: true },
          { id: 't4', num: 4, tag: "WEB", title: "CSS Display and Positioning: Float and Clear", done: true }
        ]).map(topic => (
          <div
            key={topic.id || topic.num}
            onClick={() => handleToggleTopic(topic.id || topic.num)}
            style={{
              backgroundColor: topic.done ? '#f0fdf4' : 'white',
              border: topic.done ? '1px solid #bbf7d0' : '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: topic.done ? '#16a34a' : '#f1f5f9',
                color: topic.done ? 'white' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {topic.done ? <Check size={14} /> : topic.num}
              </div>

              <div>
                <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>{topic.tag}</div>
                <div style={{ fontWeight: 600, color: topic.done ? '#15803d' : 'var(--text-dark)', marginTop: '2px', textDecoration: topic.done ? 'line-through' : 'none' }}>
                  {topic.title}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: topic.done ? '#16a34a' : 'var(--text-muted)' }}>
              {topic.done ? '✓ Completed' : 'Mark Done'}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
