import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, FileText, Sparkles, Trophy, Filter, Check, Trash2 } from 'lucide-react';
import { notificationsData as initialNotifications } from '../../data/mockData';
import { fetchAnnouncementsApi } from '../../services/api';

export default function Notifications({ setActiveTab }) {
  const [list, setList] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const data = await fetchAnnouncementsApi();
      if (data && data.length > 0) {
        // Map database announcements to the notification format expected by this component
        const dbAnnouncements = data.map(ann => ({
          id: ann._id,
          type: 'announcement',
          title: ann.title,
          message: ann.content,
          course: ann.targetCourse,
          time: new Date(ann.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          unread: true,
          author: ann.author?.name || 'Faculty'
        }));
        
        // Merge real announcements with mock notifications, real ones first
        setList([...dbAnnouncements, ...initialNotifications]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === 'all' 
    ? list 
    : list.filter(item => item.type === filter);

  const handleMarkAllRead = () => {
    setList(prev => prev.map(item => ({ ...item, unread: false })));
  };

  const handleClearNotification = (id) => {
    setList(prev => prev.filter(item => item.id !== id));
  };

  const handleItemClick = (item) => {
    // Mark as read
    setList(prev => prev.map(n => n.id === item.id ? { ...n, unread: false } : n));
    
    // Navigate based on type
    if (setActiveTab) {
      if (item.type === 'assignment') setActiveTab('assignments');
            else if (item.type === 'ai') setActiveTab('coding-workspace');
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'assignment': return <FileText className="text-blue-500 w-5 h-5" />;
      case 'announcement': return <Bell className="text-orange-500 w-5 h-5" />;
      case 'contest': return <Trophy className="text-yellow-500 w-5 h-5" />;
      case 'ai': return <Sparkles className="text-purple-500 w-5 h-5" />;
      default: return <Bell className="text-gray-500 w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">Notifications</h1>
          <p className="text-gray-500">Stay updated on your coursework, announcements, and AI insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors px-4 py-2 rounded-lg hover:bg-primary/5"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark all as read
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 border-r border-gray-100 bg-gray-50/50 p-6 flex flex-col gap-2">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Filter size={16} /> Filters
          </h3>
          <button 
            onClick={() => setFilter('all')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${filter === 'all' ? 'bg-primary text-white font-semibold shadow-sm' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
          >
            <span>All Updates</span>
            <span className={`text-xs px-2 py-1 rounded-full ${filter === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>{list.length}</span>
          </button>
          <button 
            onClick={() => setFilter('announcement')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${filter === 'announcement' ? 'bg-primary text-white font-semibold shadow-sm' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
          >
            <span className="flex items-center gap-2"><Bell size={16} /> Announcements</span>
          </button>
          <button 
            onClick={() => setFilter('assignment')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${filter === 'assignment' ? 'bg-primary text-white font-semibold shadow-sm' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
          >
            <span className="flex items-center gap-2"><FileText size={16} /> Assignments</span>
          </button>
          <button 
            onClick={() => setFilter('contest')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${filter === 'contest' ? 'bg-primary text-white font-semibold shadow-sm' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
          >
            <span className="flex items-center gap-2"><Trophy size={16} /> Contests</span>
          </button>
          <button 
            onClick={() => setFilter('ai')}
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${filter === 'ai' ? 'bg-primary text-white font-semibold shadow-sm' : 'text-gray-600 hover:bg-white hover:shadow-sm'}`}
          >
            <span className="flex items-center gap-2"><Sparkles size={16} /> AI Mentions</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 p-6">
          {loading ? (
             <div className="flex-1 flex items-center justify-center h-full text-gray-400 font-medium">Loading notifications...</div>
          ) : filtered.length > 0 ? (
            <div className="flex flex-col gap-3">
              {filtered.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`group flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${item.unread ? 'bg-primary/5 border-primary/20 hover:border-primary/40' : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.unread ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className={`text-base truncate ${item.unread ? 'font-bold text-secondary' : 'font-semibold text-gray-700'}`}>
                        {item.title}
                      </h4>
                      <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{item.time}</span>
                    </div>
                    <p className={`text-sm line-clamp-2 mb-2 ${item.unread ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                      {item.message}
                    </p>
                    <div className="flex items-center gap-3">
                      {item.course && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-600">
                          {item.course}
                        </span>
                      )}
                      {item.author && (
                        <span className="text-xs text-gray-400">From: {item.author}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    {item.unread && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleItemClick(item); }}
                        className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors tooltip-trigger"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleClearNotification(item.id); }}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors tooltip-trigger"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-secondary mb-1">All caught up!</h3>
              <p className="text-gray-500 max-w-sm">You don't have any notifications in this category right now.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
