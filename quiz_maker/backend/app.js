require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const { port, dbUrl } = config;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.options('*', cors());

authRoutes(app);

app.listen(port, () => {
    console.log('Server listening on port', port);
});

mongoose.Promise = Promise;
mongoose.connect(dbUrl);
mongoose.connection.on('error', (error) => console.error(error));
