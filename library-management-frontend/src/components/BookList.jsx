import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteBook, fetchBooks } from '../store/slices/bookSlice';
import toast from 'react-hot-toast';

export default function BookList({ onEdit }) {
    const dispatch = useDispatch();
    const bookState = useSelector((state) => state.books);

    const books = bookState?.books?.data || [];
    const loading = bookState?.loading;
    const error = bookState?.error;

    const handleDelete = async (bookId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            const loadingToast = toast.loading('Deleting book...');

            try {
                await dispatch(deleteBook(bookId)).unwrap();
                await dispatch(fetchBooks());
                toast.success('Book deleted successfully!', { id: loadingToast });
            } catch (error) {
                console.error('Failed to delete book:', error);
                toast.error(error.message || 'Failed to delete book', { id: loadingToast });
            }
        }
    };

    React.useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                Error: {error}
            </div>
        );
    }

    if (!books || books.length === 0) {
        return (
            <div className="text-center text-gray-500 p-4">
                No books found. Add some books to get started!
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
                <div
                    key={book.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {book.title}
                        </h3>
                        <p className="text-gray-600 mb-2">By {book.author}</p>
                        <p className="text-sm text-gray-500 mb-2">Genre: {book.genre}</p>
                        <p className="text-gray-700 mb-4 line-clamp-3">{book.description}</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => onEdit(book)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                            >
                                <Pencil size={20} />
                            </button>
                            <button
                                onClick={() => handleDelete(book.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
