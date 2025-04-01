import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/Element';


const initialState = {
    books: {
        data: []  // Changed to match API response structure
    },
    loading: false,
    error: null
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const token = state.auth.token;
            const response = await axios.get(`${API_URL}/book/get-all-books`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch books');
        }
    }
);

export const addBook = createAsyncThunk(
    'book/addBook',
    async (bookData, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const token = state.auth.token;
            console.log(bookData)
            const response = await axios.post(`${API_URL}/book/create-book`, bookData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add book');
        }
    }
);

export const updateBook = createAsyncThunk(
    'book/updateBook',
    async ({ id, ...bookData }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const token = state.auth.token;
            const response = await axios.put(`${API_URL}/book/update-book/${id}`, bookData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update book');
        }
    }
);

export const deleteBook = createAsyncThunk(
    'book/deleteBook',
    async (id, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const token = state.auth.token;
            await axios.delete(`${API_URL}/book/delete-book/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete book');
        }
    }
);

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload; // API returns { data: [...books] }
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books.data.push(action.payload);
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.books.data.findIndex(book => book.id === action.payload.id);
                if (index !== -1) {
                    state.books.data[index] = action.payload;
                }
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books.data = state.books.data.filter(book => book.id !== action.payload);
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError } = bookSlice.actions;
export default bookSlice.reducer;
