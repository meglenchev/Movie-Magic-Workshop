import { Router } from "express";
import movieServices from "../services/movieServices.js";
import castServices from "../services/castServices.js";

export const movieControler = Router();
// Create Page
movieControler.get('/create', (req, res) => {
    res.render('create', {pageTitle: 'Create Movie'});
});

movieControler.post('/create', async (req, res) => {
    const movieData = req.body; // req.body - Returns a parsed object with the form data
    await movieServices.create(movieData);
    
    res.redirect('/');
});
// Details Page
movieControler.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId; // req.params.movieId Returns the parameter from the URL address
    const movie = await movieServices.getOne(movieId);

    const rating = '&#x2605;'.repeat(Number(movie.rating));

    res.render('details', { movie, rating, pageTitle: movie.title });
});
// Search Page
movieControler.get('/search', async (req, res) => {
    const filter = req.query; // req.query - Returns an object with the data from the search fields

    const movies = await movieServices.getAll(filter);

    res.render('search', { movies, filter, pageTitle: 'Search Movie' });
});
// View Attach Cast Page 
movieControler.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieServices.getOne(movieId);
    const casts = await castServices.getAll();

    res.render('casts/attach', { movie, casts });
});
// Attach Cast To Movie
movieControler.post('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieServices.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});