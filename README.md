# TechQuotient Faculty Portal

TechQuotient is an advanced, AI-powered educational platform designed specifically for computer science faculty to manage courses, assignments, student performance, and coding problems. 

This repository contains the **Faculty Portal** interface, which transforms traditional course management into a data-driven, automated teaching experience.

## 🚀 Features

The Faculty Portal is divided into several core modules:

*   **📊 Dashboard:** A high-level overview of active courses, recent submissions, and quick actions.
*   **📚 Course Management:** Create, edit, and manage computer science courses (e.g., Data Structures, Algorithms).
*   **💻 Coding Problems:** A robust problem bank where faculty can create coding challenges with specific test cases, constraints, and sample I/O.
*   **📝 Assignment Management:** Group coding problems into structured assignments with assigned marks and difficulty levels.
*   **👥 Student & Submission Management:** Track student progress, view a live feed of code submissions, and use the built-in IDE-style CodeViewer for code reviews.
*   **📈 Analytics & Reports:** A comprehensive, Recharts-powered data suite offering deep dives into course engagement, topic-wise success rates, and student leaderboards.
*   **✨ AI Teaching Assistant:** An intelligent workspace featuring:
    *   **AI Problem & Assignment Generators:** Instantly generate coding content mapped to learning objectives.
    *   **Student Insights:** AI-driven analysis identifying at-risk topics.
    *   **Chat Assistant:** A conversational UI for brainstorming and teaching support.

## 🛠 Tech Stack

**Frontend:**
*   React.js
*   Vite
*   Tailwind CSS v3
*   React Router DOM
*   Framer Motion (Animations)
*   Recharts (Data Visualization)
*   Lucide React (Icons)

**Backend (Prepared):**
*   Node.js
*   Express
*   MongoDB (Mongoose)

## ⚙️ Getting Started

To run the project locally, you need to start both the frontend and backend servers.

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev
```
*(Runs on http://localhost:5001)*

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
*(Runs on http://localhost:5173)*

Open your browser and navigate to `http://localhost:5173` to access the portal.

## 🎨 Design System
The portal utilizes a clean, modern SaaS design with a heavy focus on white space, soft shadows, and a professional primary color scheme (`#FF8C42` orange). It is fully responsive across desktop and tablet views.
