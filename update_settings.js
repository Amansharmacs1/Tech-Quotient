const fs = require('fs');

const path = 'frontend/src/pages/Settings/Settings.jsx';
let content = fs.readFileSync(path, 'utf8');

// Add imports
if (!content.includes('Eye')) {
    content = content.replace("import { User, Mail, Lock, Bell, Shield, Save } from 'lucide-react';", "import { User, Mail, Lock, Bell, Shield, Save, Eye, EyeOff } from 'lucide-react';\nimport { changePasswordApi } from '../../services/authService';");
}

// Add state
const stateReplacement = `
  const [activeTab, setActiveTab] = useState('profile');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'New passwords do not match', type: 'error' });
      return;
    }
    
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    const result = await changePasswordApi(currentPassword, newPassword);
    
    if (result.success) {
      setMessage({ text: 'Password changed successfully!', type: 'success' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setMessage({ text: result.message || 'Failed to change password', type: 'error' });
    }
    setLoading(false);
  };
`;
content = content.replace("const [activeTab, setActiveTab] = useState('profile');", stateReplacement);

// Update Security Tab UI
const securityTabSearch = `<div className="space-y-6 max-w-lg">`;
const securityTabReplace = `<form onSubmit={handleChangePassword} className="space-y-6 max-w-lg">
                {message.text && (
                  <div className={\`p-3 rounded-lg text-sm \${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}\`}>
                    {message.text}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input 
                      type={showPasswords ? "text" : "password"} 
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="pl-10 pr-10 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" 
                    />
                    <button type="button" onClick={() => setShowPasswords(!showPasswords)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                      {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input 
                      type={showPasswords ? "text" : "password"} 
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="pl-10 pr-10 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" 
                    />
                    <button type="button" onClick={() => setShowPasswords(!showPasswords)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                      {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input 
                      type={showPasswords ? "text" : "password"} 
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="pl-10 pr-10 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" 
                    />
                    <button type="button" onClick={() => setShowPasswords(!showPasswords)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                      {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="pt-4">
                  <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
                    <Save size={18} /> {loading ? 'Saving...' : 'Update Password'}
                  </button>
                </div>
              </form>`;

content = content.replace(/<div className="space-y-6 max-w-lg">[\s\S]*?<\/div>\s*<\/div>\s*\)}/m, securityTabReplace + '\n            </div>\n          )}');

fs.writeFileSync(path, content);
