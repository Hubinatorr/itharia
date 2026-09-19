import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ charset: 'utf-8' }));
app.use(express.json({ charset: 'utf-8' }));

// Routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Server failure',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Itharia API running on http://localhost:${PORT}`);
});
