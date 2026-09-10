import React from 'react';
import { 
  Users, 
  ClipboardList, 
  Code2, 
  BarChart3, 
  BookOpen, 
  Flame, 
  Bot, 
  ArrowRight,
  Plus,
  Play
} from 'lucide-react';
import { 
  facultyInfo, 
  studentInfo, 
  topicPerformanceData, 
  accuracyTrendData, 
  aiInsightData, 
  recentActivitiesData,
  enrolledCourses,
  practiceProblems,
  studentAssignments
} from '../../data/mockData';

export default function Dashboard({ role = 'student', setActiveTab, onSelectCourse, onSelectProblem }) {
  const isFaculty = role === 'faculty';

  // Topic bar chart data based on role
  const topicData = isFaculty ? topicPerformanceData.faculty : topicPerformanceData.student;
  const maxBarValue = Math.max(...topicData.map(t => t.count), 100);

  // Line chart data based on role
  const trendData = isFaculty ? accuracyTrendData.faculty : accuracyTrendData.student;
  
  // AI insight based on role
  const aiInsight = isFaculty ? aiInsightData.faculty : aiInsightData.student;

  // Recent activities based on role
  const activities = isFaculty ? recentActivitiesData.faculty : recentActivitiesData.student;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. Welcome Banner Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            Welcome back, {isFaculty ? 'Professor' : studentInfo.name.split(' ')[0]} 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            {isFaculty 
              ? 'Manage your courses, coding problems and student performance.' 
              : 'Track your learning progress, solve coding challenges, and submit assignments.'}
          </p>
        </div>

        <div>
          {isFaculty ? (
            <button 
              onClick={() => setActiveTab('assignments')} 
              className="btn btn-orange"
              style={{ fontSize: '0.9rem', padding: '0.65rem 1.25rem', borderRadius: '10px' }}
            >
              <Plus size={18} /> Create Assignment
            </button>
          ) : (
            <button 
              onClick={() => setActiveTab('coding-workspace')} 
              className="btn btn-orange"
              style={{ fontSize: '0.9rem', padding: '0.65rem 1.25rem', borderRadius: '10px' }}
            >
              <Play size={16} fill="white" /> Start Practice
            </button>
          )}
        </div>
      </div>

      {/* 2. Stat Cards Grid (4 Columns matching screenshot) */}
      <div className="stat-card-grid">
        {isFaculty ? (
          <>
            {/* Faculty Card 1 */}
            <div className="stat-card">
              <div>
                <div className="stat-label">Total Students</div>
                <div className="stat-value">{facultyInfo.totalStudents}</div>
                <div className="stat-subtext positive">+12% this month</div>
              </div>
              <div className="stat-icon-bubble">
                <Users size={20} />
              </div>
            </div>

            {/* Faculty Card 2 */}
            <div className="stat-card">
              <div>
                <div className="stat-label">Assignments</div>
                <div className="stat-value">{facultyInfo.activeAssignments}</div>
                <div className="stat-subtext neutral">Active assignments</div>
              </div>
              <div className="stat-icon-bubble">
                <ClipboardList size={20} />
              </div>
            </div>

            {/* Faculty Card 3 */}
            <div className="stat-card">
              <div>
                <div className="stat-label">Coding Problems</div>
                <div className="stat-value">{facultyInfo.problemsCreated}</div>
                <div className="stat-subtext neutral">Problems created</div>
              </div>
              <div className="stat-icon-bubble">
                <Code2 size={20} />
              </div>
            </div>

            {/* Faculty Card 4 */}
            <div className="stat-card">
              <div>
                <div className="stat-label">Average Score</div>
                <div className="stat-value">{facultyInfo.averageScore}</div>
                <div className="stat-subtext neutral">Overall performance</div>
              </div>
              <div className="stat-icon-bubble">
                <BarChart3 size={20} />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Student Card 1 */}
            <div className="stat-card">
              <div>
                <div className="stat-label">Problems Solved</div>
                <div className="stat-value">{studentInfo.problemsSolved}</div>
                <div className="stat-subtext positive">+12 solved this week</div>
              </div>
              <div className="stat-icon-bubble">
                <Code2 size={20} />
              </div>
            </div>

            {/* Student Card 2 */}
            <div className="stat-card">
              <div>
                <div className="stat-label">Active Assignments</div>
                <div className="stat-value">{studentInfo.activeAssignmentsCount}</div>
                <div className="stat-subtext positive" style={{ color: '#d97706' }}>1 due tomorrow!</div>
              </div>
              <div className="stat-icon-bubble">
                <ClipboardList size={20} />
              </div>
            </div>

            {/* Student Card 3 */}
            <div className="stat-card">
              <div>
                <div className="stat-label">Enrolled Courses</div>
                <div className="stat-value">{studentInfo.enrolledCoursesCount}</div>
                <div className="stat-subtext neutral">Active semesters</div>
              </div>
              <div className="stat-icon-bubble">
                <BookOpen size={20} />
              </div>
            </div>

            {/* Student Card 4 */}
            <div className="stat-card">
              <div>
                <div className="stat-label">Overall Accuracy</div>
                <div className="stat-value">{studentInfo.accuracy}</div>
                <div className="stat-subtext positive">Global Rank #{studentInfo.globalRank} 🔥</div>
              </div>
              <div className="stat-icon-bubble">
                <Flame size={20} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* 3. Dashboard Middle Row Grid (Problems Solved Bar Chart, Submission Accuracy Line Chart, AI Insight & Activity) */}
      <div className="dashboard-middle-grid">
        
        {/* Box 1: Problems Solved Bar Chart */}
        <div className="simple-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)' }}>Problems Solved</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{isFaculty ? 'Class Total' : 'My Count'}</span>
          </div>

          <div style={{ position: 'relative', padding: '0.5rem 0' }}>
            {/* Horizontal Gridlines */}
            <div style={{ position: 'absolute', top: '10%', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }} />
            <div style={{ position: 'absolute', top: '40%', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }} />
            <div style={{ position: 'absolute', top: '70%', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }} />

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', padding: '0 0.5rem', borderBottom: '1px solid #e2e8f0', position: 'relative', zIndex: 1 }}>
              {topicData.map((item, idx) => {
                const heightPercent = Math.min(100, Math.max(15, (item.count / maxBarValue) * 100));
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '36px' }}>
                    <div 
                      title={`${item.topic}: ${item.label}`}
                      style={{ 
                        width: '100%', 
                        height: `${heightPercent}%`, 
                        backgroundColor: 'var(--primary-orange)', 
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.4s ease'
                      }} 
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.5rem' }}>
                      {item.topic}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Box 2: Submission Accuracy Line Chart */}
        <div className="simple-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)' }}>Submission Accuracy</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Weekly Trend</span>
          </div>

          <div style={{ position: 'relative', height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* SVG Line Curve */}
            <svg width="100%" height="150" viewBox="0 0 300 150" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f26422" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f26422" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1="100" x2="300" y2="100" stroke="#f1f5f9" strokeDasharray="3 3" />

              {/* Area Under Curve */}
              <polygon 
                points="10,120 10,90 100,70 190,45 280,25 280,120" 
                fill="url(#lineGrad)" 
              />

              {/* Curve Path */}
              <path 
                d="M 10 90 Q 55 80, 100 70 T 190 45 T 280 25" 
                fill="none" 
                stroke="#f26422" 
                strokeWidth="3.5" 
                strokeLinecap="round"
              />

              {/* Data Points */}
              <circle cx="10" cy="90" r="5" fill="white" stroke="#f26422" strokeWidth="3" />
              <circle cx="100" cy="70" r="5" fill="white" stroke="#f26422" strokeWidth="3" />
              <circle cx="190" cy="45" r="5" fill="white" stroke="#f26422" strokeWidth="3" />
              <circle cx="280" cy="25" r="6" fill="#f26422" stroke="white" strokeWidth="2" />
            </svg>

            {/* X-Axis Labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '0.4rem' }}>
              {trendData.map((d, i) => (
                <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {d.week}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Box 3 & 4 Stacked: AI Insight Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* AI Insight Card */}
          <div className="ai-insight-card">
            <div>
              <div className="ai-insight-header">
                <div className="ai-insight-icon-box">
                  <Bot size={18} />
                </div>
                <span className="ai-insight-title">AI Insight</span>
              </div>

              <div className="ai-insight-highlight">
                {aiInsight.highlight}
              </div>

              <div className="ai-recommendation-box">
                <div className="ai-recommendation-label">RECOMMENDATION</div>
                <div className="ai-recommendation-text">{aiInsight.recommendation}</div>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab(aiInsight.actionTarget)} 
              className="ai-action-link"
            >
              {aiInsight.actionText}
            </button>
          </div>

        </div>

      </div>

      {/* 4. Bottom Section Grid: Enrolled Courses / Recommended Practice & Recent Activities */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        
        {/* Left Side: Courses or Practice Problems */}
        <div className="simple-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              {isFaculty ? 'Managed Academic Courses' : 'Enrolled Courses & Progress'}
            </h2>
            <button onClick={() => setActiveTab('courses')} className="btn btn-light" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
              View All Courses <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {enrolledCourses.map(course => (
              <div 
                key={course.id} 
                onClick={() => onSelectCourse(course)}
                style={{ 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '10px', 
                  padding: '1.1rem', 
                  backgroundColor: '#fafafa', 
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge-tag tag-orange">{course.code}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-orange)' }}>{course.progress}% done</span>
                </div>

                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.3rem' }}>{course.title}</h3>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                  {isFaculty ? `Students Enrolled: ${course.studentsCount}` : `Instructor: ${course.instructor}`}
                </div>

                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Recent Activities List */}
        <div className="simple-card">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '1rem' }}>
            Recent Activities
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {activities.map(act => (
              <div key={act.id} style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                  {act.text}
                </span>
                <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
