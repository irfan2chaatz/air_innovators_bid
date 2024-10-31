import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morganMiddleware from './src/middlewares/morgan.middleware.js'

import v1Routes from './src/routes/index.js'
import globalErrorMiddleware from './src/middlewares/error.middleware.js';
import CONFIG from './src/config/config.js';

const app = express();

app.use(CONFIG.STATIC_PATH, express.static('uploads'));

var corsOptions = {
    origin: '*', // Allow all origins temporarily
};

// Middleware to parse JSON requests
app.use(express.json());

// cors setup
app.use(cors(corsOptions))

// cookier parser middleware
app.use(cookieParser())

// logger middleware
app.use(morganMiddleware)

// Basic route
app.get('/', (req, res) => {
    res.status(200).send("AIR INNOVATORS Server is up")
})

app.use('/api/', v1Routes)

// global Error Middleware
app.use(globalErrorMiddleware)

export { app }
