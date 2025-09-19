import { Router } from "express";

export const movieControler = Router();

movieControler.get('/create', (req, res) => {
    res.render('create', {pageTitle: 'Create movie'});
});

movieControler.post('/create', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});