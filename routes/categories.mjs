import express from 'express';
import Category from '../models/category.mjs';
import authToken from '../middleware/authToken.mjs';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch(err){
      res.status(500).json({message: err.message, success: false});
    }
  });


router.get('/:id', async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ message: 'Category Not Found' });
      res.json(category);
    } catch(err){
      res.status(500).json({message: err.message, success: false});
    }
  });
  

  router.post('/',authToken, async (req, res) => {
    const category = new Category({
      name: req.body.name,
      description: req.body.description
    });
    try {
      const newCategory = await category.save();
      if (!category) return res.status(400).json({ message: 'Category connat be created' });
      res.status(201).json(newCategory);
    } catch(err){
      res.status(400).json({message: err.message, success: false});
    }
  });
  

  router.put('/:id',authToken, async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            description: req.body.description
        },
        {new: true}
      );
      if (!category) return res.status(404).json({ message: 'Category Not Found' });
      res.json(category);
    } catch(err){
      res.status(400).json({message: err.message, success: false});
    }
  });
  

  router.delete('/:id',authToken, async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) return res.status(404).json({ message: 'Category Not Found' });
      res.json({ message: `The Category was deleted` });
    } catch(err){
      res.status(500).json({message: err.message, success: false});
    }
  });
  
 export default router