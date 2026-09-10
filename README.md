# TechQuotient — Unified AI-Powered Academic Programming Hub

**TechQuotient** is an advanced, AI-powered programming education and assessment platform uniting students and faculty into a single integrated academic environment. The platform offers real-time code execution, intelligent AI programming assistance, automated assignment grading, and comprehensive analytics.

---

## 🌿 Git Branches & Repository Architecture

This repository contains the complete unified codebase on the **`main`** branch, combining the three dedicated development sub-branches into one functional full-stack application:

| Branch Name | Section & Contents | Status |
|---|---|---|
| 🌟 **`main`** / **`Main`** | **Complete Unified TechQuotient Project**: Contains the entire integrated platform (Landing Page + Student Portal + Faculty Portal + Shared Auth + Unified Backend + Judge0 Engine + Gemini AI). | 🚀 **Active Production Target** |
| 🌐 **`front_page`** | **Landing Page & Public Portal**: High-converting landing page, platform metrics, university branding, and 20+ corporate partner company showcase. | ✅ **Merged into `main`** (React component at `frontend/src/pages/LandingPage.jsx`) |
| 🎓 **`student-Portal`** | **Student Coding & Learning Suite**: Monaco code editor, multi-language compiler (Judge0), TechBot AI Mentor, enrolled courses, coursework submissions, contests, and personal analytics. | ✅ **Merged into `main`** (Accessible at `/student/*`) |
| 👨‍🏫 **`faculty-Portal`** | **Faculty Administration & Assessment**: Course and curriculum management, coding problem authoring, assignment publishing, student roster, code submission grading, and Recharts analytics. | ✅ **Merged into `main`** (Accessible at `/faculty/*`) |

### Merged Branch Diagram
```text
           [ front_page ] ──────────┐
        (Landing & Showcase)        │
                                    ├──► [ main / Main ]
         [ student-Portal ] ────────┤    (Complete Unified Platform)
      (Monaco IDE, Judge0, AI)      │
                                    │
         [ faculty-Portal ] ────────┘
       (Grading, Courses, Stats)
```

---

## 🏛️ Application Architecture & Unified Flow

```
                         Landing Page (/)
                                ↓
                    Login / Register (/login, /register)
                                ↓
                       JWT Auth & Role Detection
                                ↓
               ┌─────────────────────────────────┐
               │                                 │
         Student Role                      Faculty Role
               ↓                                 ↓
      Student Portal (/student/*)       Faculty Portal (/faculty/*)
      ├── Student Dashboard             ├── Faculty Dashboard
      ├── Enrolled Courses & Modules    ├── Course Management (CRUD)
      ├── Coding Practice (Monaco)      ├── Coding Problem Bank (CRUD)
      ├── Assignment Submission         ├── Assignment Scheduler (CRUD)
      ├── Speed Coding Contests         ├── Student Records & Submissions
      ├── TechBot AI Coding Mentor      ├── Analytics Suite & PDF Reports
      ├── Performance Analytics         ├── AI Teaching Assistant (Gemini)
      ├── Profile & Badges              ├── Announcements Hub
      └── Notifications & Alerts        └── Portal Settings
```

---

## 🚀 Key Modules & Feature Highlights

### 1. Landing Page & Central Authentication
- **Ported Experience**: Complete, high-fidelity responsive landing page (`/`) showcasing curriculum tracks, partner institutes, 20+ hiring tech companies, and recent updates.
- **Unified Authentication**: Single JWT-backed auth flow with bcrypt password hashing, role detection (`student` vs `faculty`), session persistence in localStorage, and protected route guards.
- **Fast Evaluator Switcher**: Instant role toggle in the navigation bar enabling seamless transitions between Student and Faculty portal views.

### 2. Student Portal (`/student/*`)
- **Dashboard**: Personalized welcome banner for student **Ansh Goyal** (Roll No: `2411981092`, CSE, Chitkara University), tracking problems solved (142), accuracy (88.5%), streak (14 days), rank (#12), and weekly activity.
- **Courses & Syllabus**: Academic syllabus for enrolled subjects (`CSE201`, `CSE302`, `CSE204`) with interactive module carousels, completion percentages, and topic checklists.
- **Coding Practice Workspace**: Monaco Code Editor supporting **Java (JDK 17)**, **C++ (GCC 12)**, **Python (3.10)**, and **JavaScript (Node.js)** with live compilation verdicts, execution runtime (ms), and memory (MB) reporting.
- **Assignments**: Problem statements, constraints, deadlines, and real-time code submission.
- **Contests Arena**: Live and upcoming speed-coding challenges with dynamic leaderboards.
- **TechBot AI Mentor**: Real-time AI programming mentor providing guidance on AVL tree rotations, pointer safety, Big-O complexity, and bug debugging.
- **Performance Analytics**: GitHub-style activity heatmaps, topic mastery charts, and difficulty breakdowns (Easy, Medium, Hard).
- **Profile & Badges**: Student identity cards with earned badges (*Array Master*, *Streak Warrior*, *Java Specialist*, *Contest Top 5%*).
- **Notifications**: Central alert center for assignments, contest schedules, and evaluation reports.

### 3. Faculty Portal (`/faculty/*`)
- **Dashboard**: High-level overview of active courses, total enrolled students, assignment statuses, and live submission feeds.
- **Course Management**: Full CRUD operations for computer science courses, section planning, and semester details.
- **Problem Bank**: Create, modify, and manage coding challenges with custom constraints, test cases (sample & hidden), and starter boilerplate.
- **Assignment Management**: Group problems into structured assignments with target deadlines, maximum marks, draft/published statuses, and student submission tracking.
- **Student Directory & Live Submissions**: Comprehensive student roster, student performance metrics, submission audit timelines, and built-in CodeViewer for code reviews.
- **Analytics & PDF Export**: Recharts-powered interactive charts covering difficulty analysis, course comparisons, and automated PDF report generation via `jsPDF`.
- **AI Teaching Assistant**:
  - **Problem Generator**: Automated synthesis of CS algorithmic problems based on topic, difficulty, and concept.
  - **Assignment Generator**: Curriculum-aligned assignment builder with learning objectives.
  - **Student Insights**: Identifies at-risk topics and recommends targeted interventions.
  - **Conversational Assistant**: AI assistant for course management and grading rubrics.
- **Announcements**: Publish announcements directly to the student notification feed.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 8, React Router DOM 7, Tailwind CSS, Framer Motion, Recharts, Lucide React, jsPDF, jsPDF-AutoTable |
| **Backend** | Node.js, Express.js (REST API Gateway), MongoDB, Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT Bearer tokens), bcrypt.js password hashing |
| **Code Execution** | Judge0 REST API integration + resilient local execution engine |
| **AI Integration** | Google Gemini API (`AI_API_KEY`) + intelligent assistant mentor fallbacks |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn
- MongoDB (optional; application operates with resilient in-memory store if MONGODB_URI is not set)

### 1. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend server will start on `http://localhost:5001`.

#### Environment Configuration (`backend/.env`)
Copy `.env.example` to `.env`:
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=
JWT_SECRET=techquotient_jwt_secret_key_2026
AI_API_KEY=
JUDGE0_API_KEY=
JUDGE0_URL=https://judge0-ce.p.rapidapi.com
```

> **Note on MongoDB Atlas**: To connect to MongoDB Atlas, add your connection string to `MONGODB_URI`:
> `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/techquotient?retryWrites=true&w=majority`
> If left blank, the application automatically operates in resilient fallback mode with complete seeded data.

#### Running Backend Tests
```bash
cd backend
npm test
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend Vite server will start on `http://localhost:5173` (or `http://localhost:3000`).

---

## 👥 Demo Accounts (1-Click Login)

The login screen (`/login`) includes quick-fill buttons for instant testing:

| Role | Email | Password | Primary Portal |
|---|---|---|---|
| **Student** | `ansh.goyal@chitkarauniversity.edu.in` | `student123` | Student Portal (`/student/dashboard`) |
| **Faculty** | `prof.doe@chitkarauniversity.edu.in` | `faculty123` | Faculty Portal (`/faculty/dashboard`) |

---

## 📁 Repository Structure

```text
Tech-Quotient/
├── .gitignore
├── README.md
├── backend/
│   ├── config/
│   │   └── db.js                 # Unified MongoDB connection layer
│   ├── controllers/
│   │   ├── aiController.js       # Student TechBot mentor & faculty generators
│   │   ├── analyticsController.js# Student & faculty metrics
│   │   ├── assignmentController.js# Assignment CRUD & student submit
│   │   ├── authController.js     # JWT login, register, profile
│   │   ├── contestController.js  # Contest listing & registration
│   │   ├── courseController.js   # Course CRUD & syllabus view
│   │   ├── notificationController.js# Notifications & announcements
│   │   ├── problemController.js  # Coding problem bank & practice
│   │   ├── studentController.js  # Faculty student directory & details
│   │   └── submissionController.js# Live code runner, submit & reviews
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT protect & role guards
│   │   └── errorHandler.js       # Central error handling
│   ├── models/
│   │   ├── Assignment.js
│   │   ├── Contest.js
│   │   ├── Course.js
│   │   ├── Notification.js
│   │   ├── Problem.js
│   │   ├── Student.js
│   │   ├── Submission.js
│   │   └── User.js
│   ├── routes/                   # Clean Express REST routes
│   ├── services/
│   │   ├── aiService.js          # Gemini AI + resilient assistant engine
│   │   ├── judgeService.js       # Judge0 + local sandbox runner
│   │   └── store.js              # In-memory store with seeded data
│   ├── utils/
│   │   └── apiResponse.js        # Standardized API response format
│   ├── seed.js                   # Database seeder
│   ├── test_api.js               # Automated 16-endpoint API test suite
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Central Express entrypoint
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── ai/               # Faculty AI generator UI components
    │   │   ├── analytics/        # Faculty Analytics charts & modals
    │   │   ├── assignments/      # Faculty Assignment management
    │   │   ├── course/           # Faculty Course management
    │   │   ├── problems/         # Faculty Problem authoring & testcase editors
    │   │   ├── student/          # Monaco editor, coding workspace, syllabus
    │   │   └── students/         # Student directory & CodeViewer
    │   ├── contexts/
    │   │   └── AuthContext.jsx   # Central auth state, JWT & role switcher
    │   ├── layout/
    │   │   ├── FacultyLayout.jsx # Faculty layout shell & sidebar
    │   │   ├── FacultySidebar.jsx
    │   │   ├── Navbar.jsx        # Top bar with role toggle & notifications
    │   │   ├── StudentLayout.jsx # Student layout shell & sidebar
    │   │   └── StudentSidebar.jsx
    │   ├── pages/
    │   │   ├── LandingPage.jsx   # Ported landing page from front_page
    │   │   ├── Auth/             # Login & Register with role toggle
    │   │   ├── Student/          # Student portal pages
    │   │   └── Faculty/          # Faculty portal pages
    │   ├── services/             # Axios client with JWT interceptor
    │   ├── data/                 # Sample datasets & mock stores
    │   ├── App.jsx               # Unified React Router DOM configuration
    │   ├── index.css             # Tailwind CSS + custom student design tokens
    │   └── main.jsx
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

---

## 📜 License & Academic Attribution
Developed for the **TechQuotient** Academic Project at **Chitkara University**, Department of Computer Science & Engineering.
