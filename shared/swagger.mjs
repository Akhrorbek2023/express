import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My e-commerce api',
      version: '1.0.0',
      description: 'E-commerce api  and documentations',
    },
  
  },
  apis: ['./routes/*.mjs'], 
};

const spec = swaggerJSDoc(swaggerOptions);

export { spec, swaggerUi };
