import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'


import { spec, swaggerUi } from './shared/swagger.mjs';
import categories from './routes/categories.mjs'
import products from './routes/products.mjs'
import login from './routes/usersSignIn.mjs'
import register from './routes/usersSignUp.mjs'
import comments from './routes/comments.mjs'
import { combinedSwaggerDoc } from './shared/swaggerDoc.mjs';



const app = express()
app.use(express.json())
app.use(express.static('uploads'))



mongoose.connect('mongodb://localhost/test')
.then(() => {
    console.log('Connection is successfull')
})
.catch((err) => {
    console.error(`Problem with MongoDB`, err)
})

app.use('/api/products', products);
app.use('/api/categories', categories);
app.use('/api/product', comments);
app.use('/api/login', login);
app.use('/api/register', register);


// swagger route
app.use('/api/expressApi-docs', swaggerUi.serve, swaggerUi.setup(combinedSwaggerDoc));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




