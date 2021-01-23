const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const userEndpoint = require('./user.routes');
const authEndpoint = require('./auth.routes');

const router = express.Router();

router.use('/auth', authEndpoint);
router.use('/user', userEndpoint);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sejutacita CRUD API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Jeremy Arden",
        url: "",
        email: "ardenjeremy@gmail.com",
      },
    },
    basePath: "/api",
    tags: [{
      name: 'Auth',
      description: 'User authentication'
    }, {
      name: 'User',
      description: 'User-related CRUD methods'
    }],
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./src/routes/api.routes.js", "./src/routes/auth.routes.js", "./src/routes/user.routes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

router.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

module.exports = router;
