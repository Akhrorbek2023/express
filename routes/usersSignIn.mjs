import express from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/user.mjs';

const router = express.Router();

// Login

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({ token, userId: user._id, username: user.username });
    } catch(err){
        res.status(500).json({ message: err.message, success: false });
    }
});

export default router