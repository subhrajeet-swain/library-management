import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addBook, updateBook, fetchBooks } from '../store/slices/bookSlice';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

export default function BookForm({ book, onClose }) {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: book
            ? {
                title: book.title,
                author: book.author,
                genre: book.genre,
                description: book.description,
            }
            : undefined,
    });

    const onSubmit = async (data) => {
        const loadingToast = toast.loading(book ? 'Updating book...' : 'Adding book...');

        try {
            if (book) {
                await dispatch(updateBook({ id: book.id, ...data })).unwrap();
                toast.success('Book updated successfully!', { id: loadingToast });
            } else {
                await dispatch(addBook(data)).unwrap();
                toast.success('Book added successfully!', { id: loadingToast });
            }
            await dispatch(fetchBooks());
            onClose();
        } catch (error) {
            console.error('Failed to save book:', error);
            toast.error(error.message || 'Failed to save book', { id: loadingToast });
        }
    };

    return (
        <div className="fixed inset-0  bg-dark bg-opacity-10 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6">
                    {book ? 'Edit Book' : 'Add New Book'}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            {...register('title', { required: 'Title is required' })}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Author
                        </label>
                        <input
                            type="text"
                            {...register('author', { required: 'Author is required' })}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.author && (
                            <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Genre
                        </label>
                        <input
                            type="text"
                            {...register('genre', {
                                required: 'Genre is required',
                            })}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.genre && (
                            <p className="mt-1 text-sm text-red-600">{errors.genre.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            {...register('description', {
                                required: 'Description is required',
                                minLength: {
                                    value: 10,
                                    message: 'Description must be at least 10 characters',
                                },
                            })}
                            rows={4}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                        >
                            {book ? 'Update' : 'Add'} Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
