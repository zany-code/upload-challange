import express from 'express';
import { createPost, deletePost, getAllPost, getPostById, updatePost} from '../controller/post.js';

const router = express.Router();

router.post('/postings', createPost)
router.get('/posting', getAllPost)
router.get('/posting/:id', getPostById)
router.put('/posting/:id', updatePost)
router.delete('/posting/:id', deletePost)

export default router