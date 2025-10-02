import { Router } from "express";
import movieServices from "../services/movieServices.js";
import castServices from "../services/castServices.js";
import { isAuth } from "../middleware/authMiddleware.js";

export const movieControler = Router();
// Create Page
movieControler.get('/create', isAuth, (req, res) => {
    res.render('movies/create', {pageTitle: 'Create Movie'});
});

movieControler.post('/create', isAuth, async (req, res) => {
    const movieData = req.body; // req.body - Returns a parsed object with the form data
    const creatorId = req.user.id; // We get the ID from the middleware "isAuth"
    await movieServices.create(movieData, creatorId);
    
    res.redirect('/');
});
// Details Page
movieControler.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId; // req.params.movieId Returns the parameter from the URL address
    //const movie = await movieServices.getOne(movieId);
    //const movieCast = await castServices.getAll({includes: movie.casts});
    const movie = await movieServices.getOne(movieId).populate('casts');

    const rating = '&#x2605;'.repeat(Number(movie.rating));

    // const isCreator = req.user?.id && movie.creator == req.user.id; // comparing ( different types ) objectID and creator Id
    const isCreator = movie.creator && movie.creator.equals(req.user?.id); //Built-in method (equals) for comparing ( different types ) objectID

    res.render('movies/details', { movie, rating, isCreator, pageTitle: movie.title });
});
// Search Page
movieControler.get('/search', async (req, res) => {
    const filter = req.query; // req.query - Returns an object with the data from the search fields

    const movies = await movieServices.getAll(filter);

    res.render('search', { movies, filter, pageTitle: 'Search Movie' });
});
// Attach Cast To Movie
movieControler.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    
    const movie = movieServices.getOne(movieId);
    
    if (!movie.creator?.equals(req.user.id)) {
        return res.redirect('/');
    }

    await movieServices.delete(movieId);

    res.redirect('/');
});
// View Attach Cast Page 
movieControler.get('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieServices.getOne(movieId);
    const casts = await castServices.getAll({excludes: movie.casts});

    res.render('casts/attach', { movie, casts });
});
// Attach Cast To Movie
movieControler.post('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieServices.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});