import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new Schema({
    email: String,
    password: String
});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10);
});

export const User = model('User', userSchema, 'users');