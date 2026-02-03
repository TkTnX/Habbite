import { Schema } from "mongoose";

const drinkSchema = new Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    
})