const swaggerAutogen = require("swagger-autogen")();

const config = {
  definition: {
    openapi: "3.1.0",
    swagger: "2.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = [
  "./Controllers/AuthController.js",
  "./Controllers/UserController.js",
];

swaggerAutogen(outputFile, endpointsFiles, config).then(async () => {
  await import("./index.js");
});
