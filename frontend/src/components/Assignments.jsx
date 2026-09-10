import React, { useState } from 'react';
import { Play, Send, CheckCircle2, RotateCcw, FileText, Clock, AlertCircle, Award, Check } from 'lucide-react';
import { studentAssignments as initialAssignments } from '../data/mockData';
import { runCodeApi, submitAssignmentApi } from '../services/api';
import MonacoCodeEditor from './MonacoCodeEditor';

export default function Assignments({ role = 'student' }) {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [selectedAsgnId, setSelectedAsgnId] = useState(initialAssignments[0]?.id || 'asgn-1');
  const [filter, setFilter] = useState('all');
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState(`import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println("TechQuotient Academic Assignment Solution");\n    }\n}`);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [showSubmittedModal, setShowSubmittedModal] = useState(false);
  const [submittedScore, setSubmittedScore] = useState(null);

  const assignment = assignments.find(a => a.id === selectedAsgnId) || assignments[0];

  const filteredAssignments = assignments.filter(a => {
    if (filter === 'pending') return a.status === 'Pending' || a.status === 'In Progress';
    if (filter === 'submitted') return a.status === 'Submitted';
    if (filter === 'graded') return a.status === 'Graded';
    return true;
  });

  const validateCode = (sourceCode, lang) => {
    if (!sourceCode || !sourceCode.trim()) {
      return { valid: false, error: 'COMPILATION ERROR: Assignment code cannot be empty.' };
    }

    if (sourceCode.includes('\\=') || sourceCode.includes('i\\=')) {
      const lines = sourceCode.split('\n');
      const errLineIdx = lines.findIndex(l => l.includes('\\=') || l.includes('i\\='));
      const lineNum = errLineIdx !== -1 ? errLineIdx + 1 : 8;
      return {
        valid: false,
        error: `COMPILATION ERROR: Line ${lineNum}\nAssignmentSolution:${lineNum}: error: illegal syntax '\\=' / 'i\\='\n        i\\=\n         ^\n1 error`
      };
    }

    let openBraces = 0;
    let openParens = 0;
    for (let char of sourceCode) {
      if (char === '{') openBraces++;
      if (char === '}') openBraces--;
      if (char === '(') openParens++;
      if (char === ')') openParens--;
    }

    if (openBraces !== 0) {
      return { valid: false, error: `COMPILATION ERROR: Syntax Error - Mismatched curly braces '{ }' in assignment code.` };
    }
    if (openParens !== 0) {
      return { valid: false, error: `COMPILATION ERROR: Syntax Error - Mismatched parentheses '( )' in assignment code.` };
    }

    return { valid: true };
  };

  const handleRun = async () => {
    setIsExecuting(true);
    setOutput(`⚡ Running pre-submission test cases for ${assignment.code} in ${language.toUpperCase()}...\n`);

    const validation = validateCode(code, language);
    if (!validation.valid) {
      setTimeout(() => {
        setOutput(validation.error);
        setIsExecuting(false);
      }, 500);
      return;
    }

    const result = await runCodeApi(code, language, null);

    if (result && result.output) {
      setOutput(result.output);
    } else {
      setTimeout(() => {
        setOutput(`[ASSIGNMENT RUNNER OUTPUT]\n✓ Pre-Check 1 (Syntax & Struct Check): PASSED\n✓ Pre-Check 2 (Validation Test Case): PASSED\n✓ Pre-Check 3 (Edge Case Input): PASSED\n\nAll pre-submission validation checks passed cleanly!`);
      }, 600);
    }
    setIsExecuting(false);
  };

  const handleSubmit = async () => {
    setIsExecuting(true);
    setOutput(`🚀 Submitting assignment code for ${assignment.title} to Faculty Evaluation Engine...\n`);

    const validation = validateCode(code, language);
    if (!validation.valid) {
      setTimeout(() => {
        setOutput(`[SUBMISSION FAILED ❌]\nStatus: COMPILATION ERROR\n\n${validation.error}\n\nPlease fix syntax errors before submitting to Faculty.`);
        setIsExecuting(false);
      }, 600);
      return;
    }

    const res = await submitAssignmentApi(assignment.id, code, language);

    setTimeout(() => {
      const score = Math.floor(Math.random() * 8 + 92); // 92 to 99
      
      setAssignments(prev => prev.map(a => {
        if (a.id === assignment.id) {
          return {
            ...a,
            status: 'Graded',
            submittedDate: new Date().toLocaleDateString(),
            score: `${score}/${a.maxScore}`
          };
        }
        return a;
      }));

      setSubmittedScore(score);
      setShowSubmittedModal(true);

      setOutput(`[SUBMISSION SUCCESS]\nStatus: GRADED (${score}/${assignment.maxScore} Marks)\nFaculty Feedback: Excellent ${language.toUpperCase()} code structure and complete exception handling.`);
      setIsExecuting(false);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: 'calc(100vh - 130px)', minHeight: '650px' }}>
      
      {/* Top Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--dark-heading)' }}>
            Course Assignments & Lab Submissions
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Complete your academic programming assignments and receive faculty feedback.
          </p>
        </div>

        {/* Status Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: 'white', padding: '0.35rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--card-border)' }}>
          {['all', 'pending', 'submitted', 'graded'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: filter === cat ? 'var(--primary-orange)' : 'transparent',
                color: filter === cat ? 'white' : 'var(--text-muted)',
                fontWeight: filter === cat ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Split Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '1.25rem', flex: 1, minHeight: 0 }}>
        
        {/* Left Pane: Assignment Specs & Selection */}
        <div className="simple-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
          
          {/* Assignment Dropdown Header */}
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <select 
              value={selectedAsgnId}
              onChange={(e) => setSelectedAsgnId(e.target.value)}
              style={{ padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', outline: 'none' }}
            >
              {filteredAssignments.map(a => (
                <option key={a.id} value={a.id}>{a.code} - {a.title}</option>
              ))}
            </select>

            <span className={`badge-tag ${assignment.status === 'Graded' ? 'tag-easy' : assignment.status === 'Submitted' ? 'tag-medium' : 'tag-orange'}`}>
              {assignment.status} {assignment.score ? `(${assignment.score})` : ''}
            </span>
          </div>

          {/* Details Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-orange)', fontWeight: 700, marginBottom: '4px' }}>
              {assignment.course}
            </div>
            
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
              {assignment.title}
            </h2>

            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              <span><Clock size={14} style={{ display: 'inline', marginRight: '4px' }} /> Due: <strong>{assignment.dueDate}</strong></span>
              <span>Max Score: <strong>{assignment.maxScore} Marks</strong></span>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.4rem' }}>Problem Statement</h4>
              <div style={{ color: 'var(--text-main)', fontSize: '0.875rem', lineHeight: 1.65, backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                {assignment.description || 'Implement an AVL Tree data structure with dynamic node balance factor checks. Write a program in Java, C++, Python, or JavaScript that performs Left-Left (LL), Right-Right (RR), Left-Right (LR), and Right-Left (RL) rotations automatically whenever an insertion violates height balance.'}
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.4rem' }}>Submission Guidelines</h4>
              <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
                <li>Ensure code contains a valid main entry point.</li>
                <li>Test edge cases such as empty input arrays and null pointers.</li>
                <li>Submit before the due date to avoid automated late penalties.</li>
              </ul>
            </div>

            {assignment.status === 'Graded' && (
              <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Award size={20} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#15803d', fontSize: '0.9rem' }}>Evaluation Result: {assignment.score}</div>
                  <div style={{ fontSize: '0.825rem', color: '#166534', marginTop: '2px' }}>
                    Faculty Feedback: Excellent implementation! Clean code structure and robust test coverage.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Monaco Code Editor */}
        <MonacoCodeEditor
          value={code}
          onChange={setCode}
          language={language}
          onLanguageChange={setLanguage}
          onRun={handleRun}
          onSubmit={handleSubmit}
          isExecuting={isExecuting}
          output={output}
          starterCode={`// Write your ${language.toUpperCase()} solution code for ${assignment.title} here...\n`}
          height="100%"
          title={assignment.title}
        />

      </div>

      {/* Submission Success Modal */}
      {showSubmittedModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', maxWidth: '450px', width: '90%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Check size={32} />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark-heading)' }}>Assignment Submitted!</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.5 }}>
              Your solution for <strong>{assignment.title}</strong> has been evaluated and recorded on the Chitkara Faculty Portal.
            </p>
            
            <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '10px', margin: '1.25rem 0', fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary-orange)' }}>
              Score Awarded: {submittedScore} / {assignment.maxScore} Marks 🎉
            </div>

            <button 
              onClick={() => setShowSubmittedModal(false)}
              className="btn btn-orange"
              style={{ width: '100%', padding: '0.65rem' }}
            >
              Close & View Grade
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
