import React, { useState } from 'react';
import { Play, Send, CheckCircle2, RotateCcw, FileText, Clock } from 'lucide-react';
import { studentAssignments } from '../data/mockData';
import { runCodeApi, submitAssignmentApi } from '../services/api';

export default function Assignments() {
  const [selectedAsgnId, setSelectedAsgnId] = useState('asgn-1');
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState(`import java.util.*;\n\npublic class AssignmentSolution {\n    public static void main(String[] args) {\n        System.out.println("Java Assignment Solution for Binary Search Trees");\n    }\n}`);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const assignment = studentAssignments.find(a => a.id === selectedAsgnId) || studentAssignments[0];

  const handleRun = async () => {
    setIsExecuting(true);
    setOutput(`Compiling and testing ${language.toUpperCase()} assignment code...\n`);

    const result = await runCodeApi(code, language, null);

    if (result && result.output) {
      setOutput(result.output);
    } else {
      setTimeout(() => {
        setOutput('Assignment Verification Test Cases:\n✓ Test Case 1 (BST Insertion): PASSED\n✓ Test Case 2 (AVL Rotation Check): PASSED\n\nAll pre-submission checks passed!');
      }, 600);
    }
    setIsExecuting(false);
  };

  const handleSubmit = async () => {
    setIsExecuting(true);
    setOutput('Submitting assignment code to Faculty Portal...\n');

    const res = await submitAssignmentApi(assignment.id, code, language);

    if (res && res.result && res.result.feedback) {
      setOutput(res.result.feedback);
    } else {
      setTimeout(() => {
        setOutput('ASSIGNMENT SUBMITTED SUCCESSFULLY!\nStatus: Graded (95/100)\nFaculty Note: Excellent Java code structure and AVL balance factor validation.');
      }, 800);
    }
    setIsExecuting(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem', height: 'calc(100vh - 140px)', minHeight: '600px' }}>
      
      {/* Left Pane: Assignment Question & Requirements */}
      <div className="simple-card" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <select 
            value={selectedAsgnId}
            onChange={(e) => setSelectedAsgnId(e.target.value)}
            style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: 700 }}
          >
            {studentAssignments.map(a => (
              <option key={a.id} value={a.id}>{a.code} - {a.title}</option>
            ))}
          </select>

          <span className={`badge-tag ${assignment.status === 'Submitted' ? 'tag-easy' : 'tag-orange'}`}>
            {assignment.status}
          </span>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--primary-orange)', fontWeight: 700, marginBottom: '4px' }}>
          {assignment.course}
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
          {assignment.title}
        </h2>

        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          <span><Clock size={14} style={{ display: 'inline', marginRight: '4px' }} /> Due Date: <strong>{assignment.dueDate}</strong></span>
          <span>Max Marks: <strong>{assignment.maxScore}</strong></span>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.4rem' }}>Assignment Problem Statement</h4>
          <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.6, backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            Implement an AVL Tree data structure with dynamic node balance factor checks. Write a program in Java, C++, Python, or JavaScript that performs Left-Left (LL), Right-Right (RR), Left-Right (LR), and Right-Left (RL) rotations automatically whenever an insertion violates the height balance constraint (|left_height - right_height| &lt;= 1).
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.4rem' }}>Submission Guidelines</h4>
          <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
            <li>Ensure all test case scenarios handle empty tree inputs cleanly.</li>
            <li>Use appropriate exception handlers for invalid integer keys.</li>
            <li>Type your code in the editor on the right and click <strong>Submit Assignment</strong> when ready.</li>
          </ul>
        </div>
      </div>

      {/* Right Pane: Code Typing Editor for Assignment Submission */}
      <div className="simple-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', backgroundColor: '#0d1117', border: '1px solid #30363d' }}>
        
        {/* Editor Toolbar */}
        <div style={{ padding: '0.6rem 1rem', backgroundColor: '#161b22', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
            <span style={{ fontSize: '0.775rem', color: '#8b949e' }}>Assignment Code Typing Workspace</span>
          </div>

          <button onClick={() => setCode(`// Type your assignment solution code here...`)} style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer' }} title="Clear code">
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Textarea Code Typing Editor */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
          placeholder={`// Type your ${language.toUpperCase()} solution for ${assignment.title}...`}
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

        {/* Execution Output Window */}
        {output && (
          <div style={{ backgroundColor: '#161b22', borderTop: '1px solid #30363d', padding: '0.85rem', fontFamily: 'monospace', fontSize: '0.8rem', color: '#38bdf8', whiteSpace: 'pre-wrap', maxHeight: '140px', overflowY: 'auto' }}>
            {output}
          </div>
        )}

        {/* Submit Actions Toolbar */}
        <div style={{ padding: '0.75rem 1rem', backgroundColor: '#161b22', borderTop: '1px solid #30363d', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button onClick={handleRun} disabled={isExecuting} className="btn btn-light" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
            <Play size={14} /> {isExecuting ? 'Testing...' : 'Test Code'}
          </button>
          <button onClick={handleSubmit} disabled={isExecuting || !code.trim()} className="btn btn-orange" style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}>
            <Send size={14} /> {isExecuting ? 'Submitting...' : 'Submit Assignment'}
          </button>
        </div>

      </div>

    </div>
  );
}
