import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    imageUrl: String,
    rating: Number,
    description: String, 
    casts: [{
        type: Types.ObjectId, // Set data type
        ref: 'Cast' // Cast Database Reference
    }],
    creator: { // Single Relation Property
        type: Types.ObjectId,
        ref: 'User'
    }
});

export const Movie = model('Movie', movieSchema, 'movies');