// utils/jwt.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET
// Function to generate JWT
export const generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};
// Function to verify JWT
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
