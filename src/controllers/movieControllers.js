import { Router } from "express";
import movieServices from "../services/movieServices.js";

export const movieControler = Router();

movieControler.get('/create', (req, res) => {
    res.render('create', {pageTitle: 'Create movie'});
});

movieControler.post('/create', (req, res) => {
    const movieData = req.body;
    movieServices.create(movieData);
    res.end;
    res.redirect('/');
});