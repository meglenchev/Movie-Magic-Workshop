import { Schema, Types, model } from "mongoose";
import { MAX } from "uuid";

const castShema = new Schema({
    name: {
        type: String, 
        required: [true, 'Cast name is required!']
    }, 
    age: {
        type: Number, 
        required: [true, 'Cast age is required!'], 
        max: 120,
        min: 0
    }, 
    born: {
        type: String, 
        required: [true, 'Cast born is required!']
    }, 
    imageUrl: {
        type: String, 
        required: [true, 'Cast imageUrl is required!']
    }
});

export const Cast = model('Cast', castShema, 'casts');