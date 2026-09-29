const fs = require('fs');

const path = 'frontend/src/components/student/Profile.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace state initialization
const oldStateBlock = `  const { user } = useAuth();
  const [profile, setProfile] = useState(initialProfile);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || profile.name,
    email: profile.email,
    department: profile.department,
    institution: profile.institution,
    batch: profile.batch,
    avatar: profile.avatar
  });`;

const newStateBlock = `  const { user } = useAuth();
  const [profile, setProfile] = useState(user || initialProfile);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    institution: user?.institution || '',
    batch: user?.batch || '',
    avatar: user?.avatar || ''
  });
  
  // Sync profile when user updates
  React.useEffect(() => {
    if (user) {
      setProfile(user);
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        department: user.department || '',
        institution: user.institution || '',
        batch: user.batch || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);`;

content = content.replace(oldStateBlock, newStateBlock);

// Remove mockData badges if badges is undefined or empty
content = content.replace(
  `{profile.badges.map((b, idx) => (`,
  `{(profile.badges || []).length > 0 ? (profile.badges.map((b, idx) => (`
);
content = content.replace(
  `</div>\n        </div>\n\n        {/* Academic Profile Details */}`,
  `  )) ) : (\n              <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>\n                No badges earned yet. Keep solving problems to earn badges!\n              </div>\n            )}\n          </div>\n        </div>\n\n        {/* Academic Profile Details */}`
);

// We need to fix rank as well. Rank is globalRank in user model
content = content.replace(/profile\.rank/g, "profile.globalRank || 'N/A'");

// Total coding submissions in the UI is hardcoded:
content = content.replace(/<strong style={{ color: 'var\(--dark-heading\)' }}>482 Runs<\/strong>/, "<strong style={{ color: 'var(--dark-heading)' }}>{profile.problemsSolved || 0} Submissions</strong>");

// Also the edit form fields - wait, there is no API call to save the profile. I'll just change the UI for now.

fs.writeFileSync(path, content);
