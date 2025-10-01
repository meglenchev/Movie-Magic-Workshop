import { User } from "../models/User.js";

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
    getLoginUser(userData) {
        let query = User.find();

        query = query.where('email').equals(userData.email);

        return query;

    }
};