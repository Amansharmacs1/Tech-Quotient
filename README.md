# TechQuotient: Unified Academic Hub - Student Portal

An intelligent, modern, web-based platform designed to enhance programming education for students and faculty. The Student Portal provides a streamlined interface where students can manage their academic activities, track progress, access enrolled course modules, and solve coding assignments in a split-screen interactive workspace.

---

## 🚀 Key Features

### 1. Student Dashboard
- **Welcome & Profile Banner**: Displays student details (**Ansh Goyal**, Roll No: `2411981092`, Batch 2024, Computer Science & Engineering, Chitkara University).
- **Performance Overview**: Quick stats tracking solved problems (**142**), accuracy rate (**88.5%**), and active streak (**14 days**).
- **Enrolled Courses**: Overview cards showing progress percentages (*Data Structures & Algorithms*, *Full Stack Web Development*, *Object-Oriented Programming*).

### 2. Course Details & Module Breakdown
- **Official Chitkara Testpad UI**: Course code header (`23CS002-Introduction to Web Technologies_04-09-2024`) with progress bar (`94% done`).
- **Module Cards Carousel**: Visual step cards (`1 DONE`, `2 DONE`, ..., `6 Layout using Basic CSS - 75%`).
- **Sub-Topic Checklist**: Expandable checklist items (*CSS Display and Positioning: Position, Z-index, Display, Float and Clear*).

### 3. Practice & Assignment Code Workspace
- **Split-Pane Layout**:
  - **Left Pane**: Problem & Assignment statements, input/output specifications, constraints, max marks, and due dates.
  - **Right Pane**: Interactive Code Typing Editor supporting **Java (JDK 17)**, **C++ (GCC 12)**, **Python (3.10)**, and **JavaScript (Node.js)**.
- **Code Execution Simulator**: Interactive `Run Code` testing and `Submit Assignment` confirmation with runtime (ms), memory footprint (MB), and test case verification.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18, Vite 5, ES6+ JavaScript.
- **Styling**: Vanilla CSS3, custom CSS design tokens, responsive flex & grid layouts.
- **Icons**: Lucide React.
- **Fonts**: Inter, Raleway, Fira Code / monospace.

---

## 💻 Local Setup & Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📁 Directory Structure

```
Tech-Quotient/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CourseDetailView.jsx
│   │   │   ├── CodingWorkspace.jsx
│   │   │   └── Assignments.jsx
│   │   ├── data/
│   │   │   └── mockData.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
└── README.md
```

---

**Authors & Mentors**:
- **Student**: Ansh Goyal (2411981092)
- **Mentors & Team**: Akshit Jareat, Aman Sharma, Dr. Sandeep Rana
- **Department**: Department of Computer Science and Engineering, Chitkara University (Batch 2024)
