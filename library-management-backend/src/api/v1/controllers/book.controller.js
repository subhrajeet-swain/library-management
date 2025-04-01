import { createBook, getAllBooks, updateBook, deleteBook } from '../../../core/services/book.service.js';
import ApiResponse from '../../../lib/utils/apiResponse.js';
import asyncHandler from '../../../lib/utils/asyncHandler.js';

// Create a new book
export const createBookController = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const book = await createBook(req.body, id);
    return res
        .status(201)
        .json(ApiResponse(201, book, 'Book created successfully'));
});

// Get all books
export const getAllBooksController = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const books = await getAllBooks(id);
    return res
        .status(200)
        .json(ApiResponse(200, books, 'Books retrieved successfully'));
});

// Update a book
export const updateBookController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const updatedBook = await updateBook(id, req.body, userId);
    return res
        .status(200)
        .json(ApiResponse(200, updatedBook, 'Book updated successfully'));
});

// Delete a book
export const deleteBookController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    await deleteBook(id, userId);
    return res
        .status(200)
        .json(ApiResponse(200, null, 'Book deleted successfully'));
});
