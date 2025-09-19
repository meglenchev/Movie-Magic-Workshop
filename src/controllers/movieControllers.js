import { Router } from "express";
import movieServices from "../services/movieServices.js";

export const movieControler = Router();
// Create Page
movieControler.get('/create', (req, res) => {
    res.render('create', {pageTitle: 'Create Movie'});
});

movieControler.post('/create', async (req, res) => {
    const movieData = req.body;
    await movieServices.create(movieData);
    
    res.redirect('/');
});
// Details Page
movieControler.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieServices.getOne(movieId);

    const rating = '&#x2605;'.repeat(Number(movie.rating));

    res.render('details', { movie, rating, pageTitle: movie.title });
});
// Search Page
movieControler.get('/search', (req, res) => {
    const movies = movieServices.getAll();
    res.render('search', { movies, pageTitle: 'Search Movie' });
});