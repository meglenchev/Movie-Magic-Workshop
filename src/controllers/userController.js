import { Router } from "express";

export const userControler = Router();

userControler.get('/register', (req, res) => {
    res.render('user/register');
});

userControler.post('/register', (req, res) => {
    const userData = req.body;

    if (!userData.password || !userData.rePassword || userData.password !== userData.rePassword) {
        return res.redirect('/user/register');
    }

    res.redirect('/');
});

userControler.get('/login', (req, res) => {
    res.render('user/login');
});