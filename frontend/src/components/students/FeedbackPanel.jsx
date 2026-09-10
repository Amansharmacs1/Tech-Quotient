import React, { useState } from 'react';
import { MessageSquare, Save, Send } from 'lucide-react';

const FeedbackPanel = ({ initialFeedback }) => {
  const [feedback, setFeedback] = useState(
    initialFeedback || {
      remarks: '',
      strengths: '',
      improvements: ''
    }
  );

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate save
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-6 text-lg">
        <MessageSquare size={20} className="text-primary" /> Faculty Feedback
      </h3>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">General Remarks</label>
          <textarea
            name="remarks"
            value={feedback.remarks}
            onChange={handleChange}
            rows="3"
            placeholder="Add general comments about this submission..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y text-sm bg-gray-50/50"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Key Strengths</label>
          <textarea
            name="strengths"
            value={feedback.strengths}
            onChange={handleChange}
            rows="2"
            placeholder="What did the student do well?"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y text-sm bg-gray-50/50"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Areas for Improvement</label>
          <textarea
            name="improvements"
            value={feedback.improvements}
            onChange={handleChange}
            rows="2"
            placeholder="Where can the student improve?"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y text-sm bg-gray-50/50"
          ></textarea>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm text-green-600 font-medium opacity-0 transition-opacity" style={{ opacity: isSaved ? 1 : 0 }}>
            Feedback saved successfully!
          </span>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-gray-700 font-medium border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
            >
              <Save size={16} /> Save Draft
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-lg bg-primary text-white font-medium hover:bg-opacity-90 transition-all flex items-center gap-2 text-sm shadow-sm shadow-primary/30"
            >
              <Send size={16} /> Publish to Student
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedbackPanel;
