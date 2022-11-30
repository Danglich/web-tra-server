import express from 'express';
import {
    getAll,
    create,
    getBySlug,
} from '../controllers/PostCategorController.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:slug', getBySlug);

export default router;
