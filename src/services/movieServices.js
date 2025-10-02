import { Movie } from "../models/Movie.js";

export default {
    // Return All Movies In Home Page
    getAll(filter = {}) {
        let query =  Movie.find();

        if (filter.title) {
            query = query.find({ title: { $regex: filter.title, $options: 'i' } });
        }

        if (filter.genre) {
            query = query.find({ genre: { $regex: `^${filter.genre}$`, $options: 'i' } });
        }

        if (filter.year) {
            query = query.where('year').equals(filter.year); // Using Mongoose Query
            //query = query.find({year: filter.year}); // Using MongoDB Method
        }

        return query;
    },
    // Return One Move - Details
    getOne(movieId) {
        //return Movie.findOne({_id: movieId}); // MongoDB Method
        //return Movie.findById(movieId).populate('casts'); // Use Mongoose findBId Method
        return Movie.findById(movieId); // Use Mongoose findBId Method
    },
    // Create Movie
    create(movieData, creatorId) {
        // const movie = new Movie(movieData);
        
        // return movie.save();
        return Movie.create({
            ...movieData, 
            creator: creatorId,
        }); // Use Mongoose Create Method
    }, 
    // Delete Movie
    delete(movieId) {
        return Movie.findByIdAndDelete(movieId);
    },
    //Edit Movie
    edit(movieId, movieData) {
        return Movie.findByIdAndUpdate(movieId, movieData);
    },
    // Attach Cast To Movie
    async attach(movieId, castId) {
        // Add relation method 1
        // const movie = await Movie.findById(movieId);
        // movie.casts.push(castId);
        // return movie.save()

        // Add relation method 2 MongoDB
        return Movie.findByIdAndUpdate( movieId, { $push: { casts: castId } });
    }
}