import express from 'express';
import {
    createBookController,
    getAllBooksController,
    updateBookController,
    deleteBookController
} from '../controllers/book.controller.js';
import { createBookSchema, idParamSchema, updateBookSchema, validateRequest } from '../validations/book.validate.js';
import verifyToken from '../middlewares/auth.middleware.js';
const router = express.Router();

// Book routes
// Create a new book
router.post('/create-book',
    verifyToken,
    validateRequest(createBookSchema),
    createBookController
);

// Get all books
router.get('/get-all-books',
    verifyToken,
    getAllBooksController
);

// Update a book
router.put('/update-book/:id',
    verifyToken,
    validateRequest(idParamSchema, 'params'),
    validateRequest(updateBookSchema),
    updateBookController
);

// Delete a book
router.delete('/delete-book/:id',
    verifyToken,
    validateRequest(idParamSchema, 'params'),
    deleteBookController
);


export default router;
