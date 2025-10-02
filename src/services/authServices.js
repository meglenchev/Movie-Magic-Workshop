import { User } from "../models/User.js";

import bcrypt from 'bcrypt';
import { generateAuthToken } from "../utils/tokenUtils.js";

export default {
    // Register User
    async register(userData) {
        const userRegisterData = {
            email: userData.email, 
            password: userData.password
        }

        const user = await User.create(userRegisterData);
        const token = generateAuthToken(user);

        return token;
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

        const token = generateAuthToken(user);

        return token;
    }
};