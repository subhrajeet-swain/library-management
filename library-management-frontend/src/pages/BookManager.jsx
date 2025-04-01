import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../store/slices/bookSlice';
import { logout } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import { Library, Plus, LogOut } from 'lucide-react';

export default function BookManager() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchBooks()).unwrap()
            .catch(error => {
                toast.error(error.message || 'Failed to fetch books');
            });
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleEdit = (book) => {
        setSelectedBook(book);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedBook(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    {/* Mobile Layout */}
                    <div className="sm:hidden">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <Library className="h-7 w-7 text-blue-600" />
                                <div className="ml-2">
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        LibraryMind
                                    </h1>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-500 hover:text-gray-700"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
                            <button
                                onClick={() => setIsFormOpen(true)}
                                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Add Book
                            </button>
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:flex sm:justify-between sm:items-center">
                        <div className="flex items-center">
                            <Library className="h-8 w-8 text-blue-600" />
                            <div className="ml-3">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    LibraryMind
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Your Personal Book Manager
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">Welcome, {user?.name}</span>
                            <button
                                onClick={() => setIsFormOpen(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Add Book
                            </button>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <LogOut className="h-5 w-5 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
                <div className="sm:px-0">
                    <BookList onEdit={handleEdit} />
                </div>
            </main>

            {isFormOpen && (
                <BookForm
                    book={selectedBook}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
}
