import { Router } from 'express';
import { homeController } from './controllers/homeController.js';
import { movieControler } from './controllers/movieController.js';
import { castController } from './controllers/castController.js';


export const routes = Router();

routes.use(homeController);
routes.use('/movies', movieControler);
routes.use('/casts', castController);

routes.get('/*splat', (req, res) => {
    res.render('404', {pageTitle: '404 Page not found'});
});