import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants.js';

export function authMiddleware(req, res, next) {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        // Is Valid User
        req.user = decodedToken; // We attach the user to the request so that they can travel with it and use it
        req.isAuthenticated = true;

        next();
    } catch (error) {
        // Invalid User
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
};

export function isAuth(req, res, next) {
    if (!req.isAuthenticated) {
        return res.redirect('/auth/login');
    }

    next();
};