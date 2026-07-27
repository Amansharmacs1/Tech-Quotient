import React from 'react';
import { 
  BookOpen, 
  Code2, 
  FileText, 
  Flame, 
  ArrowRight
} from 'lucide-react';
import { studentInfo, enrolledCourses, practiceProblems, studentAssignments } from '../data/mockData';

export default function Dashboard({ setActiveTab, onSelectCourse, onSelectProblem }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Banner */}
      <div className="simple-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fdf2ed 100%)', border: '1px solid #fed7aa' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge-tag tag-orange" style={{ marginBottom: '0.5rem' }}>
              Batch 2024 • CSE Dept
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              Welcome, <span style={{ color: 'var(--primary-orange)' }}>{studentInfo.name}</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Student ID: {studentInfo.rollNo} • {studentInfo.institution}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', backgroundColor: 'white', padding: '0.85rem 1.5rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-orange)' }}>{studentInfo.problemsSolved}</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>SOLVED</div>
            </div>
            <div style={{ textAlign: 'center', borderLeft: '1px solid #e2e8f0', paddingLeft: '1.5rem' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>{studentInfo.accuracy}</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACCURACY</div>
            </div>
            <div style={{ textAlign: 'center', borderLeft: '1px solid #e2e8f0', paddingLeft: '1.5rem' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f97316' }}>{studentInfo.streak}d</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>STREAK</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className="simple-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-dark)' }}>Enrolled Courses</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Click course card to open content</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {enrolledCourses.map(course => (
            <div 
              key={course.id} 
              onClick={() => onSelectCourse(course)}
              style={{ border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem', backgroundColor: '#fafafa', cursor: 'pointer', transition: 'all 0.15s ease' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge-tag tag-orange">{course.code}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-orange)' }}>{course.progress}% done</span>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.4rem' }}>{course.title}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Instructor: {course.instructor}</div>

              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Practice & Active Assignments Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Practice Problems */}
        <div className="simple-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Practice Problems</h2>
            <button onClick={() => setActiveTab('coding-workspace')} className="btn btn-light" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {practiceProblems.map(prob => (
              <div key={prob.id} style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)' }}>{prob.title}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '4px' }}>
                    <span className={`badge-tag ${prob.difficulty === 'Easy' ? 'tag-easy' : 'tag-medium'}`}>{prob.difficulty}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{prob.category}</span>
                  </div>
                </div>
                <button onClick={() => { onSelectProblem(prob); setActiveTab('coding-workspace'); }} className="btn btn-orange" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                  Solve
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="simple-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Active Assignments</h2>
            <button onClick={() => setActiveTab('assignments')} className="btn btn-light" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
              Open Assignment Workspace <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {studentAssignments.map(asgn => (
              <div key={asgn.id} style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)' }}>{asgn.title}</div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {asgn.code} • Due: {asgn.dueDate}
                  </div>
                </div>
                <button onClick={() => setActiveTab('assignments')} className="btn btn-orange" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
                  Code Solution
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
