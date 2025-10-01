import { Router } from "express";
import bcrypt from 'bcrypt';
import registerUserServices from "../services/registerUserServices.js";

export const userControler = Router();

userControler.get('/register', (req, res) => {
    res.render('user/register');
});

userControler.post('/register', async (req, res) => {
    const userData = req.body;

    if (!userData.password || !userData.rePassword || userData.password !== userData.rePassword) {
        return res.redirect('/user/register');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(userData.password, salt);

    const userRegisterData = {
        email: userData.email, 
        password: hash
    }

    await registerUserServices.register(userRegisterData);

    res.redirect('/');
});

userControler.get('/login', (req, res) => {
    res.render('user/login');
});