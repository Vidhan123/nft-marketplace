const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

// load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

// Create Express instance
const app = express();

// Express setup
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route files
const userRouter = require('./routes/userRouter');
const itemRouter = require('./routes/itemRouter');

// Home
app.get('/', (req, res) => {
	res.status(200).send(
		`<h1>API is running</h1>`
	);
});

// Mount routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/item', itemRouter);

// Handling invalid routes
app.get('*', (req, res) => {
	res.status(200).send(
		`<h1>Invalid API URL</h1>`
	);
});

// access env vars
const PORT = process.env.PORT || 8000;

const server = app.listen(
	PORT,
	console.log(
		`The server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);

/**
 * Error handler.
 * Sends 400 for Mongoose validation errors.
 * 500 otherwise.
 * Do all error handling here.
 */
 app.use((err, req, res, next) => {
	console.log('Async error handler');

	if (err.name === 'ValidationError') {
		return res.status(400).json(err.errors);
	}
	if (err.name === 'CastError') {
		return res.status(404).json(err.errors);
	} else {
		console.log(err);
	}

	return res.status(500).json(err);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log('UNHANDLE');
	console.log(`Error: ${err.message}`);
	//close server and exit process
	server.close(() => process.exit(1));
});