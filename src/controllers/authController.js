import { Router } from "express";
import userServices from "../services/userServices.js";

export const authControler = Router();

// Registration Controler
authControler.get('/register', (req, res) => {
    res.render('user/register', {pageTitle: 'Registration'});
});

authControler.post('/register', async (req, res) => {
    const userData = req.body;

    if (!userData.password || !userData.rePassword || userData.password !== userData.rePassword) {
        return res.redirect('/user/register');
    }

    await userServices.register(userData);

    res.redirect('/user/login');
});

// Login Controler
authControler.get('/login', (req, res) => {
    res.render('user/login', {pageTitle: 'Login'});
});

authControler.post('/login', async (req, res) => {
    const userData = req.body;

    if (!userData.email || !userData.password) {
       return res.render('user/login');
    }

    const user = await userServices.getLoginUser(userData);

    res.redirect('/');
});