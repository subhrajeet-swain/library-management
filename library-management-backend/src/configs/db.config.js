import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();

// Initialize Sequelize
const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
        port: process.env.PGPORT,
    }

);

// Connect to the database
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectDB();


export default sequelize;
