import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Code2, 
  Copy, 
  Check, 
  Lightbulb, 
  Bug, 
  Cpu, 
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { studentProfile } from '../data/mockData';
import { sendAiQueryApi } from '../services/api';

export default function AiAssistant({ setActiveTab }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello ${studentProfile.name}! I am TechBot, your AI Programming Mentor at TechQuotient. I can explain code algorithms, help debug compilation errors, analyze complexity, or generate personalized practice hints. How can I assist your coding today?`,
      code: null,
      time: 'Just now'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const promptPresets = [
    { title: "Explain AVL Tree Rotation", icon: Lightbulb, prompt: "Explain LL and RR rotations in AVL trees with C++ code example." },
    { title: "Debug Memory Leak", icon: Bug, prompt: "How do I prevent memory leaks when dynamically allocating arrays in C++?" },
    { title: "Time Complexity Guide", icon: Cpu, prompt: "What is the difference between O(N log N) and O(N^2) sorting algorithms?" },
    { title: "Recursion vs Iteration", icon: Code2, prompt: "Compare call stack depth overhead between recursion and iteration in Python." }
  ];

  const handleSendMessage = async (textToSend = null) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    const apiRes = await sendAiQueryApi(query, null);

    if (apiRes && apiRes.text) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: apiRes.text,
        code: apiRes.code,
        time: apiRes.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } else {
      setTimeout(() => {
        let botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: '',
          code: null,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        if (query.toLowerCase().includes('avl') || query.toLowerCase().includes('rotation')) {
          botResponse.text = "In AVL Trees, balance factors can become +2 or -2 after insertion. We perform single or double rotations to restore the height balance:";
          botResponse.code = `// Left-Left (LL) Single Right Rotation Example in C++\nNode* rightRotate(Node* y) {\n    Node* x = y->left;\n    Node* T2 = x->right;\n    // Perform rotation\n    x->right = y;\n    y->left = T2;\n    // Update heights\n    y->height = max(height(y->left), height(y->right)) + 1;\n    x->height = max(height(x->left), height(x->right)) + 1;\n    return x; // New root\n}`;
        } else {
          botResponse.text = `Great query regarding "${query}"! Based on your TechQuotient performance history, here is the recommended optimal pattern:`;
          botResponse.code = `// Optimized O(N) Hash Map Lookup Pattern\nstd::unordered_map<int, int> lookup;\nfor (int i = 0; i < n; ++i) {\n    if (lookup.find(target - nums[i]) != lookup.end()) return {lookup[target - nums[i]], i};\n    lookup[nums[i]] = i;\n}`;
        }

        setMessages(prev => [...prev, botResponse]);
      }, 700);
    }
    setIsTyping(false);
  };

  const handleCopyCode = (id, codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="page-body animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 120px)', minHeight: '650px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Bot size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--dark-heading)' }}>
              TechBot AI Programming Mentor
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Powered by OpenAI / Gemini Integration for TechQuotient
            </p>
          </div>
        </div>

        <button onClick={() => setActiveTab && setActiveTab('coding-workspace')} className="btn btn-outline btn-sm">
          <Code2 size={16} /> Open Editor Workspace
        </button>
      </div>

      {/* Main Chat Box */}
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        
        {/* Presets Bar */}
        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--card-border)', backgroundColor: '#f8fafc', display: 'flex', gap: '0.75rem', overflowX: 'auto' }}>
          {promptPresets.map((preset, idx) => {
            const Icon = preset.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(preset.prompt)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--card-border)',
                  backgroundColor: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={14} color="var(--primary-orange)" /> {preset.title}
              </button>
            );
          })}
        </div>

        {/* Message Thread Scroll Area */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '0.85rem',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start'
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: msg.sender === 'user' ? 'var(--primary-orange)' : '#8b5cf6',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
                flexShrink: 0
              }}>
                {msg.sender === 'user' ? 'AG' : <Bot size={20} />}
              </div>

              {/* Message Bubble */}
              <div style={{
                maxWidth: '75%',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: msg.sender === 'user' ? 'var(--primary-orange)' : '#f8fafc',
                color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
                border: msg.sender === 'user' ? 'none' : '1px solid var(--card-border)',
                boxShadow: 'var(--shadow-subtle)'
              }}>
                <div style={{ fontSize: '0.925rem', lineHeight: 1.6 }}>{msg.text}</div>

                {msg.code && (
                  <div style={{ marginTop: '0.75rem', position: 'relative' }}>
                    <button
                      onClick={() => handleCopyCode(msg.id, msg.code)}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid #30363d',
                        backgroundColor: '#21262d',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {copiedId === msg.id ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                      {copiedId === msg.id ? 'Copied!' : 'Copy Code'}
                    </button>

                    <pre className="code-container" style={{ margin: 0, paddingTop: '2.5rem' }}>
                      {msg.code}
                    </pre>
                  </div>
                )}

                <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '6px', textAlign: 'right' }}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <Bot size={18} color="#8b5cf6" /> TechBot is generating response...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--card-border)', backgroundColor: 'white', display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            placeholder="Ask TechBot about your code errors, complexity, or concepts..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="input-field"
            style={{ borderRadius: 'var(--radius-full)' }}
          />

          <button onClick={() => handleSendMessage()} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
            <Send size={18} />
          </button>
        </div>

      </div>

    </div>
  );
}
