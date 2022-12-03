import { validationResult } from "express-validator";
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import PostingModel from "../model/post.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createPost = (req, res, next) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = error.array();
        throw err
    };

    if(!req.file) {
        const err = new Error('Image Harus Di Uploaded');
        err.errorStatus = 422;
        throw err
    }

    const creator = req.body.creator;
    const body = req.body.body;
    const image = req.file.path;
    const comment = req.body.comment;

    const posting = new PostingModel({
        creator, body, image, comment
    });

    posting.save()
    .then(result => {
        res.status(201).json(result) 
    })
    .catch(error => console.log(error))
}

export const getAllPost = (req, res, next) => {
    PostingModel.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => next(error))
}

export const getPostById = (req, res, next) => {
    const id = req.params.id;

    PostingModel.findById(id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => next(error))
}

export const updatePost = (req, res, next) => {
    
    const error = validationResult(req);

    if (!error.isEmpty()) {
        const err = new Error('Invalid Value');
        err.errorStatus = 400;
        err.data = error.array();
        throw err
    }

    if(!req.file) {
        const err = new Error('Image Harus Di Uploaded');
        err.errorStatus = 422;
        throw err
    }
    const id = req.params.id;
    const creator = req.body.creator;
    const body = req.body.body;
    const image = req.file.path;
    const comment = req.body.comment;

    PostingModel.findById(id)
    .then(post => {
        if(!post) {
            const err = new Error('Blog Tidak Di Temukan');
            err.errorStatus = 404;
            throw err;
        }

        post.creator = creator;
        post.body = body;
        post.image = image;
        post.comment = comment

        return post.save();
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => next(error))
}

export const deletePost = (req, res, next) => {
    const id = req.params.id;

    PostingModel.findById(id)
    .then(post => {

        if(!post) {
            const error = new Error('Blog Post Tidak Di Temukan');
            error.errorStatus = 404;
            throw error;
        }

        removeImage(post.image);
        return PostingModel.findByIdAndRemove(id);
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => next(error));
}

const removeImage = (filePath) => {
    console.log('File Path :', filePath);
    console.log('dirname : ', __dirname);

    filePath = path.join(__dirname, '../../', filePath);
    fs.unlink(filePath, err => console.log(err))
}