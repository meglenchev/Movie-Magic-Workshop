import { User } from "../models/User.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'f4ca9c40b0b168fbd69acc9106065df113b9291621f1282a0f11164a118c5dee';

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