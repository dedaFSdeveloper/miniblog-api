const request = require('supertest');
const express = require('express');
const postsRouter = require('../src/routes/posts.route');
const errorHandler = require('../src/middlewares/error.middleware');

const app = express();
app.use(express.json());
app.use('/posts', postsRouter);
app.use(errorHandler);

describe('Posts', () => {
test('GET /posts - lista posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
});

test('GET /posts/:id - post existente', async () => {
    const res = await request(app).get('/posts/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
});

test('GET /posts/:id - post inexistente', async () => {
    const res = await request(app).get('/posts/9999');
    expect(res.status).toBe(404);
});

test('POST /posts - crear post', async () => {
    const res = await request(app).post('/posts').send({
title: 'Post de prueba',
content: 'Contenido de prueba',
author_id: 1,
published: false
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
});

test('POST /posts - sin title falla', async () => {
    const res = await request(app).post('/posts').send({ content: 'x', author_id: 1 });
    expect(res.status).toBe(400);
});

test('DELETE /posts/:id - inexistente', async () => {
    const res = await request(app).delete('/posts/9999');
    expect(res.status).toBe(404);
});
});

afterAll(async () => {
const pool = require('../src/db');
await pool.end();
});