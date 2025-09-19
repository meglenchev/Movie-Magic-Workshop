import { Movie } from "../models/Movie.js";

export default {
    // Return All Movies In Home Page
    getAll() {
        return Movie.find();
    },
    // Return One Move - Details
    getOne(movieId) {
        return Movie.findOne({_id: movieId});
    },
    // Create Movie
    create(movieData) {
        const movie = new Movie(movieData);
        
        return movie.save();
    }
}