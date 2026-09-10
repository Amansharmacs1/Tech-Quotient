import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route Imports
import courseRoutes from './routes/courseRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/courses', courseRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);

// Routes will go here...
app.get('/', (req, res) => {
  res.send('TechQuotient API is running');
});

// Basic Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});