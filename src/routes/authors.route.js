const express = require('express');
const router = express.Router();
const service = require('../services/authors.service');

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Listar todos los authors
 *     responses:
 *       200:
 *         description: Lista de authors
 */
router.get('/', async (req, res, next) => {
try {
    const authors = await service.getAll();
    res.json(authors);
} catch (err) {
    next(err);
}
});

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Obtener author por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Author encontrado
 *       404:
 *         description: Author no encontrado
 */
router.get('/:id', async (req, res, next) => {
try {
    const author = await service.getById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author no encontrado' });
    res.json(author);
} catch (err) {
    next(err);
}
});

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Crear un author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author creado
 *       400:
 *         description: Datos inválidos
 */
router.post('/', async (req, res, next) => {
try {
    const { name, email, bio } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name y email son requeridos' });
    const author = await service.create({ name, email, bio });
    res.status(201).json(author);
} catch (err) {
    next(err);
}
});

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Actualizar un author
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author actualizado
 *       404:
 *         description: Author no encontrado
 */
router.put('/:id', async (req, res, next) => {
try {
    const { name, email, bio } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name y email son requeridos' });
    const author = await service.update(req.params.id, { name, email, bio });
    if (!author) return res.status(404).json({ error: 'Author no encontrado' });
    res.json(author);
} catch (err) {
    next(err);
}
});

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Eliminar un author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Author eliminado
 *       404:
 *         description: Author no encontrado
 */
router.delete('/:id', async (req, res, next) => {
try {
    const author = await service.remove(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author no encontrado' });
    res.status(204).send();
} catch (err) {
    next(err);
}
});

module.exports = router;