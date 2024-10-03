import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My e-commerce api',
      version: '1.0.0',
      description: 'E-commerce api  and documentations',
    },
  
  },
  apis: [join(__dirname, '../../','routes' , 'comments.mjs')],
};
console.log(join(__dirname, '../../','routes' , '*.mjs'))
const spec = swaggerJSDoc(swaggerOptions);

export { spec, swaggerUi };
