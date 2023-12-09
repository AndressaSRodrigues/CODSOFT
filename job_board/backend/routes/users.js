module.exports = (app, next) => {
    app.get('/users', (req, res) => {
        res.send('Hello, users route!')
    });
};
