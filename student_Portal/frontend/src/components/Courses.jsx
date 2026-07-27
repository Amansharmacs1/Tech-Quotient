import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  PlayCircle, 
  FileText, 
  Clock, 
  User, 
  Download,
  ChevronRight
} from 'lucide-react';
import { coursesData } from '../data/mockData';

export default function Courses() {
  return (
    <div className="page-body animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark-heading)' }}>
          Enrolled Academic Courses & Study Resources
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Access your syllabus, lecture video recordings, slide decks, and lab code exercises.
        </p>
      </div>

      <div className="grid-2">
        {coursesData.map(course => (
          <div key={course.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-orange">{course.code}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-orange)' }}>{course.progress}% Completed</span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--dark-heading)' }}>
                {course.title}
              </h3>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
                <User size={15} /> Instructor: <strong>{course.instructor}</strong>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <div style={{ width: `${course.progress}%`, height: '100%', background: 'var(--gradient-primary)' }}></div>
              </div>

              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>Course Modules</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {course.modules.map((m, idx) => (
                  <div key={idx} style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: m.current ? 'var(--lighter-orange)' : '#f8fafc',
                    border: m.current ? '1px solid var(--light-orange)' : '1px solid var(--card-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {m.completed ? (
                        <CheckCircle2 size={16} color="var(--success)" />
                      ) : m.current ? (
                        <PlayCircle size={16} color="var(--primary-orange)" />
                      ) : (
                        <Clock size={16} color="var(--text-muted)" />
                      )}
                      <span style={{ fontWeight: m.current ? 700 : 400, color: m.current ? 'var(--primary-orange)' : 'var(--text-main)' }}>
                        {m.name}
                      </span>
                    </div>
                    {m.current && <span className="badge badge-orange" style={{ fontSize: '0.7rem' }}>IN PROGRESS</span>}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--card-border)', marginTop: '1.5rem', paddingTop: '1rem', display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                Open Course Player
              </button>
              <button className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Download size={14} /> Notes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
