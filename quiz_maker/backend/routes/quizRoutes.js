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
    app.get('/quiz', getQuizzes);
    app.get('/quiz/:id', getQuizById);
    app.get('/quiz/user/:username', getQuizzesByUser);
    app.get('/quiz/theme/:theme', getQuizzesByTheme);
    app.post('/quiz', userAuth, createNewQuiz);
    app.delete('/quiz/:id', userAuth, deleteQuizById);
};