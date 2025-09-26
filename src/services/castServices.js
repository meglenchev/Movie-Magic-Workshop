import { Cast } from "../models/Cast.js";

export default {
    create(castData) {
        return Cast.create(castData);
    },

    getAll() {
        let result = Cast.find();
        
        return result;
    }
}