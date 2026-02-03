import { model, Schema } from "mongoose";

const drinkSchema = new Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    
})

export const Drink = model('Drink', drinkSchema) 