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
  ArrowLeft
} from 'lucide-react';

export default function CourseDetailView({ currentCourse, onBack, onOpenAssignments }) {
  const course = currentCourse || {
    id: "23CS002",
    code: "23CS002-Introduction to Web Technologies_04-09-2024",
    progress: 94,
    modules: [
      { id: 1, title: "Basic HTML Tags", status: "DONE", commentsCount: 1, docsCount: 14 },
      { id: 2, title: "HTML Tables", status: "DONE", commentsCount: 0, docsCount: 2 },
      { id: 3, title: "HTML Forms", status: "DONE", commentsCount: 0, docsCount: 11 },
      { id: 4, title: "Introduction to CSS", status: "DONE", commentsCount: 0, docsCount: 11 },
      { id: 5, title: "CSS Box Model", status: "DONE", commentsCount: 0, docsCount: 11 },
      { 
        id: 6, 
        title: "Layout using Basic CSS", 
        status: "75%", 
        commentsCount: 0, 
        docsCount: 4,
        topics: [
          { num: 1, tag: "WEB", title: "CSS Display and Positioning: Position", done: false },
          { num: 2, tag: "WEB", title: "CSS Display and Positioning: Z-index", done: true },
          { num: 3, tag: "WEB", title: "CSS Display and Positioning: Display", done: true },
          { num: 4, tag: "WEB", title: "CSS Display and Positioning: Float and Clear", done: true }
        ]
      }
    ]
  };

  const [selectedTab, setSelectedTab] = useState('content');
  const [selectedModuleId, setSelectedModuleId] = useState(6);

  const selectedModule = course.modules?.find(m => m.id === selectedModuleId) || course.modules?.[5] || {
    id: 6,
    title: "Layout using Basic CSS",
    topics: [
      { num: 1, tag: "WEB", title: "CSS Display and Positioning: Position", done: false },
      { num: 2, tag: "WEB", title: "CSS Display and Positioning: Z-index", done: true },
      { num: 3, tag: "WEB", title: "CSS Display and Positioning: Display", done: true },
      { num: 4, tag: "WEB", title: "CSS Display and Positioning: Float and Clear", done: true }
    ]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Back Button & Course Breadcrumb Code */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {onBack && (
          <button onClick={onBack} className="btn btn-light" style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}>
            <ArrowLeft size={14} /> Back to Courses
          </button>
        )}
        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-orange)' }}>
          {course.code || "23CS002-Introduction to Web Technologies_04-09-2024"}
        </div>
      </div>

      {/* Subheader Navigation Bar matching screenshot */}
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
          <span style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Attempts</span>
          <span style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Digital Library</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Download size={18} color="var(--text-muted)" style={{ cursor: 'pointer' }} title="Download PDF" />
          <button style={{ background: 'none', border: 'none', color: 'var(--primary-orange)', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
            Resume
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="progress-bar-track" style={{ width: '90px', height: '5px' }}>
              <div className="progress-bar-fill" style={{ width: `${course.progress || 94}%` }}></div>
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-orange)' }}>
              {course.progress || 94}% done
            </span>
          </div>
        </div>
      </div>

      {/* Module Carousel Row matching screenshot */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', margin: '0.5rem 0 1rem 0' }}>
        <div style={{ color: 'var(--primary-orange)', cursor: 'pointer', paddingRight: '0.5rem' }}>
          <ChevronLeft size={20} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', flex: 1, paddingBottom: '0.5rem' }}>
          {(course.modules || []).map(mod => {
            const isSelected = mod.id === selectedModuleId;
            return (
              <div
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                style={{
                  minWidth: '175px',
                  width: '175px',
                  height: '110px',
                  backgroundColor: isSelected ? 'var(--primary-orange)' : 'white',
                  color: isSelected ? 'white' : 'var(--text-dark)',
                  border: isSelected ? '1px solid var(--primary-orange)' : '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 4px 12px rgba(242, 100, 34, 0.25)' : 'none'
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
                  <FileText size={11} /> {mod.docsCount || 4}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ color: 'var(--primary-orange)', cursor: 'pointer', paddingLeft: '0.5rem' }}>
          <ChevronRight size={20} />
        </div>
      </div>

      {/* Sub-Topics List matching screenshot */}
      <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {(selectedModule.topics || [
          { num: 1, tag: "WEB", title: "CSS Display and Positioning: Position", done: false },
          { num: 2, tag: "WEB", title: "CSS Display and Positioning: Z-index", done: true },
          { num: 3, tag: "WEB", title: "CSS Display and Positioning: Display", done: true },
          { num: 4, tag: "WEB", title: "CSS Display and Positioning: Float and Clear", done: true }
        ]).map(topic => (
          <div
            key={topic.num}
            style={{
              backgroundColor: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '0.9rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.875rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>{topic.num}</span>
              <div>
                <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>{topic.tag}</div>
                <div style={{ fontWeight: 600, color: 'var(--text-dark)', marginTop: '2px' }}>{topic.title}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
              {topic.done && <Check size={16} color="var(--text-dark)" />}
              <ChevronUp size={16} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
