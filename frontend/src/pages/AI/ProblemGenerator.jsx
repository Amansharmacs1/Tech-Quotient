import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PromptPanel from '../../components/ai/PromptPanel';
import GeneratedProblemCard from '../../components/ai/GeneratedProblemCard';
import LoadingAnimation from '../../components/ai/LoadingAnimation';
import EmptyAIState from '../../components/ai/EmptyAIState';
import { aiGeneratedProblem } from '../../data/aiResponses';

const ProblemGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProblem, setGeneratedProblem] = useState(null);

  const handleGenerate = (data) => {
    setIsGenerating(true);
    setGeneratedProblem(null);
    
    // Simulate AI generation delay
    setTimeout(() => {
      setGeneratedProblem(aiGeneratedProblem);
      setIsGenerating(false);
    }, 2500);
  };

  const fields = [
    { id: 'course', label: 'Course', type: 'select', options: ['Data Structures', 'Algorithms', 'Database Management', 'Computer Networks'] },
    { id: 'topic', label: 'Topic', type: 'text' },
    { id: 'difficulty', label: 'Difficulty', type: 'select', options: ['Easy', 'Medium', 'Hard'] },
    { id: 'count', label: 'Number of Problems', type: 'number' }
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
          <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm">
            <LoadingAnimation text="Generating coding problem..." />
          </div>
        ) : generatedProblem ? (
          <GeneratedProblemCard problem={generatedProblem} />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <EmptyAIState message="Ready to Generate" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemGenerator;
