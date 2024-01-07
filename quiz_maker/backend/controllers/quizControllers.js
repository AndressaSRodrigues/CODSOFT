const {
    Quiz,
    createQuiz,
    findQuizzes,
    findQuiz,
    deleteQuiz,
    findQuizzesByQuery
} = require('../models/quiz');

const getQuizzes = async (req, res, next) => {
    try {
        const quizzes = await findQuizzes();
        
        if (!quizzes){
            return res.status(404).json({ message: 'Quizzes not found.'})
        }

        return res.status(200).json(quizzes);
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

const createNewQuiz = async (req, res, next) => {
    try {
        const { title, theme, questions } = req.body;

        const formattedQuestions = questions.map(questionData => ({
            text: questionData.text,
            options: questionData.options,
            correctOptionIndex: questionData.correctOptionIndex,
        }));

        const newQuiz = new Quiz({
            title,
            theme,
            questions: formattedQuestions,
            createdBy: req.user.username,
        });

        await createQuiz(newQuiz);

        res.status(201).json({ message: 'Quiz successfully created.', newQuiz });
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await findQuiz(id);

        if (!quiz){
            return res.status(404).json({ message: 'Quiz not found.'})
        }

        return res.status(200).json(quiz);
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

const deleteQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await findQuiz(id);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found.' });
        }

        if (quiz.createdBy !== req.user.username) {
            return res.status(403).json({ message: 'Forbidden: You are not allowed to delete this quiz.' });
        }

        await deleteQuiz(id);

        return res.status(200).json({ message: 'Quiz deleted.' });
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

const getQuizzesByUser = async (req, res) => {
    try {
        const { username } = req.params;
        const quizzes = await findQuizzesByQuery({ createdBy: username });

        if (quizzes.length === 0) {
            return res.status(404).json({ message: `No quizzes by ${username} were found.` });
        }

        return res.status(200).json(quizzes);
    } catch (error) {
        return res.status(500).json({ message: `${error}` });
    }
};

module.exports = {
    createNewQuiz,
    getQuizzes,
    getQuizById,
    deleteQuizById,
    getQuizzesByUser
};
