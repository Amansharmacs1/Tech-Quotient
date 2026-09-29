# TechQuotient — Unified AI-Powered Academic Programming Hub

**TechQuotient** is an advanced, AI-powered programming education and assessment platform uniting students and faculty into a single integrated academic environment. The platform offers real-time local code execution, intelligent AI programming assistance, automated assignment grading, and comprehensive analytics.

---

## 🚀 Key Features

### 1. Advanced Code Execution Engine
- **Multi-Language Support**: Seamlessly write and execute JavaScript, Python, Java, and C++.
- **Native Local Sandbox**: Evaluates code directly on the host machine using native compilers via Node's `child_process.execSync`—no external API keys required!
- **Robust Evaluation**: Strict stdout matching against sample and hidden test cases, returning granular compilation errors or WRONG_ANSWER states.

### 2. AI-Powered Mentorship (Gemini Integration)
- **TechBot AI Mentor**: A context-aware chatbot for students that automatically reads their current code, problem description, and compilation errors to provide targeted debugging hints (without giving away full solutions).
- **Faculty Assistant**: Automated synthesis of CS algorithmic problems, curriculum-aligned assignment generation, and predictive student insights powered by Google's latest Gemini models.

### 3. Student Portal
- **Interactive Coding Workspace**: Monaco Editor integration with language-specific syntax highlighting, intelligent boilerplate templates, and dynamic test case tables.
- **Dynamic Progress Tracking**: Real-time course progress tracking and platform statistics (Problems Solved, Enrolled Courses, Current Streak).
- **Curriculum & Notes**: Browse enrolled university courses, complete module checklists, and download professor-uploaded PDF notes.

### 4. Faculty Portal
- **Course & Assignment Management**: Full CRUD operations for computer science courses, syllabus planning, and assignment deadlines.
- **Problem Bank**: Create, modify, and manage coding challenges with custom constraints, test cases, and starter boilerplate.
- **Student Directory & Code Review**: Comprehensive student roster, performance metrics, submission audit timelines, and a built-in CodeViewer for manual grading.
- **Analytics & PDF Export**: Recharts-powered interactive charts covering difficulty analysis, course comparisons, and automated PDF report generation via `jsPDF`.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 8, React Router DOM 7, Tailwind CSS, Recharts, Lucide React, jsPDF |
| **Backend** | Node.js, Express.js (REST API Gateway), MongoDB, Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), bcrypt.js |
| **Code Execution** | Native OS child_process engine (Node, Python3, Javac, G++) |
| **AI Integration** | Google Gemini API (\`gemini-flash-lite-latest\` for free-tier high availability) |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18 or newer)
- MongoDB running locally on port 27017 (or a MongoDB Atlas URI)
- Native Compilers: \`node\`, \`python3\`, \`javac\`/\`java\`, \`g++\` (must be in your system PATH for the code runner to work).

### 1. Backend Setup

```bash
cd backend
npm install
npm run dev
```
The backend server will start on \`http://localhost:5001\`.

#### Environment Configuration (\`backend/.env\`)
Copy \`.env.example\` to \`.env\`:
```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/techquotient
JWT_SECRET=your_jwt_secret_key_here
AI_API_KEY=your_gemini_api_key_here
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
The frontend Vite server will start on \`http://localhost:5173\`.

---

## 👥 Demo Accounts

You can seed the database using \`node seed.js\` in the backend folder.
The following seeded accounts can be used to explore the platform:

| Role | Email | Password | Primary Portal |
|---|---|---|---|
| **Student** | \`ansh.goyal@chitkarauniversity.edu.in\` | \`student123\` | Student Portal |
| **Faculty** | \`prof.doe@chitkarauniversity.edu.in\` | \`faculty123\` | Faculty Portal |

---

## 📁 Repository Structure

```text
Tech-Quotient/
├── backend/
│   ├── config/               # Database connection
│   ├── controllers/          # Business logic (AI, courses, problems, etc.)
│   ├── middleware/           # JWT auth and role guards
│   ├── models/               # Mongoose Schemas (User, Course, Problem, etc.)
│   ├── routes/               # Express REST routes
│   ├── services/             # Gemini AI Service & Local Code Judge Service
│   ├── seed.js               # Database population script
│   └── server.js             # Express entrypoint
└── frontend/
    ├── src/
    │   ├── components/       # Reusable UI components (Analytics, Workspace, Students)
    │   ├── contexts/         # React Context (Auth)
    │   ├── data/             # Frontend constants
    │   ├── layout/           # Sidebar & Nav layouts for different roles
    │   ├── pages/            # View components (Student vs Faculty dashboards)
    │   ├── services/         # Axios API clients
    │   └── App.jsx           # Unified React Router configuration
    ├── index.html
    └── tailwind.config.js
```

---

## 📜 License & Academic Attribution
Developed for the **TechQuotient** Academic Project at **Chitkara University**, Department of Computer Science & Engineering.
