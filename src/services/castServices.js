import { Cast } from "../models/Cast.js";

export default {
    create(castData) {
        return Cast.create(castData);
    },

    getAll(filter = {}) {
        let query = Cast.find();

        if (filter.includes) {
            query = query.in('_id', filter.includes) // Mongoose 
            // query = query.finde('_id', {$in: filter.includes}) // MongoDB 
        }

        if (filter.excludes) {
            query = query.nin('_id', filter.excludes);
        }

        return query;
    }
}