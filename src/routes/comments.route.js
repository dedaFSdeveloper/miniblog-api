const express = require('express');
const router = express.Router();
const service = require('../services/comments.service');

/**
 * @swagger
 * /comments/post/{postId}:
 *   get:
 *     summary: Listar comentarios de un post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *       404:
 *         description: No se encontraron comentarios
 */
router.get('/post/:postId', async (req, res, next) => {
try {
    const comments = await service.getByPostId(req.params.postId);
    if (!comments.length) return res.status(404).json({ error: 'No se encontraron comentarios' });
    res.json(comments);
} catch (err) {
    next(err);
}
});

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Crear un comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               author_id:
 *                 type: integer
 *               post_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comentario creado
 *       400:
 *         description: Datos inválidos
 */
router.post('/', async (req, res, next) => {
try {
    const { content, author_id, post_id } = req.body;
    if (!content || !author_id || !post_id) {
return res.status(400).json({ error: 'content, author_id y post_id son requeridos' });
    }
    const comment = await service.create({ content, author_id, post_id });
    res.status(201).json(comment);
} catch (err) {
    next(err);
}
});

module.exports = router;