import  yaml  from 'yamljs'

const swaggerCat = yaml.load('./shared/swaggerCategory.yaml');
const swaggerCom = yaml.load('./shared/swaggerComments.yaml');
const swaggerProd = yaml.load('./shared/swaggerProduct.yaml');
const swaggerLogin = yaml.load('./shared/swaggerLogin.yaml');
const swaggerReg = yaml.load('./shared/swaggerRegister.yaml');

const combinedPaths = {
    ...(swaggerCat.paths ),
    ...(swaggerCom.paths ),
    ...(swaggerProd.paths ),
    ...(swaggerLogin.paths ),
    ...(swaggerReg.paths ),
  };

// Combine the Swagger documents
export const combinedSwaggerDoc = {
  ...swaggerCat,
  ...swaggerCom,
  ...swaggerProd,
  ...swaggerLogin,
  ...swaggerReg,
  paths: combinedPaths
};