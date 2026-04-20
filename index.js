const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({ message: 'MiniBlog API funcionandp' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Docs en http://localhost:${PORT}/api-docs`);
});