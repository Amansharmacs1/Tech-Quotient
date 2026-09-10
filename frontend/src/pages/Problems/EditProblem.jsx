import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProblemForm from '../../components/problems/ProblemForm';
import { getProblemById, updateProblem } from '../../services/problemService';

const EditProblem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problemData, setProblemData] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const data = await getProblemById(id);
        setProblemData(data);
      } catch (err) {
        navigate('/problems');
      }
    };
    fetchProblem();
  }, [id, navigate]);

  const handleUpdate = async (updatedData) => {
    try {
      await updateProblem(id, updatedData);
      navigate('/problems');
    } catch (err) {
      alert('Failed to update problem.');
    }
  };

  if (!problemData) return <div className="p-8 text-center">Loading...</div>;

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
        <h1 className="text-3xl font-bold text-secondary">Edit Problem</h1>
        <p className="text-gray-500 mt-1">Make changes to "{problemData.title}".</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ProblemForm 
          initialData={problemData}
          onSubmit={handleUpdate} 
          submitLabel="Update Problem"
        />
      </motion.div>
    </div>
  );
};

export default EditProblem;
