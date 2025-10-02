import { Router } from "express";
import userServices from "../services/userServices.js";
import { isAuth, isGuest } from "../middleware/authMiddleware.js";

export const authControler = Router();

// Registration Controler
authControler.get('/register', isGuest, (req, res) => {
    res.render('user/register', {pageTitle: 'Registration'});
});

authControler.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    if (!userData.password || !userData.rePassword || userData.password !== userData.rePassword) {
        return res.redirect('/auth/register');
    }

    await userServices.register(userData);

    res.redirect('/auth/login');
});

// Login Controler
authControler.get('/login', isGuest, (req, res) => {
    res.render('user/login', {pageTitle: 'Login'});
});

authControler.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    const token = await userServices.login(email, password);
    
    // Atach Token To Cookie
    res.cookie('auth', token);

    res.redirect('/');
});

// Logout
authControler.get('/logout', isAuth, (req, res) => {
    // Clear Auth Cookie
    res.clearCookie('auth');

    // TODO: Invalidate JWT Token
    res.redirect('/');
});