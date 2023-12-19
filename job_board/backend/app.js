require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const pkg = require('./package.json');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');
const cors = require('cors');

const { port, dbUrl } = config;
const app = express();

app.set('config', config);
app.set('pkg', pkg);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

authRoutes(app);
userRoutes(app);
jobsRoutes(app);

app.listen(port, () => {
    console.log('Server listening on port', port)
});

mongoose.Promise = Promise;
mongoose.connect(dbUrl);
mongoose.connection.on('error', (error) => console.error(error));