const swaggerJsdoc = require('swagger-jsdoc');

const options = {
definition: {
    openapi: '3.0.0',
    info: {
title: 'MiniBlog API',
version: '1.0.0',
description: 'API REST para gestionar authors y posts',
    },
    servers: [
{
        url: 'http://localhost:8080',
},
    ],
},
apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);