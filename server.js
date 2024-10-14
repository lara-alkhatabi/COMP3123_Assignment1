// server.js

const express = require('express');
const { connectToDatabase } = require('./db'); // Ensure correct path to db.js

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup (body-parser or other configurations)
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes'); // Example route import
app.use('/api/users', userRoutes); // Use the user routes

// Start the server only if the database connection is successful
async function startServer() {
    try {
        await connectToDatabase();
        console.log('MongoDB connected. Starting the server...');

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

startServer();
