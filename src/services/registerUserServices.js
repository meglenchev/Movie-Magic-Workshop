import { User } from "../models/User.js";

export default {
    // Register User
    register(userData) {
        return User.create(userData);
    }
};