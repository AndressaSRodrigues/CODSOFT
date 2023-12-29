const {
    createNewQuiz,
    getQuizzes,
    getQuizById,
    deleteQuizById,
    getQuizzesByUser
} = require('../controllers/quizControllers');
const userAuth = require('../middleware/auth');

module.exports = (app, next) => {
    app.get('/quiz', getQuizzes);
    app.get('/quiz/:id', getQuizById);
    app.get('/quiz/user/:username', getQuizzesByUser);
    app.post('/quiz', userAuth, createNewQuiz);
    app.delete('/quiz/:id', userAuth, deleteQuizById);
};