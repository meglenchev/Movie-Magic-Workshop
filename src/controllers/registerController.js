import { Router } from "express";

export const registerControler = Router();

registerControler.get('/register', (req, res) => {
    res.render('user/register');
});

registerControler.post('/register', (req, res) => {
    const userData = req.body;

    if (!userData.password || !userData.rePassword || userData.password !== userData.rePassword) {
        return res.redirect('/user/register');
    }

    res.redirect('/');
});