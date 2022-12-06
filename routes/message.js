import express from 'express';
import { create, getAll } from '../controllers/Message.js';

const router = express.Router();

router.get('/', getAll);
router.post('/create', create);
export default router;
