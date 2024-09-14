const express = require('express');
const app = express();
const port = 8000;
const connectdb = require('./db/dbconnection');
const User = require('./db/user');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Registration Route
const bcrypt = require('bcrypt');

app.post('/registration', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);

        const foundUser = await User.findOne({ username });
        if (foundUser) {
            return res.status(400).json({ message: 'Username taken', success: false });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(200).json({ message: 'User registered successfully', success: true });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'Internal Server Error', success: false });
    }
});


// Login Route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const foundUser = await User.findOne({ username });
        if (!foundUser) {
            return res.json({ message: 'Username not found', success: false });
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if(!match){
            return res.json({ message: 'Wrong Password! Please try Again', success: false });
        }
        res.json({ message: 'Login successful', success: true });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'Internal Server Error', success: false });
    }
});

// Connect to MongoDB
connectdb();

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
