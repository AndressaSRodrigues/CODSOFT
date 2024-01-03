const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        type: [String],
        required: true
    },
    correctOptionIndex: {
        type: Number,
        required: true
    }
});

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    theme: {
        type: String,
        required: true,
        enum: ['Environment', 'Technology', 'Literature', 'Cinema', 'Geography', 'History']
    },
    questions: [QuestionSchema],
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Quiz = mongoose.model('Quiz', QuizSchema);

async function findQuizzes() {
    return Quiz.find().populate('questions').exec();
}

async function createQuiz(quiz) {
    return Quiz.create(quiz);
}

async function findQuiz(id){
    return Quiz.findById({ _id: id });
}

async function findQuizzesByQuery(query = {}){
    return Quiz.find(query).exec();
}

async function deleteQuiz(id) {
    return Quiz.findOneAndDelete({ _id: id });
}

module.exports = {
    Quiz,
    createQuiz,
    findQuizzes,
    findQuiz,
    deleteQuiz,
    findQuizzesByQuery
};
