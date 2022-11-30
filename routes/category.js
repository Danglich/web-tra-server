import express from 'express';
import {
    create,
    getAll,
    getBySlug,
} from '../controllers/CategoryController.js';

const router = express.Router();

router.get('/', getAll);
router.post('/create', create);
router.get('/:slug', getBySlug);
export default router;
