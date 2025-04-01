import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './configs/db.config.js';
import Book from './core/models/book.model.js';
import User from './core/models/user.model.js';
import apiRoutes from './api/index.js';
// Configure dotenv with path
dotenv.config({ path: '../.env' });

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Sync database
sequelize.sync({ force: false }) // Set `force: true` to drop and re-create tables
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database:', err));

// Start server
const startServer = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log('Error starting server:', error);
    }
};

startServer();
