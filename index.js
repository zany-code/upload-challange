import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import FbPosting from './src/routes/post.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;
app.use(cors())

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "_" + file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
    app.use(bodyParser.json());
    app.use('/images', express.static(path.join(__dirname,  'images')));
    app.use(multer({storage : fileStorage, fileFilter : fileFilter}).single('image'));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader("Acbcess-Control-Allow-Credentials", "true");
        next();
    });

  app.use('/', FbPosting);

  mongoose.connect('mongodb+srv://muzani:muzani12345678@uploudedchalangge1.ldow6vq.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
      app.listen(port, () => console.log('Berhsil Konek'));
  })
  .catch(err => {
      console.log(err);
  });
