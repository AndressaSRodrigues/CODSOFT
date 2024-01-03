const {
    createNewQuiz,
    getQuizzes,
    getQuizById,
    deleteQuizById,
    getQuizzesByUser,
    getQuizzesByTheme
} = require('../controllers/quizControllers');
const userAuth = require('../middleware/auth');

module.exports = (app, next) => {
    app.get('/quiz', userAuth, getQuizzes);
    app.get('/quiz/:id', userAuth, getQuizById);
    app.get('/quiz/user/:username', userAuth, getQuizzesByUser);
    app.get('/quiz/theme/:theme', userAuth, getQuizzesByTheme);
    app.post('/quiz', userAuth, createNewQuiz);
    app.delete('/quiz/:id', userAuth, deleteQuizById);
};