const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger');
const authorsRouter = require('./src/routes/authors.route');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/authors', authorsRouter);

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({ message: 'MiniBlog API funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Docs en http://localhost:${PORT}/api-docs`);
});