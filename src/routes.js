import { Router } from 'express';
import { homeController } from './controllers/homeControllers.js';
import { movieControler } from './controllers/movieControllers.js';

export const routes = Router();

routes.use(homeController);
routes.use(movieControler);