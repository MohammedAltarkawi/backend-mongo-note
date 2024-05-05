
import { InferSchemaType, Schema, model } from "mongoose";


const noteSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String}

}, { timestamps: true});



type Note =  InferSchemaType<typeof noteSchema>;
// in this string, you define the nome of the model in the mongo 
export default model<Note>("Note", noteSchema );

