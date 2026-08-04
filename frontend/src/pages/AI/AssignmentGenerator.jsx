import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PromptPanel from '../../components/ai/PromptPanel';
import AssignmentPreview from '../../components/ai/AssignmentPreview';
import LoadingAnimation from '../../components/ai/LoadingAnimation';
import EmptyAIState from '../../components/ai/EmptyAIState';
import { aiGeneratedAssignment } from '../../data/aiResponses';

const AssignmentGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAssignment, setGeneratedAssignment] = useState(null);

  const handleGenerate = (data) => {
    setIsGenerating(true);
    setGeneratedAssignment(null);
    
    setTimeout(() => {
      setGeneratedAssignment(aiGeneratedAssignment);
      setIsGenerating(false);
    }, 3000);
  };

  const fields = [
    { id: 'course', label: 'Course', type: 'select', options: ['Data Structures', 'Algorithms', 'Database Management', 'Computer Networks'] },
    { id: 'topics', label: 'Topics (Comma separated)', type: 'text' },
    { id: 'difficultyMix', label: 'Difficulty Mix', type: 'select', options: ['Balanced', 'Mostly Easy', 'Mostly Hard'] },
    { id: 'count', label: 'Number of Questions', type: 'number' },
    { id: 'duration', label: 'Estimated Duration (Hours)', type: 'number' }
  ];

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-6">
        <Link to="/ai" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4">
          <ArrowLeft size={18} /> Back to AI Hub
        </Link>
        <h1 className="text-3xl font-bold text-secondary">AI Assignment Generator</h1>
      </div>

      <PromptPanel 
        title="Design an Assignment"
        description="Let AI assemble a balanced assignment structure based on your learning objectives and required difficulty."
        fields={fields}
        onGenerate={handleGenerate}
      />

      <div className="mt-8">
        {isGenerating ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm">
            <LoadingAnimation text="Structuring assignment syllabus..." />
          </div>
        ) : generatedAssignment ? (
          <AssignmentPreview assignment={generatedAssignment} />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <EmptyAIState message="Ready to Design" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentGenerator;
