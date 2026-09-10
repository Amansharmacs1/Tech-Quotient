import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Send, 
  RotateCcw, 
  Moon, 
  Sun, 
  Terminal, 
  Copy,
  Check,
  Code2,
  AlertTriangle
} from 'lucide-react';

export default function MonacoCodeEditor({
  value,
  onChange,
  language = 'java',
  onLanguageChange,
  onRun,
  onSubmit,
  isExecuting = false,
  output = '',
  starterCode = '',
  height = '100%',
  title = 'Code Workspace'
}) {
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [showConsole, setShowConsole] = useState(true);
  const [copied, setCopied] = useState(false);
  const [monacoLoaded, setMonacoLoaded] = useState(false);
  
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const isInternalChangeRef = useRef(false);

  // Map language to Monaco ID
  const getMonacoLanguage = (lang) => {
    switch (lang?.toLowerCase()) {
      case 'cpp':
      case 'c++':
        return 'cpp';
      case 'java':
        return 'java';
      case 'python':
      case 'py':
        return 'python';
      case 'javascript':
      case 'js':
      case 'node':
        return 'javascript';
      default:
        return 'java';
    }
  };

  // Load Monaco from CDN dynamically
  useEffect(() => {
    let isMounted = true;

    const loadMonacoCDN = () => {
      if (window.monaco && window.monaco.editor) {
        if (isMounted) setMonacoLoaded(true);
        return;
      }

      if (window.require && window.require.config) {
        window.require(['vs/editor/editor.main'], () => {
          if (isMounted && window.monaco) setMonacoLoaded(true);
        });
        return;
      }

      const script = document.createElement('script');
      script.id = 'monaco-loader-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js';
      script.async = true;
      script.onload = () => {
        if (window.require) {
          window.require.config({
            paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }
          });
          window.require(['vs/editor/editor.main'], () => {
            if (isMounted && window.monaco) {
              setMonacoLoaded(true);
            }
          });
        }
      };
      script.onerror = () => {
        console.warn('Monaco CDN load failed, using IDE fallback editor.');
      };
      document.head.appendChild(script);
    };

    loadMonacoCDN();

    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize Monaco Editor Instance ONCE when monacoLoaded is true
  useEffect(() => {
    if (monacoLoaded && window.monaco && containerRef.current && !editorRef.current) {
      editorRef.current = window.monaco.editor.create(containerRef.current, {
        value: value || '',
        language: getMonacoLanguage(language),
        theme: theme,
        fontSize: fontSize,
        fontFamily: "'Fira Code', 'Cascadia Code', Consolas, Monaco, monospace",
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        renderLineHighlight: 'all',
        tabSize: 4,
        insertSpaces: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        bracketPairColorization: { enabled: true }
      });

      editorRef.current.onDidChangeModelContent(() => {
        const val = editorRef.current.getValue();
        isInternalChangeRef.current = true;
        if (onChange) onChange(val);
        isInternalChangeRef.current = false;
      });
    }
  }, [monacoLoaded]);

  // Sync external value changes without losing cursor focus
  useEffect(() => {
    if (editorRef.current && !isInternalChangeRef.current) {
      const currentVal = editorRef.current.getValue();
      if (value !== undefined && value !== currentVal) {
        editorRef.current.setValue(value || '');
      }
    }
  }, [value]);

  // Sync language changes
  useEffect(() => {
    if (editorRef.current && window.monaco) {
      const model = editorRef.current.getModel();
      if (model) {
        window.monaco.editor.setModelLanguage(model, getMonacoLanguage(language));
      }
    }
  }, [language]);

  // Sync theme & font size changes
  useEffect(() => {
    if (editorRef.current && window.monaco) {
      window.monaco.editor.setTheme(theme);
      editorRef.current.updateOptions({ fontSize: fontSize });
    }
  }, [theme, fontSize]);

  const handleCopyCode = () => {
    const textToCopy = editorRef.current ? editorRef.current.getValue() : value;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    if (starterCode !== undefined && onChange) {
      onChange(starterCode);
      if (editorRef.current) {
        editorRef.current.setValue(starterCode);
      }
    }
  };

  const lines = (value || '').split('\n');

  return (
    <div 
      className="monaco-workspace-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: height,
        backgroundColor: theme === 'vs-dark' ? '#0d1117' : '#ffffff',
        border: theme === 'vs-dark' ? '1px solid #30363d' : '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
      }}
    >
      {/* Monaco Toolbar Header */}
      <div 
        style={{
          padding: '0.6rem 1rem',
          backgroundColor: theme === 'vs-dark' ? '#161b22' : '#f8fafc',
          borderBottom: theme === 'vs-dark' ? '1px solid #30363d' : '1px solid #e2e8f0',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => onLanguageChange && onLanguageChange(e.target.value)}
            style={{
              backgroundColor: theme === 'vs-dark' ? '#21262d' : '#ffffff',
              color: theme === 'vs-dark' ? '#c9d1d9' : '#1e293b',
              border: theme === 'vs-dark' ? '1px solid #30363d' : '1px solid #cbd5e1',
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="java">Java (JDK 17)</option>
            <option value="cpp">C++ (GCC 12)</option>
            <option value="python">Python 3.10</option>
            <option value="javascript">JavaScript (Node.js)</option>
          </select>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(prev => prev === 'vs-dark' ? 'vs-light' : 'vs-dark')}
            title="Toggle Theme"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '0.35rem 0.6rem',
              borderRadius: '6px',
              border: theme === 'vs-dark' ? '1px solid #30363d' : '1px solid #cbd5e1',
              backgroundColor: theme === 'vs-dark' ? '#21262d' : '#ffffff',
              color: theme === 'vs-dark' ? '#c9d1d9' : '#475569',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            {theme === 'vs-dark' ? <Sun size={14} color="#f59e0b" /> : <Moon size={14} color="#6366f1" />}
            {theme === 'vs-dark' ? 'VS-Dark' : 'Light'}
          </button>

          {/* Font Size Selector */}
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            style={{
              backgroundColor: theme === 'vs-dark' ? '#21262d' : '#ffffff',
              color: theme === 'vs-dark' ? '#8b949e' : '#64748b',
              border: theme === 'vs-dark' ? '1px solid #30363d' : '1px solid #cbd5e1',
              padding: '0.35rem 0.5rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          >
            <option value={12}>12px</option>
            <option value={14}>14px</option>
            <option value={16}>16px</option>
            <option value={18}>18px</option>
          </select>
        </div>

        {/* Action Toolbar Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={handleCopyCode}
            title="Copy code to clipboard"
            style={{
              background: 'none',
              border: 'none',
              color: theme === 'vs-dark' ? '#8b949e' : '#64748b',
              cursor: 'pointer',
              padding: '0.3rem'
            }}
          >
            {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
          </button>

          <button
            onClick={handleReset}
            title="Reset code template"
            style={{
              background: 'none',
              border: 'none',
              color: theme === 'vs-dark' ? '#8b949e' : '#64748b',
              cursor: 'pointer',
              padding: '0.3rem'
            }}
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={() => setShowConsole(prev => !prev)}
            title="Toggle Output Console"
            style={{
              background: 'none',
              border: 'none',
              color: showConsole ? '#f26422' : (theme === 'vs-dark' ? '#8b949e' : '#64748b'),
              cursor: 'pointer',
              padding: '0.3rem'
            }}
          >
            <Terminal size={16} />
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div style={{ flex: 1, minHeight: '280px', position: 'relative', display: 'flex', overflow: 'hidden' }}>
        {/* Real Monaco Canvas Container */}
        <div 
          ref={containerRef} 
          style={{ 
            width: '100%', 
            height: '100%', 
            display: monacoLoaded ? 'block' : 'none' 
          }} 
        />

        {/* IDE Gutter Fallback (Visible before Monaco initializes) */}
        {!monacoLoaded && (
          <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: theme === 'vs-dark' ? '#0d1117' : '#ffffff' }}>
            <div 
              style={{
                width: '45px',
                backgroundColor: theme === 'vs-dark' ? '#161b22' : '#f8fafc',
                color: theme === 'vs-dark' ? '#484f58' : '#94a3b8',
                padding: '1rem 0.5rem',
                fontFamily: "'Fira Code', monospace",
                fontSize: `${fontSize}px`,
                lineHeight: 1.6,
                textAlign: 'right',
                userSelect: 'none',
                borderRight: theme === 'vs-dark' ? '1px solid #30363d' : '1px solid #e2e8f0'
              }}
            >
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <textarea
              value={value}
              onChange={(e) => onChange && onChange(e.target.value)}
              spellCheck="false"
              placeholder={`// Write your ${language.toUpperCase()} solution code here...`}
              style={{
                flex: 1,
                backgroundColor: theme === 'vs-dark' ? '#0d1117' : '#ffffff',
                color: theme === 'vs-dark' ? '#e6edf3' : '#0f172a',
                fontFamily: "'Fira Code', Consolas, monospace",
                fontSize: `${fontSize}px`,
                lineHeight: 1.6,
                padding: '1rem',
                border: 'none',
                outline: 'none',
                resize: 'none',
                tabSize: 4
              }}
            />
          </div>
        )}
      </div>

      {/* Console Output Drawer */}
      {showConsole && output && (
        <div 
          style={{
            backgroundColor: theme === 'vs-dark' ? '#161b22' : '#f1f5f9',
            borderTop: theme === 'vs-dark' ? '1px solid #30363d' : '1px solid #cbd5e1',
            maxHeight: '180px',
            overflowY: 'auto',
            padding: '0.85rem 1rem',
            fontFamily: "'Fira Code', monospace",
            fontSize: '0.825rem',
            lineHeight: 1.5,
            color: output.includes('COMPILATION ERROR') || output.includes('SYNTAX ERROR') || output.includes('error:') 
              ? '#f87171' 
              : (theme === 'vs-dark' ? '#38bdf8' : '#0284c7')
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', borderBottom: '1px solid rgba(125, 125, 125, 0.2)', paddingBottom: '0.3rem' }}>
            <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', color: theme === 'vs-dark' ? '#f1f5f9' : '#0f172a' }}>
              <Terminal size={14} color="var(--primary-orange)" /> Execution & Test Case Log:
            </span>
            <button 
              onClick={() => setShowConsole(false)} 
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem' }}
            >
              ✕ Hide Console
            </button>
          </div>

          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {output}
          </pre>
        </div>
      )}

      {/* Footer Controls */}
      <div 
        style={{
          padding: '0.75rem 1rem',
          backgroundColor: theme === 'vs-dark' ? '#161b22' : '#f8fafc',
          borderTop: theme === 'vs-dark' ? '1px solid #30363d' : '1px solid #e2e8f0',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: '0.75rem', color: theme === 'vs-dark' ? '#8b949e' : '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Code2 size={13} color="var(--primary-orange)" /> Microsoft Monaco Editor Engine • {language.toUpperCase()}
        </span>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {onRun && (
            <button 
              onClick={onRun} 
              disabled={isExecuting} 
              className="btn btn-light" 
              style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem', fontWeight: 700 }}
            >
              <Play size={14} fill={isExecuting ? 'none' : 'currentColor'} /> {isExecuting ? 'Compiling...' : 'Run Code'}
            </button>
          )}

          {onSubmit && (
            <button 
              onClick={onSubmit} 
              disabled={isExecuting} 
              className="btn btn-orange" 
              style={{ padding: '0.45rem 1.35rem', fontSize: '0.85rem', fontWeight: 700 }}
            >
              <Send size={14} /> {isExecuting ? 'Submitting...' : 'Submit Solution'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
