import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
import User from '../models/authentication.schema.js';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'user' // Default role
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken({ id: user._id, role: user.role });

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: true, // ⚠️ Requires HTTPS
        //     sameSite: 'Strict',
        //     maxAge: 60 * 60 * 1000
        // });

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token: token
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const VerifyUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

