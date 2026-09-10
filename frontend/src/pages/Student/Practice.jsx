import React, { useState } from 'react';
import CodingWorkspace from '../../components/student/CodingWorkspace';
import { practiceProblems } from '../../data/mockData';

export default function Practice() {
  const [selectedProblem, setSelectedProblem] = useState(practiceProblems[0]);

  return (
    <CodingWorkspace
      selectedProblem={selectedProblem}
      onSelectProblem={setSelectedProblem}
      role="student"
    />
  );
}
