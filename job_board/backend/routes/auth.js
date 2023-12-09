module.exports = (app, next) => {
    app.get('/login', (req, res) => {
        res.send('Hello, auth route!')
    });
};
