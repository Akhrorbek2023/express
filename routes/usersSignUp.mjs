import express from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/user.mjs';


const router = express.Router();

//  Register

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try{
       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        // Generate JWT token

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        res.status(201).json({ token, userId: user._id, username: user.username });
    } catch(err){
        res.status(500).json({ message: err.message, success: false });
    }
});

export default router
