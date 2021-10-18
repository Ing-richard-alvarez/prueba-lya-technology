import express from 'express';
const app = express();

import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

//Swagger Documentation
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title:"Api Document",
        description: "Api Documentation For User Module",
        servers: ["http://127.0.0.1:3001/api/v1"]
      }
    },
    basePath: "/",
    apis: ["src/routes/users.js","src/routes/authorization.js"]
}
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/",swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;