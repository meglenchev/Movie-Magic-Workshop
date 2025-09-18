import { Router } from "express";

export const homeController = Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/about', (req, res) => {
    res.render('about');
});