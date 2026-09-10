import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowRight, 
  GraduationCap, 
  BookOpen, 
  Code2, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Trophy,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, role, switchRole } = useAuth();

  const handlePortalJump = (targetRole) => {
    switchRole(targetRole);
    navigate(targetRole === 'faculty' ? '/faculty/dashboard' : '/student/dashboard');
  };

  return (
    <div className="landing-page-root" style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#191919', fontFamily: '"Inter", sans-serif' }}>
      
      {/* Top Banner Notice */}
      <div style={{ backgroundColor: '#fff7ed', borderBottom: '1px solid #fed7aa', padding: '0.6rem 1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#9a3412', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        <Sparkles size={16} color="#f26422" />
        <span>Welcome to TechQuotient — AI-Powered Computer Science Academic Hub</span>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <span style={{ color: '#7c2d12', fontWeight: 500 }}>Chitkara University Academic Evaluation Edition</span>
      </div>

      {/* NAVBAR */}
      <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 3rem', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{ backgroundColor: '#f26422', color: '#ffffff', width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem' }}>
            TQ
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.5px' }}>
            Tech<span style={{ color: '#f26422' }}>Quotient</span>
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="#mission" style={{ textDecoration: 'none', color: '#475569', fontWeight: 600, fontSize: '0.95rem' }}>Our Mission</a>
          <a href="#domains" style={{ textDecoration: 'none', color: '#475569', fontWeight: 600, fontSize: '0.95rem' }}>Curriculum</a>
          <a href="#companies" style={{ textDecoration: 'none', color: '#475569', fontWeight: 600, fontSize: '0.95rem' }}>Partners</a>
          <a href="#news" style={{ textDecoration: 'none', color: '#475569', fontWeight: 600, fontSize: '0.95rem' }}>Updates</a>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '1rem' }}>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate(role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard')}
                  style={{
                    backgroundColor: '#f26422',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '50px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 12px rgba(242, 100, 34, 0.25)'
                  }}
                >
                  Enter Portal ({role === 'faculty' ? 'Faculty' : 'Student'}) <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    textDecoration: 'none',
                    color: '#f26422',
                    border: '1.5px solid #f26422',
                    padding: '0.55rem 1.25rem',
                    borderRadius: '50px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  style={{
                    textDecoration: 'none',
                    backgroundColor: '#f26422',
                    color: '#ffffff',
                    padding: '0.6rem 1.4rem',
                    borderRadius: '50px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 12px rgba(242, 100, 34, 0.25)'
                  }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: '4.5rem 3rem', maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#fff7ed', border: '1px solid #fed7aa', padding: '0.4rem 0.9rem', borderRadius: '50px', marginBottom: '1.5rem', color: '#c2410c', fontSize: '0.85rem', fontWeight: 700 }}>
            <Sparkles size={16} /> Next-Gen Programming & Assessment Platform
          </div>

          <h1 style={{ fontSize: '3.75rem', fontWeight: 900, lineHeight: 1.1, color: '#0f172a', marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>
            Building <span style={{ color: '#f26422' }}>AI Talent</span><br />for the World
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '540px' }}>
            Empowering students and faculty with unified course management, real-time code compilation, algorithmic challenges, and personalized AI programming mentorship.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handlePortalJump('student')}
              style={{
                backgroundColor: '#f26422',
                color: '#ffffff',
                border: 'none',
                padding: '0.9rem 1.8rem',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 20px rgba(242, 100, 34, 0.3)',
                transition: 'transform 0.2s'
              }}
            >
              <GraduationCap size={20} /> Open Student Portal
            </button>

            <button
              onClick={() => handlePortalJump('faculty')}
              style={{
                backgroundColor: '#1e293b',
                color: '#ffffff',
                border: 'none',
                padding: '0.9rem 1.8rem',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform 0.2s'
              }}
            >
              <Users size={20} /> Open Faculty Portal
            </button>
          </div>

          {/* Quick Stats Banner */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f26422' }}>600+</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Partner Institutes</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>100%</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Judge0 Code Execution</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f26422' }}>Gemini AI</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Teaching Assistant</div>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div style={{ position: 'relative' }}>
          <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <img 
              src="https://codequotient.com/images/landing/2024/first-section-right.webp" 
              alt="TechQuotient Learning Experience" 
              style={{ width: '100%', height: 'auto', display: 'block' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            {/* Fallback preview container if remote image fails */}
            <div style={{ padding: '2rem', background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Interactive Code Workspace
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Monaco Editor supporting Java, C++, Python, and JavaScript with instant testcase verdicts.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ padding: '0.35rem 0.8rem', background: '#e2e8f0', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>Java 17</span>
                <span style={{ padding: '0.35rem 0.8rem', background: '#e2e8f0', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>C++ (GCC)</span>
                <span style={{ padding: '0.35rem 0.8rem', background: '#e2e8f0', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>Python 3.10</span>
                <span style={{ padding: '0.35rem 0.8rem', background: '#ffedd5', color: '#c2410c', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>TechBot AI Mentorship</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & STATS SECTION */}
      <section id="mission" style={{ backgroundColor: '#f8fafc', padding: '5rem 3rem', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4rem auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
              We are on a mission to tap into India's talent potential and build world-class engineers.
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
              Transforming conventional classroom learning into outcome-based software craftsmanship.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f26422', marginBottom: '0.5rem' }}>$400B+</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>IT Services Export</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Projected Indian IT services export industry by 2030.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>$225B+</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Projected AI Market</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Global AI market scale ready for skilled engineers by 2030.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f26422', marginBottom: '0.5rem' }}>2.3M+</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>AI Job Openings</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Expected specialized high-growth tech positions by 2027.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>600+</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Partner Institutes</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Across Tier 1, 2, and 3 engineering colleges empowering students.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM & DOMAINS */}
      <section id="domains" style={{ padding: '5rem 3rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Comprehensive Academic Modules
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            Structured computer science courses aligned with Chitkara University and modern industry benchmarks.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', background: '#ffffff', transition: 'box-shadow 0.2s' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#f26422' }}>
              <Code2 size={26} />
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f26422', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CSE201</div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
              Data Structures & Algorithms
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Master arrays, linked lists, stacks, AVL trees, graphs, dynamic programming, and complexity analysis.
            </p>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>13 Sections • 120 Students Enrolled</div>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', background: '#ffffff' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#2563eb' }}>
              <BookOpen size={26} />
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CSE302</div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
              Full Stack Web Development
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Build scalable applications using Node.js, Express, React, Vite, Tailwind CSS, and MongoDB databases.
            </p>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>8 Sections • 95 Students Enrolled</div>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', background: '#ffffff' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#16a34a' }}>
              <GraduationCap size={26} />
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CSE204</div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
              OOP in Java
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Deep dive into Object-Oriented Programming, polymorphism, interfaces, exception handling, and Java Collections.
            </p>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>11 Sections • 110 Students Enrolled</div>
          </div>
        </div>
      </section>

      {/* HIRING PARTNERS GRID */}
      <section id="companies" style={{ padding: '4.5rem 3rem', backgroundColor: '#fafafa', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Where Our SuperCoders Excel
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '3rem' }}>
            Graduates build software across leading technology organizations and innovative scale-ups worldwide.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem' }}>
            {['Google', 'Amazon', 'DigitalOcean', 'Adobe', 'Palo Alto Networks', 'Samsung', 'Gojek', 'McAfee', 'Grab', 'Flipkart', 'Swiggy', 'AWS', 'Zomato', 'OYO', 'Expedia', 'Paytm', 'FarMart', 'MakeMyTrip', 'Tata 1mg', 'Scotiabank'].map((company, index) => (
              <div 
                key={index}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.25rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: '#334155',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS & UPDATES */}
      <section id="news" style={{ padding: '5rem 3rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            News & Updates
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>
            Latest milestones, competitions, and curriculum updates from TechQuotient.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#ffffff' }}>
            <div style={{ height: '160px', background: 'linear-gradient(135deg, #fed7aa 0%, #f26422 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 800, fontSize: '1.5rem' }}>
              NEWS
            </div>
            <div style={{ padding: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f26422', textTransform: 'uppercase' }}>Academic Excellence</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
                Building the Next Generation of AI Talent
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5 }}>
                Empowering tier-2/3 collegiate students with real-world programming problem sets and Judge0 auto-evaluations.
              </p>
            </div>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#ffffff' }}>
            <div style={{ height: '160px', background: 'linear-gradient(135deg, #bae6fd 0%, #0284c7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 800, fontSize: '1.5rem' }}>
              CONTEST
            </div>
            <div style={{ padding: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase' }}>Speed Sprint</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
                TechQuotient Algo Clash #14 Now Live
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5 }}>
                142+ students actively competing in real-time speed coding challenges with instant automated leaderboard updates.
              </p>
            </div>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#ffffff' }}>
            <div style={{ height: '160px', background: 'linear-gradient(135deg, #bbf7d0 0%, #16a34a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 800, fontSize: '1.5rem' }}>
              AI INNOVATION
            </div>
            <div style={{ padding: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase' }}>Assistant Suite</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
                Gemini AI Integration for Teaching Faculty
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5 }}>
                Automating problem generation, test-case synthesis, and at-risk student diagnostic reports for course professors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '4rem 3rem 2rem 3rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '3rem', paddingBottom: '3rem', borderBottom: '1px solid #1e293b' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ backgroundColor: '#f26422', color: '#ffffff', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                TQ
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                Tech<span style={{ color: '#f26422' }}>Quotient</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '340px' }}>
              Unified academic programming education platform supporting Student and Faculty portals, automated code execution, and AI teaching assistance.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Student Hub</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => handlePortalJump('student')}>Dashboard</span>
              <span style={{ cursor: 'pointer' }} onClick={() => handlePortalJump('student')}>Coding Workspace</span>
              <span style={{ cursor: 'pointer' }} onClick={() => handlePortalJump('student')}>Assignments</span>
              <span style={{ cursor: 'pointer' }} onClick={() => handlePortalJump('student')}>Contests Arena</span>
              <span style={{ cursor: 'pointer' }} onClick={() => handlePortalJump('student')}>TechBot AI Mentor</span>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Faculty Hub</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => handlePortalJump('faculty')}>Faculty Dashboard</span>
              <span style={{ cursor: 'pointer' }} onClick={() => handlePortalJump('faculty')}>Course Management</span>
              <span style={{ cursor: 'pointer' }} onClick={() => handlePortalJump('faculty')}>Problem Bank</span>
              <span style={{ cursor: 'pointer' }} onClick={() => handlePortalJump('faculty')}>Assignment Scheduler</span>
              <span style={{ cursor: 'pointer' }} onClick={() => handlePortalJump('faculty')}>Analytics & PDF Reports</span>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Chitkara University</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              Department of Computer Science & Engineering<br />
              Chandigarh-Patiala National Highway (NH-64)<br />
              Punjab, India
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '2rem auto 0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
          <div>© {new Date().getFullYear()} TechQuotient (CodeQuotient). All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Academic Guidelines</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
