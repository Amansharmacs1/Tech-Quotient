import React, { useState } from 'react';
import { FileText, Users, BookOpen, Target } from 'lucide-react';
import ReportCard from '../../components/analytics/ReportCard';
import ExportReportModal from '../../components/analytics/ExportReportModal';

const Reports = () => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');

  const handleExport = (reportName) => {
    setSelectedReport(reportName);
    setIsExportModalOpen(true);
  };

  const reports = [
    {
      title: 'Student Performance Report',
      description: 'Comprehensive analysis of individual student grades, engagement, and weak topics.',
      icon: Users,
      colorClass: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Course Analytics Report',
      description: 'Aggregated metrics showing overall course health, completion rates, and historical comparisons.',
      icon: BookOpen,
      colorClass: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Assignment Summary Report',
      description: 'Detailed breakdown of assignment submissions, average scores, and common failure points.',
      icon: FileText,
      colorClass: 'bg-green-100 text-green-600'
    },
    {
      title: 'Problem Difficulty Report',
      description: 'Statistical analysis of coding problems categorized by success rate and difficulty level.',
      icon: Target,
      colorClass: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">Reports Hub</h1>
        <p className="text-gray-500">Generate and export comprehensive data reports for your courses and students.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {reports.map((report) => (
          <ReportCard
            key={report.title}
            title={report.title}
            description={report.description}
            icon={report.icon}
            colorClass={report.colorClass}
            onExport={() => handleExport(report.title)}
          />
        ))}
      </div>

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        reportName={selectedReport}
      />
    </div>
  );
};

export default Reports;
