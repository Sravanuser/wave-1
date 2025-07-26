import { verifyToken } from '../utils/jwt.js';
// middleware/auth.js


export const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, please login' });
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

