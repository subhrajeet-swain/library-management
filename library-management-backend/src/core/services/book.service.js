import Book from '../models/book.model.js';

// Create a new book
export const createBook = async (bookData, userId) => {
    try {
        const book = await Book.create({ ...bookData, userId });
        return book;
    } catch (error) {
        throw new Error(`Error creating book: ${error.message}`);
    }
};

// Get all books
export const getAllBooks = async (userId) => {
    try {
        const books = await Book.findAll({
            where: { userId },
            order: [['createdAt', 'ASC']]
        });
        return books;
    } catch (error) {
        throw new Error(`Error fetching books: ${error.message}`);
    }
};

// Update a book by ID
export const updateBook = async (id, bookData, userId) => {
    try {
        const [updatedRows] = await Book.update(bookData, {
            where: { id, userId },
            returning: true
        });

        if (updatedRows === 0) {
            throw new Error('Book not found');
        }

        const updatedBook = await Book.findByPk(id);
        return updatedBook;
    } catch (error) {
        throw new Error(`Error updating book: ${error.message}`);
    }
};

// Delete a book by ID
export const deleteBook = async (id, userId) => {
    try {
        const deletedRows = await Book.destroy({
            where: { id, userId }
        });

        if (deletedRows === 0) {
            throw new Error('Book not found');
        }

        return true;
    } catch (error) {
        throw new Error(`Error deleting book: ${error.message}`);
    }
};
