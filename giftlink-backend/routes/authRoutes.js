const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const dotenv = require('dotenv');
const pino = require('pino');

dotenv.config();
const logger = pino();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ===================== LOGIN =====================
router.post('/login', async (req, res) => {
    try {
        // Task 1: Connect to giftsdb in MongoDB through connectToDatabase in db.js.
        const db = await connectToDatabase();

        // Task 2: Access MongoDB users collection
        const collection = db.collection("users");

        // Task 3: Check for user credentials in database
        const theUser = await collection.findOne({ email: req.body.email });

        // Task 7: Send appropriate message if user not found
        if (!theUser) {
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // Task 4: Check if the password matches the encrypted password
        const result = await bcryptjs.compare(req.body.password, theUser.password);
        if (!result) {
            logger.error('Passwords do not match');
            return res.status(400).json({ error: 'Wrong password' });
        }

        // Task 5: Fetch user details from database
        const userName = theUser.firstName;
        const userEmail = theUser.email;

        // Task 6: Create JWT authentication if passwords match with user._id as payload
        const payload = {
            user: {
                id: theUser._id.toString(),
            },
        };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.json({ authtoken, userName, userEmail });
    } catch (e) {
        logger.error(`Login error: ${e.message}`);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;
