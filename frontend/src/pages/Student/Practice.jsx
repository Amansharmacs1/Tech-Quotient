import React, { useState, useEffect } from 'react';
import CodingWorkspace from '../../components/student/CodingWorkspace';
import { fetchProblems } from '../../services/api';

export default function Practice() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const data = await fetchProblems();
        if (data && data.length > 0) {
          setProblems(data);
          setSelectedProblem(data[0]);
        }
      } catch (error) {
        console.error('Failed to load problems:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProblems();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading Practice Workspace...</div>;
  }

  if (problems.length === 0) {
    return <div style={{ padding: '2rem' }}>No coding problems available.</div>;
  }

  return (
    <CodingWorkspace
      selectedProblem={selectedProblem}
      onSelectProblem={setSelectedProblem}
      problemsList={problems}
      role="student"
    />
  );
}