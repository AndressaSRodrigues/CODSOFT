const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello');
});

const port = 8080;

app.listen(port, () => {
    console.log('Server listening on port', port);
});