import express from 'express';
import pool from '../db.js';

const router = express.Router();

/**
 * GET /api/posts
 * Fetch all categories with their posts
 */
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const sql = `
        SELECT 
          c.id   AS category_id,
          c.name AS category_name,
          c.position AS category_position,
          p.id   AS post_id,
          p.title   AS post_title,
          p.slug    AS post_slug,
          p.content AS post_content,
          p.position AS post_position
        FROM categories c
        LEFT JOIN posts p ON p.category_id = c.id
        ORDER BY c.position ASC, p.position ASC
      `;

      const [rows] = await connection.execute(sql);

      // Group posts by category
      const categories = {};
      rows.forEach(row => {
        const catId = row.category_id;
        if (!categories[catId]) {
          categories[catId] = {
            id: catId,
            name: row.category_name || '',
            position: row.category_position || 0,
            posts: []
          };
        }

        if (row.post_id !== null) {
          categories[catId].posts.push({
            id: row.post_id,
            title: row.post_title || '',
            slug: row.post_slug || '',
            content: row.post_content || '',
            position: row.post_position || 0
          });
        }
      });

      // Convert to array and sort
      const result = Object.values(categories).sort((a, b) => a.position - b.position);

      // Set proper content type with UTF-8
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.json(result);
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

export default router;
