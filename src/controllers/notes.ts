import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";




export const getNotes: RequestHandler = async (req, res, next) => {
    //throw Error("klab");
 
    try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
    } catch (error) {
       next(error)
    }
}


export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {

        if (!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "id is not valid")
        }
    const note = await NoteModel.findById(noteId).exec();

    if(!note){
        throw createHttpError(404, "Note note Found")
    }

    res.status(200).json(note);
    } catch (error) {
       next(error)
    }
}


export const createNote: RequestHandler<unknown, unknown, noteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;


    try {
        if(!title){
            throw createHttpError(400, "Note must have a title")
        }
    const newNote = await NoteModel.create({
        title: title,
        text: text
    })
    res.status(201).json(newNote);
    } catch (error) {
       next(error)
    }
}

export const updateNote: RequestHandler<noteParams, unknown, noteBody, unknown>  = async (req, res, next) => {
    const noteId = req.params.noteId;
    const reqBodyNote = {
        title: req.body.title,
        text: req.body.text
    } as noteBody;

    try {

        if (!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "id is not valid")
        }

        if(!reqBodyNote.title){
            throw createHttpError(400, "Note must have title")
        }
    const note = await NoteModel.findById(noteId).exec();

    if(!note){
        throw createHttpError(404, "Note note Found")
    }

    note.title = reqBodyNote.title;
    note.text = reqBodyNote.text;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
    } catch (error) {
       next(error)
    }
}



export const deleteNote: RequestHandler<noteParams, unknown, noteBody, unknown>  = async (req, res, next) => {
    const noteId = req.params.noteId;


    try {

        if (!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "id is not valid")
        }

    const note = await NoteModel.findById(noteId).exec();

    if(!note){
        throw createHttpError(404, "Note note Found")
    }
    
  

     await note.();

    res.sendStatus(204);
    } catch (error) {
       next(error)
    }
}




interface noteBody {
    title?:  string,
    text?:  string
}

interface noteParams {
    noteId:  string
}