import fs from 'fs/promises';
import { v4 as uuid } from 'uuid';

const dataMoviesJson = await fs.readFile('./src/db.json', {encoding: 'utf-8'});
let dataMovies = JSON.parse(dataMoviesJson);
export class Movie {
    constructor(data) {
        Object.assign(this, data)
        
        this._id = uuid();
    }

    // We are returning a new instance of all movies
    static find(filter = {}) {
        let result = dataMovies.movies.slice();

        if (filter._id) {
            result = dataMovies.movies.filter(movie => movie._id === filter._id);
        }

        if (filter.title) {
            result = dataMovies.movies.filter(movie => movie.title.toLowerCase().includes(filter.title.toLowerCase()));
        }

        if (filter.genre) {
            result = dataMovies.movies.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
        }

        if (filter.year) {
            result = dataMovies.movies.filter(movie => movie.year === filter.year);
        }

        return result;
    }

    static findOne(filter = {}) {
        let result = dataMovies.movies[0];

        if (filter._id) {
            result = dataMovies.movies.find(movie => movie._id === filter._id);
        }

        return result;
    }

    get id() {
        return this._id;
    }

    async save() {
        dataMovies.movies.push(this);

        const dataMoviesJson = JSON.stringify(dataMovies, null, 2);

        await fs.writeFile('./src/db.json', dataMoviesJson);

        return this;
    }
}