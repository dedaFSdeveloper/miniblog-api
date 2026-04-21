const request = require('supertest');
const express = require('express');
const authorsRouter = require('../src/routes/authors.route');
const errorHandler = require('../src/middlewares/error.middleware');

const app = express();
app.use(express.json());
app.use('/authors', authorsRouter);
app.use(errorHandler);

describe('Authors', () => {
test('GET /authors - lista authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
});

test('GET /authors/:id - author existente', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
});

test('GET /authors/:id - author inexistente', async () => {
    const res = await request(app).get('/authors/9999');
    expect(res.status).toBe(404);
});

test('POST /authors - crear author', async () => {
    const res = await request(app).post('/authors').send({
name: 'Test User',
email: `test${Date.now()}@test.com`,
bio: 'Bio de prueba'
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
});

test('POST /authors - sin name falla', async () => {
    const res = await request(app).post('/authors').send({ email: 'x@x.com' });
    expect(res.status).toBe(400);
});

test('DELETE /authors/:id - inexistente', async () => {
    const res = await request(app).delete('/authors/9999');
    expect(res.status).toBe(404);
});
});
afterAll(async () => {
  const pool = require('../src/db');
  await pool.end();
});