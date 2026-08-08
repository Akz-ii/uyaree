import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/uyaree';

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`[MongoDB] Connected successfully to ${MONGO_URI}`);
  })
  .catch((err) => {
    console.log(`[MongoDB] Warning: Local MongoDB daemon not detected at ${MONGO_URI}. Server operating in API mode.`);
  });

app.listen(PORT, () => {
  console.log(`[UYAREE Express Backend] Running on http://localhost:${PORT}`);
});
