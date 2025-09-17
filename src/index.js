import express from 'express';
import handlebars from 'express-handlebars';

const app = express();
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');