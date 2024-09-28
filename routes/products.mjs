import express from 'express';
import Product from '../models/product.mjs';
import authToken from '../middleware/authToken.mjs';
import { upload } from '../middleware/upload.mjs';

const router = express()


 //GET all product with filter
 router.get('/', async (req, res) => {
    const { name, color, price, category } = req.query;
    
    // Create filter object
    let filter = {};
  
    if (name) {
      filter.name = { $regex: name, $options: 'i' };  
    }
  
    if (color) {
      filter.color = { $regex: color, $options: 'i' };
    }
  
    if (price) {
      filter.price = price;  
    }
  
    if (category) {
      filter.category = category;  
    }
  
    try {
      const products = await Product.find(filter);
      if (!products) return res.status(404).json({ message: 'Product Not Found' });
      res.json(products);
    } catch(err){
      res.status(500).json({message: err.message, success: false});
    }
  });
  
  
  // GET single product by id
  router.get('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Products Not Found' });
      res.json(product);
    } catch(err){
      res.status(500).json({message: err.message, success: false});
    }
  });
// GET pagination
  router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const products = await Product.find()
      // .populate('userId')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Product.countDocuments();
      res.json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (err) {
      res.status(500).json({ message: err.message, succes: false });
    }
  });
  
  // POST create new product
  router.post('/',authToken,upload.array('prodImages'), async (req, res) => {
    const prodImages = req.file ? req.file.path : ''
    const product = new Product({
      name: req.body.name,
      color: req.body.color,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      image : prodImages
    });
    
    try {
      const newProduct = await product.save();
      if(!newProduct) return res.status(400).json({message: "Product was not created"})
      res.status(201).json(newProduct);
    } catch(err){
      res.status(400).json({message: err.message, success: false});
    }
  });
  
  // PUT/PATCH update product by id
  router.put('/:id', authToken, async (req, res) => {
    const id = req.params.id
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) return res.status(404).json({ message: 'Product Not Found' });
      res.json(product);
    } catch(err){
      res.status(400).json({message: err.message, success: false});
    }
  });
  
  // DELETE product by id
  router.delete('/:id', authToken, async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product Not Found' });
      res.json({ message: 'Product deleted' });
    } catch(err){
      res.status(500).json({message: err.message, success: false});
    }
  });
  
  export default router