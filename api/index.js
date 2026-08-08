import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRoutes from '../server/routes/api.js';

const app = express();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/uyaree';

app.use(cors());
app.use(express.json());

// Bind API Routes to Vercel Serverless Function entry point
app.use('/api', apiRoutes);

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`[MongoDB] Connected successfully to Vercel DB`);
  })
  .catch((err) => {
    console.log(`[MongoDB] Warning: MongoDB daemon not detected. Operating in local mock mode.`);
  });

export default app;
