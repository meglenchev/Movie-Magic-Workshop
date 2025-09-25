import { Router } from "express";
import castServices from "../services/castServices.js";

export const castController = Router();

castController.get('/create', (req, res) => {
    res.render('casts/create');
})

castController.post('/create', async (req, res) => {
    const castData = req.body;
    await castServices.create(castData);

    res.redirect('/');
});