import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import contestRoutes from './routes/contestRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB();

// Express Middleware
app.use(cors());
app.use(express.json());

// API Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'TechQuotient Unified Academic Hub Backend API',
    timestamp: new Date().toISOString()
  });
});

// REST API Gateway Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ai', aiRoutes);

// Central Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 [Server]: TechQuotient Backend API Server running on port ${PORT}`);
});
