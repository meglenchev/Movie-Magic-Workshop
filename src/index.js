import express from 'express';
import handlebars from 'express-handlebars';
import { routes } from './routes.js';

// Setup Express Server
const app = express();

// Setup Handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs', // We specify what the template extension should be.
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Setup Static Middleware
app.use(express.static('src/public')) // Specify the location of static files for the project

// Routs
app.use(routes); // Global controller, you are responsible for all routes

// Start Server
app.listen(5000, () => console.log('Server is listening on http://localehost:5000...'))