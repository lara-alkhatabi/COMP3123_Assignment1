// routes/userRoutes.js

const express = require('express');
const User = require('../models/User');
const { connectToDatabase } = require('../db');

const router = express.Router();

// POST: Create a new user
router.post('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users'); // Use 'users' collection

        const { name, email } = req.body;
        const newUser = new User(name, email);

        await usersCollection.insertOne(newUser);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error });
    }
});

// GET: Fetch all users
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        const users = await usersCollection.find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});

module.exports = router;
