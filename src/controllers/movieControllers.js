import { Router } from "express";

export const movieControler = Router();

movieControler.get('/create', (req, res) => {
    res.render('create');
});

movieControler.post('/create', (req, res) => {
    console.log(req.body);
    res.end();
});