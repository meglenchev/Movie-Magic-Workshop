import { Router } from 'express';
import { homeController } from './controllers/homeControllers.js';

export const routes = Router();

routes.use(homeController);