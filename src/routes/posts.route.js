const express = require('express');
const router = express.Router();
const service = require('../services/posts.service');

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Listar todos los posts
 *     responses:
 *       200:
 *         description: Lista de posts
 */
router.get('/', async (req, res, next) => {
  try {
    const posts = await service.getAll();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /posts/author/{authorId}:
 *   get:
 *     summary: Obtener posts por author con detalle del author
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Posts del author
 *       404:
 *         description: No se encontraron posts
 */
router.get('/author/:authorId', async (req, res, next) => {
  try {
    const posts = await service.getByAuthorId(req.params.authorId);
    if (!posts.length) return res.status(404).json({ error: 'No se encontraron posts' });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtener post por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post no encontrado
 */
router.get('/:id', async (req, res, next) => {
  try {
    const post = await service.getById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear un post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author_id:
 *                 type: integer
 *               published:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Post creado
 *       400:
 *         description: Datos inválidos
 */
router.post('/', async (req, res, next) => {
  try {
    const { title, content, author_id, published } = req.body;
    if (!title || !content || !author_id) {
      return res.status(400).json({ error: 'title, content y author_id son requeridos' });
    }
    const post = await service.create({ title, content, author_id, published });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Actualizar un post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author_id:
 *                 type: integer
 *               published:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Post actualizado
 *       404:
 *         description: Post no encontrado
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { title, content, author_id, published } = req.body;
    if (!title || !content || !author_id) {
      return res.status(400).json({ error: 'title, content y author_id son requeridos' });
    }
    const post = await service.update(req.params.id, { title, content, author_id, published });
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Eliminar un post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Post eliminado
 *       404:
 *         description: Post no encontrado
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await service.remove(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;