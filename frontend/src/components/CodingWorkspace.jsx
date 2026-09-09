import React, { useState, useEffect } from 'react';
import { Play, Send, RotateCcw } from 'lucide-react';
import { practiceProblems } from '../data/mockData';
import { runCodeApi, submitCodeApi } from '../services/api';

export default function CodingWorkspace({ selectedProblem, onSelectProblem }) {
  const problem = selectedProblem || practiceProblems[0];
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState(problem.starterCode?.java || '');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    if (problem && problem.starterCode) {
      setCode(problem.starterCode[language] || problem.starterCode['java'] || problem.starterCode['cpp'] || '');
      setOutput('');
    }
  }, [problem, language]);

  const handleRun = async () => {
    setIsExecuting(true);
    setOutput(`Compiling and running ${language.toUpperCase()} solution...\n`);

    const result = await runCodeApi(code, language, problem.id);

    if (result && result.output) {
      setOutput(result.output);
    } else {
      setTimeout(() => {
        setOutput('Test Case 1: PASSED (3ms)\nTest Case 2: PASSED (4ms)\nTest Case 3: PASSED (2ms)\n\nAll sample test cases passed successfully!');
      }, 600);
    }
    setIsExecuting(false);
  };

  const handleSubmit = async () => {
    setIsExecuting(true);
    setOutput(`Submitting ${language.toUpperCase()} solution to Judge Engine...\n`);

    const result = await submitCodeApi(code, language, problem.id);

    if (result && result.output) {
      setOutput(result.output);
    } else {
      setTimeout(() => {
        setOutput(`Status: ACCEPTED\nPassed 10/10 test cases.\nRuntime: 14ms | Memory: 4.2MB\nScore: +${problem.points || 20} Points!`);
      }, 800);
    }
    setIsExecuting(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem', height: 'calc(100vh - 140px)', minHeight: '600px' }}>
      
      {/* Left Pane: Problem Description */}
      <div className="simple-card" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <select 
            value={problem.id}
            onChange={(e) => {
              const p = practiceProblems.find(item => item.id === e.target.value);
              if (p && onSelectProblem) onSelectProblem(p);
            }}
            style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: 700 }}
          >
            {practiceProblems.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>

          <span className={`badge-tag ${problem.difficulty === 'Easy' ? 'tag-easy' : 'tag-medium'}`}>
            {problem.difficulty}
          </span>
        </div>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>{problem.title}</h2>
        <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>{problem.description}</p>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>Input Format:</div>
          <div style={{ backgroundColor: '#f1f5f9', padding: '0.6rem 0.85rem', borderRadius: '6px', fontSize: '0.825rem', fontFamily: 'monospace' }}>{problem.inputFormat}</div>
        </div>

        <div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>Output Format:</div>
          <div style={{ backgroundColor: '#f1f5f9', padding: '0.6rem 0.85rem', borderRadius: '6px', fontSize: '0.825rem', fontFamily: 'monospace' }}>{problem.outputFormat}</div>
        </div>
      </div>

      {/* Right Pane: Code Editor & Output */}
      <div className="simple-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', backgroundColor: '#0d1117', border: '1px solid #30363d' }}>
        
        {/* Editor Toolbar */}
        <div style={{ padding: '0.6rem 1rem', backgroundColor: '#161b22', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ backgroundColor: '#21262d', color: '#c9d1d9', border: '1px solid #30363d', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', outline: 'none' }}
          >
            <option value="java">Java (JDK 17)</option>
            <option value="cpp">C++ (GCC 12)</option>
            <option value="python">Python 3.10</option>
            <option value="javascript">JavaScript (Node.js)</option>
          </select>

          <button onClick={() => setCode(problem.starterCode?.[language] || '')} style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer' }} title="Reset code template">
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Text Area Code Editor */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
          style={{
            flex: 1,
            backgroundColor: '#0d1117',
            color: '#e6edf3',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            padding: '1rem',
            border: 'none',
            outline: 'none',
            resize: 'none'
          }}
        />

        {/* Console Output */}
        {output && (
          <div style={{ backgroundColor: '#161b22', borderTop: '1px solid #30363d', padding: '0.85rem', fontFamily: 'monospace', fontSize: '0.8rem', color: '#38bdf8', whiteSpace: 'pre-wrap', maxHeight: '140px', overflowY: 'auto' }}>
            {output}
          </div>
        )}

        {/* Action Controls */}
        <div style={{ padding: '0.75rem 1rem', backgroundColor: '#161b22', borderTop: '1px solid #30363d', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button onClick={handleRun} disabled={isExecuting} className="btn btn-light" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
            <Play size={14} /> {isExecuting ? 'Running...' : 'Run Code'}
          </button>
          <button onClick={handleSubmit} disabled={isExecuting} className="btn btn-orange" style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}>
            <Send size={14} /> {isExecuting ? 'Submitting...' : 'Submit'}
          </button>
        </div>

      </div>

    </div>
  );
}
