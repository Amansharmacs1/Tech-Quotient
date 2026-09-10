import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import PromptPanel from '../../components/ai/PromptPanel';
import AssignmentPreview from '../../components/ai/AssignmentPreview';
import LoadingAnimation from '../../components/ai/LoadingAnimation';
import EmptyAIState from '../../components/ai/EmptyAIState';
import { generateAssignment } from '../../services/aiService';

const AssignmentGenerator = () => {
  const location = useLocation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAssignment, setGeneratedAssignment] = useState(null);
  const [loadingText, setLoadingText] = useState("Structuring assignment syllabus...");

  const handleGenerate = (data) => {
    setIsGenerating(true);
    setGeneratedAssignment(null);
    
    const texts = [
      "Structuring assignment syllabus...",
      "Selecting appropriate problems...",
      "Balancing difficulty...",
      "Finalizing learning objectives..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 800);

    generateAssignment(data).then((assignment) => {
      clearInterval(interval);
      setGeneratedAssignment(assignment);
      setIsGenerating(false);
    });
  };

  const fields = [
    { id: 'course', label: 'Course', type: 'select', options: ['Data Structures', 'Algorithms', 'Database Management', 'Computer Networks'] },
    { id: 'topics', label: 'Topics (Comma separated)', type: 'text' },
    { id: 'count', label: 'Number of Problems', type: 'number' },
    { id: 'difficultyMix', label: 'Difficulty Mix', type: 'select', options: ['Balanced', 'Mostly Easy', 'Mostly Hard'] },
    { id: 'duration', label: 'Duration (Minutes)', type: 'number' },
    { id: 'maxMarks', label: 'Maximum Marks', type: 'number' },
    { id: 'objective', label: 'Learning Objective', type: 'text' },
    { id: 'instructions', label: 'Additional Instructions', type: 'text' }
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
        defaultValues={{ course: location.state?.defaultCourse || '' }}
      />

      <div className="mt-8">
        {isGenerating ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm min-h-[400px] flex items-center justify-center">
            <LoadingAnimation text={loadingText} />
          </div>
        ) : generatedAssignment ? (
          <AssignmentPreview assignment={generatedAssignment} />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[400px] flex items-center justify-center">
            <EmptyAIState message="Ready to Design" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentGenerator;
