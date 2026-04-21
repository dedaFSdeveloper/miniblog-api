# MiniBlog API

API REST para gestionar autores y posts, desarrollada con Node.js, Express y PostgreSQL.

## Tecnologías
- Node.js + Express
- PostgreSQL
- Swagger UI
- Jest + Supertest

## Requisitos
- Node.js v18+
- PostgreSQL v18

## Instalación local

1. Clonar el repositorio
```bash
git clone https://github.com/dedaFSdeveloper/miniblog-api.git
cd miniblog-api
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

4. Crear la base de datos
```bash
psql -U postgres -c "CREATE DATABASE miniblog;"
psql -U postgres -d miniblog -f src/db/setup.sql
psql -U postgres -d miniblog -f src/db/seed.sql
```

5. Iniciar el servidor
```bash
npm run dev
```

## Variables de entorno
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog
DB_USER=postgres
DB_PASSWORD=tu_password

## Tests
```bash
npm test
```

## Documentación API
Con el servidor corriendo, entrá a:
http://localhost:8080/api-docs

