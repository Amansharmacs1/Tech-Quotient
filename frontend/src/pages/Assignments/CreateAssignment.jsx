import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AssignmentForm from '../../components/assignments/AssignmentForm';
import { globalAssignments } from './Assignments';

const CreateAssignment = () => {
  const navigate = useNavigate();

  const handleCreate = (newAssignmentData) => {
    // Generate pseudo-ID
    const newId = globalAssignments.length > 0 ? Math.max(...globalAssignments.map(a => a.id)) + 1 : 1;
    const assignment = { ...newAssignmentData, id: newId };
    
    // Simulate API Create
    globalAssignments.push(assignment);
    
    // Navigate back to listing
    navigate('/assignments');
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-6">
        <Link 
          to="/assignments" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4"
        >
          <ArrowLeft size={18} />
          Back to Assignments
        </Link>
        <h1 className="text-3xl font-bold text-secondary">Create New Assignment</h1>
        <p className="text-gray-500 mt-1">Configure a new assignment and attach coding problems for your students.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <AssignmentForm 
          onSubmit={handleCreate} 
          submitLabel="Create Assignment"
        />
      </motion.div>
    </div>
  );
};

export default CreateAssignment;
