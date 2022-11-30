import express from 'express';
import {
    createProduct,
    getById,
    getByCategory,
    search,
} from '../controllers/ProductControllers.js';

const router = express.Router();

router.post('/create', createProduct);
router.get('/search', search);
router.get('/:id', getById);
router.get('/', getByCategory);
export default router;
