// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect mongoDB
connectDB();

// Middware
app.use(bodyParser.json());
app.use(
	cors({
		origin: `${process.env.FRONT_URL}`, // or the port your frontend is running on
		credentials: true,
	})
);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
