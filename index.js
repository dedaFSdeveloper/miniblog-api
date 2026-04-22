const dotenv = require('dotenv');
dotenv.config();
const commentsRouter = require('./src/routes/comments.route');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger');
const authorsRouter = require('./src/routes/authors.route');
const postsRouter = require('./src/routes/posts.route');
const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({ message: 'MiniBlog API funcionando' });
});

const errorHandler = require('./src/middlewares/error.middleware');
app.use(errorHandler);

app.get('/api-docs.json', (req, res) => {
  res.json(swaggerSpec);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Docs en http://localhost:${PORT}/api-docs`);
});