import express from 'express';
import {
    create,
    getAll,
    getTop,
    getByCategory,
    getById,
} from '../controllers/PostController.js';

const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.get('/top', getTop);
router.get('/:id', getById);
router.get('/category/:categoryId', getByCategory);

export default router;
