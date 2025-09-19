import fs from 'fs/promises';

const dataMoviesJson = await fs.readFile('./src/db.json', {encoding: 'utf-8'});
let dataMovies = JSON.parse(dataMoviesJson);
export class Movie {
    constructor(data) {
        this.data = data;
    }

    static find() {
        return dataMovies.movies.slice();
    }

    async save() {
        dataMovies.movies.push(this.data);

        const dataMoviesJson = JSON.stringify(dataMovies, null, 2);
        
        await fs.writeFile('./src/db.json', dataMoviesJson);

        return this;
    }
}