import express from 'express';
import handlebars from 'express-handlebars';

// Setup Express Server
const app = express();

// Setup Handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Setup Static Middleware
app.use(express.static('src/public'))

// Routs
app.get('/', (req, res) => {
    res.render('home', { layout: false})
})

// Start Server
app.listen(5000, () => console.log('Server is listening on http://localehost:5000...'))