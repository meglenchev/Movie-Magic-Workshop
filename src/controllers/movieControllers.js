import { Router } from "express";
import movieServices from "../services/movieServices.js";

export const movieControler = Router();

movieControler.get('/create', (req, res) => {
    res.render('create', {pageTitle: 'Create movie'});
});

movieControler.post('/create', async (req, res) => {
    const movieData = req.body;
    await movieServices.create(movieData);
    
    res.redirect('/');
});