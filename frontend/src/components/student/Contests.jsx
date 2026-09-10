import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Clock, 
  Users, 
  Award, 
  Flame, 
  Play, 
  CheckCircle2, 
  Zap, 
  ArrowUpRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { contestsData, studentProfile } from '../../data/mockData';
import { registerContestApi } from '../../services/api';

export default function Contests({ setActiveTab, onSelectProblem }) {
  const liveContest = contestsData[0] || {
    id: "c-1",
    title: "TechQuotient Algo Clash #14",
    status: "Live",
    participants: 142,
    duration: "2 Hours",
    questionsCount: 4,
    leaderboard: [
      { rank: 1, name: "Aarav Sharma", score: 400, solved: 4, penalty: "42m" },
      { rank: 2, name: "Ishita Verma", score: 380, solved: 4, penalty: "45m" },
      { rank: 12, name: "Ansh Goyal (You)", score: 350, solved: 3, penalty: "48m" }
    ]
  };

  const upcomingContests = contestsData.filter(c => c.status === 'Upcoming');
  const pastContests = contestsData.filter(c => c.status === 'Completed');

  const [registeredMap, setRegisteredMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 22, seconds: 14 });

  // Ticking timer for Live Contest
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRegister = async (id) => {
    setRegisteredMap(prev => ({ ...prev, [id]: true }));
    await registerContestApi(id);
  };

  const filteredLeaderboard = (liveContest.leaderboard || []).filter(row =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-body animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark-heading)' }}>
            Competitive Coding Contests & Hackathons
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Compete in real-time speed coding challenges and rise up the Chitkara University Leaderboard.
          </p>
        </div>
      </div>

      {/* Live Contest Highlight Card */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        border: '1px solid var(--primary-orange)',
        boxShadow: '0 12px 30px rgba(242, 100, 34, 0.25)',
        padding: '2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-danger" style={{ animation: 'pulse 1.5s infinite' }}>🔴 LIVE CONTEST NOW</span>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                Ends in: {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>

            <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {liveContest.title}
            </h2>

            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: '#cbd5e1', marginTop: '0.75rem' }}>
              <span><Clock size={16} style={{ display: 'inline', marginRight: '4px' }} /> Duration: {liveContest.duration || '2 Hours'}</span>
              <span><Users size={16} style={{ display: 'inline', marginRight: '4px' }} /> Participants: {liveContest.participants || 142}</span>
              <span><Zap size={16} style={{ display: 'inline', marginRight: '4px' }} /> Problems: {liveContest.questionsCount || 4}</span>
            </div>
          </div>

          <button 
            onClick={() => setActiveTab && setActiveTab('coding-workspace')} 
            className="btn btn-primary" 
            style={{ padding: '0.8rem 1.75rem' }}
          >
            <Play size={18} /> Enter Contest Arena
          </button>
        </div>
      </div>

      {/* Live Leaderboard Section */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Live Leaderboard - Sprint #18</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Updated real-time every 30 seconds</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Search Competitor */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search competitor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '2.2rem', fontSize: '0.85rem', width: '200px' }}
              />
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>

            <span className="badge badge-orange">Your Rank: #{studentProfile.rank}</span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--card-border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Rank</th>
                <th style={{ padding: '0.75rem 1rem' }}>Student Competitor</th>
                <th style={{ padding: '0.75rem 1rem' }}>Score</th>
                <th style={{ padding: '0.75rem 1rem' }}>Solved</th>
                <th style={{ padding: '0.75rem 1rem' }}>Time Penalty</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboard.map((row) => (
                <tr 
                  key={row.rank} 
                  style={{ 
                    borderBottom: '1px solid var(--card-border)',
                    backgroundColor: row.name.includes('Ansh Goyal') ? 'var(--lighter-orange)' : 'transparent',
                    fontWeight: row.name.includes('Ansh Goyal') ? 700 : 400
                  }}
                >
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: row.rank === 1 ? '#fef3c7' : row.rank === 2 ? '#f1f5f9' : row.rank === 3 ? '#ffedd5' : '#f8fafc',
                      color: row.rank === 1 ? '#d97706' : row.rank === 2 ? '#475569' : row.rank === 3 ? '#c2410c' : 'var(--text-main)',
                      fontWeight: 800
                    }}>
                      {row.rank}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: row.name.includes('Ansh Goyal') ? 'var(--primary-orange)' : 'var(--dark-heading)' }}>
                    {row.name}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{row.score} pts</td>
                  <td style={{ padding: '0.85rem 1rem' }}>{row.solved} / 4</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{row.penalty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming & Past Contests Grid */}
      <div className="grid-2">
        
        {/* Upcoming Contests */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Upcoming Contests</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {upcomingContests.map(c => (
              <div key={c.id} style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--dark-heading)' }}>{c.title}</h4>
                  <span className="badge badge-info">{c.status}</span>
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Starts: <strong>{c.startTime || 'Tomorrow at 6:00 PM'}</strong> • Duration: {c.duration}
                </div>
                <button 
                  onClick={() => handleRegister(c.id)}
                  disabled={registeredMap[c.id]}
                  className="btn btn-outline btn-sm" 
                  style={{ width: '100%' }}
                >
                  {registeredMap[c.id] ? '✓ Registered' : 'Register for Contest'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Past Contests */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Past Contest Performance</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pastContests.map(c => (
              <div key={c.id} style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--dark-heading)' }}>{c.title}</h4>
                  <span className="badge badge-success">Rank #{c.userRank || 8}</span>
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Total Score: <strong>{c.score || 480} Pts</strong> • {c.participants} Participants
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
