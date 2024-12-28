const mongoose = require('mongoose');

const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME;

const dbURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = { connectDB };
