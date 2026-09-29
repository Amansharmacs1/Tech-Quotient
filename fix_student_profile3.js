const fs = require('fs');

const path = 'frontend/src/components/student/Profile.jsx';
let content = fs.readFileSync(path, 'utf8');

// Add import
if (!content.includes('updateProfileApi')) {
    content = content.replace("import { useAuth } from '../../contexts/AuthContext';", "import { useAuth } from '../../contexts/AuthContext';\nimport { updateProfileApi } from '../../services/authService';");
}

// Update handleSaveProfile
const oldHandleSaveProfile = `  const handleSaveProfile = (e) => {
    e.preventDefault();
    // This only updates the local state/mock right now since there's no backend endpoint,
    // but the UI will reflect it if we re-trigger. We'll just close it.
    if (onUpdateProfile) onUpdateProfile(editForm);
    setShowEditModal(false);
  };`;

const newHandleSaveProfile = `  const [isSaving, setIsSaving] = useState(false);
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateProfileApi(editForm);
    setIsSaving(false);
    if (res.success) {
      setProfile({ ...profile, ...editForm });
      if (onUpdateProfile) onUpdateProfile(editForm);
      setShowEditModal(false);
      // Optional: window.location.reload() to update auth context across app
      window.location.reload();
    } else {
      alert(res.message || "Failed to update profile");
    }
  };`;

content = content.replace(oldHandleSaveProfile, newHandleSaveProfile);

// Disable inputs like email
content = content.replace('onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}', 'onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))} disabled style={{ backgroundColor: "#f3f4f6", cursor: "not-allowed" }}');

fs.writeFileSync(path, content);
