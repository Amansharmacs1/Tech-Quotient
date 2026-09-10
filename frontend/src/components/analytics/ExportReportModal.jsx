import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, FileSpreadsheet, FileJson } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportReportModal = ({ isOpen, onClose, reportName }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Export Report</h3>
              <p className="text-sm text-gray-500 mt-1">{reportName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Select Export Format:</p>
            
            <button onClick={() => { 
                const doc = new jsPDF();
                
                // Header
                doc.setFontSize(22);
                doc.setTextColor(33, 37, 41);
                doc.text("TechQuotient Analytics Report", 14, 22);
                
                // Subheader
                doc.setFontSize(12);
                doc.setTextColor(108, 117, 125);
                doc.text(`Report Name: ${reportName}`, 14, 30);
                doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 36);
                
                // Divider line
                doc.setDrawColor(220, 220, 220);
                doc.line(14, 40, 196, 40);

                // Table Data
                const tableColumn = ["Metric", "Value", "Trend", "Status"];
                const tableRows = [
                  ["Total Students", "1,245", "+5.2%", "Good"],
                  ["Active Courses", "18", "Stable", "Normal"],
                  ["Avg Performance", "82.4%", "+1.1%", "Excellent"],
                  ["Completion Rate", "94.2%", "-0.5%", "Good"],
                  ["AI Insights Generated", "342", "+12.4%", "Active"]
                ];

                doc.autoTable({
                  startY: 45,
                  head: [tableColumn],
                  body: tableRows,
                  theme: 'striped',
                  headStyles: { fillColor: [79, 70, 229] }, // Primary color
                  styles: { fontSize: 10, cellPadding: 5 },
                });

                // Footer
                const pageCount = doc.internal.getNumberOfPages();
                for(let i = 1; i <= pageCount; i++) {
                  doc.setPage(i);
                  doc.setFontSize(10);
                  doc.setTextColor(150);
                  doc.text(
                    `Page ${i} of ${pageCount}`, 
                    doc.internal.pageSize.width / 2, 
                    doc.internal.pageSize.height - 10, 
                    { align: 'center' }
                  );
                }

                doc.save(`${reportName.replace(/\\s+/g, '_')}_Report.pdf`);
                onClose(); 
              }} className="w-full p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              <div className="text-left flex-1">
                <h4 className="font-bold text-gray-900">PDF Document</h4>
                <p className="text-xs text-gray-500">Best for sharing and printing</p>
              </div>
              <Download size={18} className="text-gray-400 group-hover:text-red-500" />
            </button>

            <button onClick={() => { 
                const xlsxBase64 = "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";
                const binaryString = window.atob(xlsxBase64);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${reportName}.xlsx`;
                a.click();
                onClose(); 
              }} className="w-full p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileSpreadsheet size={20} />
              </div>
              <div className="text-left flex-1">
                <h4 className="font-bold text-gray-900">Excel Spreadsheet</h4>
                <p className="text-xs text-gray-500">Best for data analysis (.xlsx)</p>
              </div>
              <Download size={18} className="text-gray-400 group-hover:text-green-500" />
            </button>

            <button onClick={() => { 
                const blob = new Blob(['Name,Score\nAlice,90\nBob,85'], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${reportName}.csv`;
                a.click();
                onClose(); 
              }} className="w-full p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <FileJson size={20} />
              </div>
              <div className="text-left flex-1">
                <h4 className="font-bold text-gray-900">CSV Data</h4>
                <p className="text-xs text-gray-500">Raw comma-separated values</p>
              </div>
              <Download size={18} className="text-gray-400 group-hover:text-blue-500" />
            </button>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ExportReportModal;
