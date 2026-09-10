import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProblemForm from '../../components/problems/ProblemForm';
import { createProblem } from '../../services/problemService';

const CreateProblem = () => {
  const navigate = useNavigate();

  const handleCreate = async (newProblemData) => {
    try {
      await createProblem(newProblemData);
      navigate('/problems');
    } catch (err) {
      alert('Failed to create problem. Please check required fields.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/problems" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4"
        >
          <ArrowLeft size={18} />
          Back to Problems
        </Link>
        <h1 className="text-3xl font-bold text-secondary">Create New Problem</h1>
        <p className="text-gray-500 mt-1">Configure a new programming question with test cases and constraints.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ProblemForm 
          onSubmit={handleCreate} 
          submitLabel="Create Problem"
        />
      </motion.div>
    </div>
  );
};

export default CreateProblem;
