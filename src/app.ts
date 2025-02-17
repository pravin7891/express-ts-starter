import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import authRoutes from './routes/authRoutes';
import rbacRouter from './routes/rbacRoutes';
import errorHandler from "./middlewares/ErrorMiddleware"; // Adjust path as needed
import logger, { requestLogger, errorLogger } from "./utils/Logger";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// Middleware for parsing form-data (but NOT files)
app.use(express.urlencoded({ extended: true }));
//Logger
app.use(requestLogger);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

//Only admin routes
app.use('/api/rbac', rbacRouter);

app.use('/api/posts', postRoutes);

app.use(errorLogger);
app.use(errorHandler);
export default app;