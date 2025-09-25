import { Router } from "express";

export const castController = Router();

castController.get('/create', (req, res) => {
    res.render('casts/create');
})