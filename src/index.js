import express from 'express'; // npm install express 
import handlebars from 'express-handlebars'; // npm install express-handlebars
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { routes } from './routes.js'; // Global Routs controller, you are responsible for all routes

// Setup Express Server
const app = express();

// Setup Database
const url = 'mongodb://localhost:27017';

try {
    await mongoose.connect(url, {
        dbName: 'movie-magic',
    });

    console.log('Successfully conntected to MDB')
} catch(err) {
    console.log(`Cannot connect to DB ${err.message}`);
}

// Setup Handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs', // We specify what the template extension should be.
    runtimeOptions: { // General Fix For Own Property Problem
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views'); // We indicate where the folder with the templates is located

// Setup Static Middleware
app.use(express.static('src/public')); // Specify the location of static files for the project

// Middleware that will Parse Form Data from request
app.use(express.urlencoded());

// Middleware Cookie Parser
app.use(cookieParser());

// Routs
app.use(routes); // Calling The Global Routs controller

// Start Server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'))