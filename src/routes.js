import { Router } from 'express';
import { homeController } from './controllers/homeControllers.js';
import { movieControler } from './controllers/movieControllers.js';

export const routes = Router();

routes.use(homeController);
routes.use('/movies', movieControler);
routes.get('/*splat', (req, res) => {
    res.render('404', {pageTitle: '404 Page not found'});
});