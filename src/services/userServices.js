import { User } from "../models/User.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from "../config/constants.js";

export default {
    // Register User
    async register(userData) {
        const userRegisterData = {
            email: userData.email, 
            password: userData.password
        }

        return User.create(userRegisterData);
    },
    // User Login
    async login(email, password) {
        const user = await User.findOne({email});

        // Validate User
        if (!user) {
            throw new Error('Invalid user or password!');
        }

        // Validate Password
        const isValid = await bcrypt.compare(password, user.password);
        
        if (!isValid) {
            throw new Error('Invalid user or password!');
        }

        // Create Token
        const payload = {
            id: user.id, 
            email: user.email
        };

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});

        return token;
    }
};