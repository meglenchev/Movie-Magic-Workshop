import fs from 'fs/promises';

const dataMoviesJson = await fs.readFile('./src/db.json', {encoding: 'utf-8'});
const dataMovies = JSON.parse(dataMoviesJson);

export class Movie {
    static find() {
        return dataMovies.movies.slice();
    }
}