import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PromptPanel from '../../components/ai/PromptPanel';
import GeneratedProblemCard from '../../components/ai/GeneratedProblemCard';
import LoadingAnimation from '../../components/ai/LoadingAnimation';
import EmptyAIState from '../../components/ai/EmptyAIState';
import { generateProblem } from '../../services/aiService';

const ProblemGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProblem, setGeneratedProblem] = useState(null);
  const [loadingText, setLoadingText] = useState("Understanding requirements...");

  const handleGenerate = (data) => {
    setIsGenerating(true);
    setGeneratedProblem(null);
    
    // Cycle loading texts
    const texts = [
      "Understanding requirements...",
      "Designing problem...",
      "Preparing test cases...",
      "Generating solution guidance..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 800);

    generateProblem(data).then((problem) => {
      clearInterval(interval);
      setGeneratedProblem(problem);
      setIsGenerating(false);
    });
  };

  const fields = [
    { id: 'course', label: 'Course', type: 'select', options: ['Data Structures', 'Algorithms', 'Database Management', 'Computer Networks'] },
    { id: 'topic', label: 'Topic (e.g., Arrays, Trees)', type: 'text' },
    { id: 'difficulty', label: 'Difficulty', type: 'select', options: ['Easy', 'Medium', 'Hard'] },
    { id: 'problemType', label: 'Problem Type', type: 'select', options: ['Coding', 'Conceptual', 'Debugging'] },
    { id: 'concept', label: 'Programming Concept', type: 'text' },
    { id: 'count', label: 'Number of Problems', type: 'number' },
    { id: 'instructions', label: 'Additional Instructions', type: 'text' }
  ];

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-6">
        <Link to="/ai" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4">
          <ArrowLeft size={18} /> Back to AI Hub
        </Link>
        <h1 className="text-3xl font-bold text-secondary">AI Problem Generator</h1>
      </div>

      <PromptPanel 
        title="Configure Problem Parameters"
        description="Provide the context and our AI will generate complete coding problems including test cases and constraints."
        fields={fields}
        onGenerate={handleGenerate}
      />

      <div className="mt-8">
        {isGenerating ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm min-h-[400px] flex items-center justify-center">
            <LoadingAnimation text={loadingText} />
          </div>
        ) : generatedProblem ? (
          <GeneratedProblemCard problem={generatedProblem} />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[400px] flex items-center justify-center">
            <EmptyAIState message="Ready to Generate" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemGenerator;
