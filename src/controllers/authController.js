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
        return res.redirect('/auth/register');
    }

    await userServices.register(userData);

    res.redirect('/auth/login');
});

// Login Controler
authControler.get('/login', (req, res) => {
    res.render('user/login', {pageTitle: 'Login'});
});

authControler.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await userServices.login(email, password);
    
    // Atach Token To Cookie
    res.cookie('auth', token);
    
    res.redirect('/');
});