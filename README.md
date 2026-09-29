# TechQuotient — Unified AI-Powered Academic Programming Hub

**TechQuotient** is an advanced, AI-powered programming education and assessment platform uniting students and faculty into a single integrated academic environment. The platform offers real-time code execution, intelligent AI programming assistance, automated assignment grading, and comprehensive analytics.

> [!NOTE]
> **Design & Theme Attribution**: The visual theme, UI layout, color scheme, and graphic assets used in this project are inspired by and sourced from **[CodeQuotient](https://codequotient.com)**. TechQuotient was developed with the goal of replicating the core CodeQuotient learning experience while introducing significant architectural enhancements, integrated AI mentorship, resilient offline execution, and advanced faculty management capabilities.

---

## 🌟 Key Improvements & Innovations over CodeQuotient

While replicating the core identity and experience of CodeQuotient, **TechQuotient** introduces several key architectural and functional improvements:

1. **Dual-Role Unified Architecture**: Seamless single-sign-on (SSO) JWT authentication allowing instant role transitions between Student and Faculty portals without re-authenticating.
2. **Integrated TechBot AI Mentor**: Embedded Google Gemini-powered AI coding assistant in the student Monaco editor workspace providing real-time bug fixes, Big-O complexity analysis, and hint generation.
3. **Faculty AI Suite**: Specialized AI tools for automated problem creation, assignment synthesis, student risk detection, and AI teaching assistance.
4. **Resilient Dual-Mode Data Layer**: Graceful MongoDB connection with an immediate, pre-seeded in-memory store fallback — enabling full system functionality even without a running database server.
5. **Multi-Language Sandbox Compiler**: Integrated Judge0 REST execution engine with local sandbox fallback supporting Java 17, C++ 12, Python 3.10, and JavaScript.
6. **Advanced Analytics & Automated PDF Reporting**: Interactive Recharts heatmaps, topic mastery charts, and one-click PDF report exports generated via `jsPDF`.

---

## 🌿 Git Branches & Repository Architecture

This repository unifies multiple development streams into the **`main`** branch:

| Branch Name | Section & Contents | Status |
|---|---|---|
| 🌟 **`main`** | **Complete Unified TechQuotient Project**: Integrated platform (Landing Page + Student Portal + Faculty Portal + Shared Auth + Unified Backend + Judge0 Engine + Gemini AI). | 🚀 **Active Production Target** |
| 🌐 **`front_page`** | **Landing Page & Public Portal**: High-converting landing page, platform metrics, university branding, and partner showcase. | ✅ Merged into `main` |
| 🎓 **`student-Portal`** | **Student Coding & Learning Suite**: Monaco code editor, multi-language compiler, TechBot AI Mentor, coursework, and personal analytics. | ✅ Merged into `main` |
| 👨‍🏫 **`faculty-Portal`** | **Faculty Administration & Assessment**: Course and curriculum management, coding problem authoring, assignment scheduler, student roster, and analytics. | ✅ Merged into `main` |

```text
           [ front_page ] ──────────┐
        (Landing & Showcase)        │
                                    ├──► [ main ]
         [ student-Portal ] ────────┤    (Complete Unified Platform)
      (Monaco IDE, Judge0, AI)      │
                                    │
         [ faculty-Portal ] ────────┘
       (Grading, Courses, Stats)
```

---

## 🏛️ Application Architecture & Unified Flow

```text
                         Landing Page (/)
                                │
                    Login / Register (/login, /register)
                                │
                       JWT Auth & Role Detection
                                │
               ┌─────────────────────────────────┐
               │                                 │
         Student Role                      Faculty Role
               │                                 │
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

## 🚀 Detailed Module Breakdown

### 1. Public Portal & Landing Page (`/`)
- **CodeQuotient-Inspired Interface**: Clean, modern landing page featuring track previews, university partner showcases, and technology company alignment.
- **Unified Authentication**: Password hashing via `bcryptjs`, JWT token issuance, session persistence in `localStorage`, and protected route guards.

### 2. Student Portal (`/student/*`)
- **Interactive Workspace**: Integrated Monaco Code Editor supporting **Java**, **C++**, **Python**, and **JavaScript** with runtime and memory usage reporting.
- **TechBot AI Mentor**: Real-time AI assistant for debugging guidance, algorithm explanations, and code optimization hints.
- **Course & Syllabus Viewer**: Course topic checklists, video/module progress tracking, and exercise submissions.
- **Analytics & Heatmaps**: GitHub-style activity heatmaps, difficulty distribution charts (Easy/Medium/Hard), and skill radar charts.

### 3. Faculty Portal (`/faculty/*`)
- **Curriculum & Course CRUD**: Full management of computer science courses, modules, and section assignments.
- **Problem Bank**: Authoring tools for algorithmic problems with custom constraints, sample test cases, and hidden evaluation test cases.
- **Assignment Scheduler**: Group coding problems into time-bound assignments with draft/published status management.
- **AI Teaching Assistant**:
  - **Problem Generator**: AI-synthesized algorithmic coding problems based on topic and difficulty.
  - **Assignment Generator**: Curriculum-aligned assignment builder.
  - **Student Risk Insights**: AI detection of at-risk students and recommended interventions.
- **Analytics & PDF Export**: Student performance breakdown charts with automated PDF report generation via `jsPDF`.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 8, React Router DOM 7, Tailwind CSS, Framer Motion, Recharts, Lucide React, jsPDF |
| **Backend** | Node.js, Express.js (REST API Gateway), MongoDB, Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT Bearer tokens), `bcryptjs` password hashing |
| **Code Execution** | Judge0 REST API integration + resilient local execution engine |
| **AI Integration** | Google Gemini API (`AI_API_KEY`) with fallback response generators |
| **Email Service** | EmailJS integration for system alerts and notifications |

---

## ⚙️ Getting Started & Local Setup

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn
- MongoDB (optional — the backend operates with a resilient in-memory store if MongoDB is not running)

### 1. Backend Installation & Startup

```bash
cd backend
npm install
npm start
```
*The backend API server will run at `http://localhost:5001`.*

#### Environment Setup (`backend/.env`)
```env
PORT=5001
NODE_ENV=development
JWT_SECRET=techquotient_jwt_secret_key_2026
MONGODB_URI=mongodb://127.0.0.1:27017/techquotient
AI_API_KEY=your_gemini_api_key_here
JUDGE0_URL=http://localhost:2358
```

### 2. Frontend Installation & Startup

```bash
cd frontend
npm install
npm run dev
```
*The frontend Vite server will run at `http://localhost:5173`.*

#### Environment Setup (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5001/api
```

---

## 👥 Quick Test Login Credentials

The login screen (`/login`) contains 1-click quick fill buttons for instant testing:

| Role | Email | Password | Primary Portal |
|---|---|---|---|
| **Student** | `ansh.goyal@chitkarauniversity.edu.in` | `student123` | Student Portal (`/student/dashboard`) |
| **Faculty** | `prof.doe@chitkarauniversity.edu.in` | `faculty123` | Faculty Portal (`/faculty/dashboard`) |

---

## 📁 Repository Structure

```text
Tech-Quotient/
├── README.md
├── backend/
│   ├── config/          # Database connection layer (with resilient fallback)
│   ├── controllers/     # Auth, Course, Problem, Assignment, AI controllers
│   ├── middleware/      # JWT protection & role guards
│   ├── models/          # Mongoose schema models
│   ├── routes/          # Express REST API routes
│   ├── services/        # Gemini AI & Judge0 code execution services
│   ├── seed.js          # Database seed script
│   ├── server.js        # Central Express server entrypoint
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI elements, Monaco wrapper, charts
    │   ├── contexts/    # AuthContext & role state management
    │   ├── layout/      # Student & Faculty layout navigation shells
    │   ├── pages/       # Landing, Student, and Faculty portal pages
    │   ├── services/    # Axios client configured with JWT interceptors
    │   └── App.jsx      # React Router DOM routing tree
    ├── index.html
    └── package.json
```

---

## 📜 Attribution & License
- **Theme & Branding Inspiration**: Sourced from **[CodeQuotient](https://codequotient.com)**.
- Developed for the **TechQuotient** Academic Project at **Chitkara University**, Department of Computer Science & Engineering.
