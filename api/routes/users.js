import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';

const router = express.Router();

const VALID_ROLES = ['user', 'admin'];
const VALID_FACTIONS = ['dwarfs', 'humans', 'avians', 'minotaurs'];

/**
 * POST /api/users
 * Create a new user
 */
router.post('/', async (req, res) => {
  try {
    const {
      email,
      role = 'user',
      password = null,
      oauth_provider = null,
      oauth_id = null,
      faction = null
    } = req.body;

    // Validate email
    const trimmedEmail = (email || '').trim();
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Validate role
    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Validate faction if provided
    if (faction !== null && !VALID_FACTIONS.includes(faction)) {
      return res.status(400).json({ error: 'Invalid faction' });
    }

    // Hash password if provided
    let passwordHash = null;
    if (password && password.trim() !== '') {
      passwordHash = await bcrypt.hash(password, 10);
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO users (email, password, role, faction, oauth_provider, oauth_id) VALUES (?, ?, ?, ?, ?, ?)',
        [trimmedEmail, passwordHash, role, faction, oauth_provider, oauth_id]
      );

      res.status(201).json({
        message: 'User created',
        id: result.insertId
      });
    } finally {
      await connection.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Server failure',
      message: error.message
    });
  }
});

/**
 * Helper function to validate email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default router;
