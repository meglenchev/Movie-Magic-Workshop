import { Router } from "express";

export const movieControler = Router();

movieControler.get('/movie/create', (req, res) => {
    res.render('create');
});