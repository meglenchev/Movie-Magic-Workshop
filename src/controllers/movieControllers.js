import { Router } from "express";

export const movieControler = Router();

movieControler.get('/create', (req, res) => {
    res.render('create');
});