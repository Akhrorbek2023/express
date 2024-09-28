import express from 'express';
import Product from '../models/product.mjs';
import authToken from '../middleware/authToken.mjs';


const router = express.Router()


// Get comments in product

router.get('/:id/comments',authToken, async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not Found' });
  
      res.json(product.comments);
    } catch (err) {
      res.status(500).json({ message: err.message , success: false});
    }
  });

// Post comment in products

router.post('/:id/comments',authToken, async (req, res) => {
    const { userId, productId, comment } = req.body;
  
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not Found' });
  
      const newComment = {
        userId,
        productId,
        comment
      };
      
      product.comments.push(newComment);
      await product.save();
  
      res.status(201).json({ message: "Comment was created", product });
    } catch (err) {
      res.status(500).json({ message: err.message , success: false});
    }
  });


  export default router
