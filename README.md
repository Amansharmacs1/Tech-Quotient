# TechQuotient: Unified Academic Hub - Student Portal

An intelligent, modern, full-stack web platform designed to enhance programming education for students and faculty. TechQuotient provides a streamlined interface where students can manage their academic activities, track progress, access enrolled course modules, solve coding assignments in an interactive workspace, compete in coding contests, and receive AI-driven programming mentorship.

---

## 🚀 Key Features

### 1. Student Dashboard & Personalized Analytics
- **Welcome & Profile Banner**: Displays student details (**Ansh Goyal**, Roll No: `2411981092`, Batch 2024, Computer Science & Engineering, Chitkara University).
- **Performance Overview**: Quick stats tracking solved problems (**142**), overall accuracy rate (**88.5%**), global rank (**#12**), and active streak (**14 days**).
- **Coding Velocity Heatmap & Skill Matrix**: GitHub-style daily submission heatmap and difficulty distribution (Easy, Medium, Hard).

### 2. Course Details & Module Breakdown
- **Chitkara Testpad Syllabus UI**: Course code header with completion progress indicator (`94% done`).
- **Module Carousel**: Interactive step cards (`Module 1 DONE`, `Module 2 DONE`, `Module 3 In Progress`).
- **Sub-Topic Checklist**: Expandable checklist items (*CSS Display & Positioning, Tree Rotations, Exception Handlers*).

### 3. Practice & Assignment Code Workspace
- **Split-Pane Layout**:
  - **Left Pane**: Problem specifications, input/output formats, constraints, max marks, and due dates.
  - **Right Pane**: Interactive Code Editor supporting **Java (JDK 17)**, **C++ (GCC 12)**, **Python (3.10)**, and **JavaScript (Node.js)**.
- **Judge0 Execution & Submission Engine**: Real-time compilation and test case verification with runtime (ms) and memory footprint (MB) reporting.

### 4. TechBot AI Programming Mentor
- **AI Chat & Code Diagnosis**: AI assistant powered by Gemini/OpenAI integration for code error debugging, AVL tree rotations, C++ smart pointers, and complexity analysis.
- **Personalized Recommendations**: Contextual hints based on student performance history.

### 5. Competitive Coding Contests & Announcements
- **Contest Arena & Live Leaderboards**: Real-time ranking tables for speed coding sprints and hackathons.
- **Notification Hub**: Real-time updates on assignments, contest alerts, and judge notifications.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18, Vite 5, ES6+ JavaScript.
- **Styling**: Custom CSS design tokens, modern glassmorphism, responsive flex & grid layouts.
- **Icons & Fonts**: Lucide React, Inter, Raleway, Fira Code / Monospace.
- **Backend Framework**: Node.js, Express.js.
- **Database & ODM**: MongoDB, Mongoose ODM (supports dual MongoDB connection and seeded fallback mode).
- **Authentication & Security**: JSON Web Tokens (JWT Bearer Auth), bcrypt password hashing.
- **Services Integration**: Judge0 API (Code Execution), OpenAI / Gemini API (AI Mentor).

---

## 🔌 REST API Gateway Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Student / Faculty Authentication |
| `GET` | `/api/auth/profile` | Fetch Current Student Profile & Metrics |
| `GET` | `/api/courses` | Fetch Enrolled Academic Courses & Modules |
| `GET` | `/api/problems` | Fetch Coding Problems Catalog |
| `POST` | `/api/submissions/run` | Execute Code (Sample Test Cases) |
| `POST` | `/api/submissions/submit` | Submit Solution Code (Judge0 Verification) |
| `GET` | `/api/assignments` | Fetch Active Student Assignments |
| `POST` | `/api/assignments/:id/submit` | Submit Assignment Code |
| `GET` | `/api/contests` | Fetch Contests & Leaderboards |
| `POST` | `/api/contests/:id/register` | Register for Contest |
| `GET` | `/api/analytics/student` | Fetch Performance Analytics & Heatmap |
| `GET` | `/api/notifications` | Fetch Student Notifications & Alerts |
| `POST` | `/api/ai/chat` | Send Prompt to TechBot AI Mentor |

---

## ⚙️ Environment Variables & Configuration

Create a `.env` file in the `backend/` directory using `backend/.env.example` as a template:

```env
PORT=5001
MONGODB_URI=
JWT_SECRET=techquotient_jwt_secret_key_2026
AI_API_KEY=
JUDGE0_API_KEY=
JUDGE0_URL=https://judge0-ce.p.rapidapi.com
NODE_ENV=development
```

> **Note**: `MONGODB_URI` can remain blank for development. The backend automatically serves APIs via a populated repository store and connects to MongoDB seamlessly as soon as `MONGODB_URI` is provided.

---

## 💻 Local Setup & Installation

### 1. Backend API Server Setup
```bash
cd backend
npm install
npm run dev
```
The backend API server will run on `http://localhost:5001`.

### 2. Frontend React Application Setup
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` (or `http://localhost:5173`) in your browser.

---

## 📁 Directory Structure

```
Tech-Quotient/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & Environment Setup (db.js)
│   │   ├── controllers/     # API Route Handlers (auth, courses, problems, etc.)
│   │   ├── middleware/      # JWT Protection & Error Handling Middleware
│   │   ├── models/          # Mongoose Schemas (User, Course, Problem, Submission, etc.)
│   │   ├── routes/          # REST API Router Endpoints
│   │   ├── services/        # Judge0 Execution, AI Mentor, Store Repository
│   │   └── server.js        # Express Application Gateway
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React UI Components (Dashboard, Workspace, Contests, etc.)
│   │   ├── data/            # Mock & Fallback Data Sets
│   │   ├── services/        # API Client Layer (api.js)
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

**Authors & Mentors**:
- **Student**: Ansh Goyal (2411981092)
- **Mentors & Team**: Akshit Jareat, Aman Sharma, Dr. Sandeep Rana
- **Department**: Department of Computer Science and Engineering, Chitkara University (Batch 2024)
