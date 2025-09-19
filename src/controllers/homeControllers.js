import { Router } from "express";
import movieServices from "../services/movieServices.js";

export const homeController = Router();

homeController.get('/', (req, res) => {
    const movies = movieServices.getAll();

    console.log(movies);

    res.render('home');
});

homeController.get('/about', (req, res) => {
    res.render('about', {pageTitle: 'About Us'});
});