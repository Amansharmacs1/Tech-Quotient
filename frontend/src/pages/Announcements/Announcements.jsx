import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Plus, Trash2, Edit2 } from 'lucide-react';

const initialAnnouncements = [
  { id: 1, title: 'Midterm Exam Schedule', content: 'The midterm exam for DSA will be held on Oct 15th at 10 AM in Hall A.', date: '2023-10-01', targetCourse: 'Data Structures and Algorithms' },
  { id: 2, title: 'Assignment 3 Extended', content: 'The deadline for Assignment 3 has been extended to this Sunday night.', date: '2023-10-05', targetCourse: 'Object Oriented Programming' }
];

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', targetCourse: 'All Courses' });

  const handleCreate = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      targetCourse: formData.targetCourse,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setIsModalOpen(false);
    setFormData({ title: '', content: '', targetCourse: 'All Courses' });
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">Announcements</h1>
          <p className="text-gray-500">Manage and send announcements to your students.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-primary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((announcement) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={announcement.id} 
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <Bell size={24} />
              </div>
              <div className="flex gap-2 text-gray-400">
                <button onClick={() => handleDelete(announcement.id)} className="hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-secondary mb-2 line-clamp-1">{announcement.title}</h3>
            <p className="text-xs text-primary font-medium mb-3 bg-primary/5 inline-block px-2 py-1 rounded-md self-start">{announcement.targetCourse}</p>
            <p className="text-sm text-gray-500 mb-6 flex-1 line-clamp-3">{announcement.content}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
              <span className="text-xs font-medium text-gray-400">{announcement.date}</span>
            </div>
          </motion.div>
        ))}
        {announcements.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200">
            No announcements found.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-2xl font-bold text-secondary mb-6">New Announcement</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Course</label>
                <select 
                  value={formData.targetCourse}
                  onChange={e => setFormData({...formData, targetCourse: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                >
                  <option>All Courses</option>
                  <option>Data Structures and Algorithms</option>
                  <option>Object Oriented Programming</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  required
                  rows="4"
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                ></textarea>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-gray-500 font-medium hover:bg-gray-50 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm">Post Announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
