const pool = require('../db');
const getByPostId = async (postId) => {
const result = await pool.query(`
    SELECT comments.*, authors.name AS author_name
    FROM comments
    JOIN authors ON comments.author_id = authors.id
    WHERE comments.post_id = $1
    ORDER BY comments.created_at DESC
`, [postId]);
return result.rows;
};

const create = async ({ content, author_id, post_id }) => {
const result = await pool.query(
    'INSERT INTO comments (content, author_id, post_id) VALUES ($1, $2, $3) RETURNING *',
    [content, author_id, post_id]
);
return result.rows[0];
};

module.exports = { getByPostId, create };