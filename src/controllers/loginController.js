import { Router } from "express";

export const loginController = Router();

loginController.get('/login', (req, res) => {
    res.render('user/login');
});