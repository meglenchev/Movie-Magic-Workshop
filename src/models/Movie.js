import mongoose, { Schema, model } from "mongoose";

const movieSchema = new Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    imageURL: String,
    rating: Number,
    description: String
});

export const Movie = mongoose.model('Movie', movieSchema, 'movies');