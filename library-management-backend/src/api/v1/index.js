import express from 'express';
import userRoutes from './routes/user.routes.js';
import bookRoutes from './routes/book.routes.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/book', bookRoutes);

export default router;