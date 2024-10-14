// db.js

const { MongoClient } = require('mongodb');

// MongoDB Connection URL
const url = 'mongodb+srv://laraalkhatabi:la@cluster0.9himg.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Function to connect to the database
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas!');

        // Specify the database
        const db = client.db('comp3123_assigment1');
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit the app if database connection fails
    }
}

// Export the connection function
module.exports = { connectToDatabase };
