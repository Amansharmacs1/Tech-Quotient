import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AssignmentForm from '../../components/assignments/AssignmentForm';
import { globalAssignments } from './Assignments';

const EditAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignmentData, setAssignmentData] = useState(null);

  useEffect(() => {
    // Simulate API Fetch
    const assignment = globalAssignments.find(a => a.id === parseInt(id));
    if (assignment) {
      setAssignmentData(assignment);
    } else {
      // Not found, redirect back
      navigate('/assignments');
    }
  }, [id, navigate]);

  const handleUpdate = (updatedData) => {
    // Simulate API Update
    const index = globalAssignments.findIndex(a => a.id === parseInt(id));
    if (index !== -1) {
      globalAssignments[index] = { ...updatedData, id: parseInt(id) };
    }
    
    // Navigate back to listing
    navigate('/assignments');
  };

  if (!assignmentData) return <div className="p-8 text-center">Loading...</div>;

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
        <h1 className="text-3xl font-bold text-secondary">Edit Assignment</h1>
        <p className="text-gray-500 mt-1">Make changes to "{assignmentData.title}".</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <AssignmentForm 
          initialData={assignmentData}
          onSubmit={handleUpdate} 
          submitLabel="Update Assignment"
        />
      </motion.div>
    </div>
  );
};

export default EditAssignment;
