require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const { port, dbUrl } = config;
const app = express();

app.use(express.json());

authRoutes(app);
userRoutes(app);

app.listen(port, () => {
    console.log('Server listening on port', port)
});

mongoose.Promise = Promise;
mongoose.connect(dbUrl);
mongoose.connection.on('error', (error) => console.error(error));