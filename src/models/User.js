import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String, 
        required: true,
    }
});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10);
});

export const User = model('User', userSchema, 'users');