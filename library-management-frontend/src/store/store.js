import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import bookReducer from './slices/bookSlice';

// Define persist config for auth reducer
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'user']  // Only persist token and user
};

// Configure the store
export const store = configureStore({
    reducer: {
        auth: persistReducer(authPersistConfig, authReducer),
        books: bookReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false  // Disable serializable check for persistence
        })
});

// Configure persistor for store
export const persistor = persistStore(store);
