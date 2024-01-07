import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getQuizById } from "../services/quizzes";
import { useAuth } from "../context/AuthContext";
import { QuizProps } from "../interfaces/QuizProps";
import getThemeColor from "../utils/themeColor";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReplayIcon from '@mui/icons-material/Replay';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MoodIcon from '@mui/icons-material/Mood';

function TakeQuiz() {
  const { token, username } = useAuth();
  const { id } = useParams();

  const [quiz, setQuiz] = useState<QuizProps | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuizById(token, id);
        setQuiz(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuiz();
  }, [token, id]);

  const handleOptionChange = (optionIndex: number) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = optionIndex;
      return updatedAnswers;
    });
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, userAnswer, index) => {
      const correctOptionIndex = quiz?.questions[index].correctOptionIndex;
      return userAnswer === correctOptionIndex ? score + 1 : score;
    }, 0);
  };

  const handleFinish = () => {
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleRetakeQuiz = () => {
    setShowResult(false);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
  };

  const renderQuizContent = () => {
    if (!quiz) {
      return <p>Loading...</p>;
    }

    const question = quiz.questions[currentQuestionIndex];
    const themeColor = getThemeColor(quiz.theme);

    return (
      <>
        <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
        <div className="flex flex-row gap-4 text-sm text-neutral-400 italic mb-4">
          <p>
            <QuestionAnswerIcon /> {quiz.theme}
          </p>
          <p>
            <MoodIcon /> {quiz.createdBy}</p>
        </div>
        <div className="my-4">
          <p className={`w-72 ${themeColor} p-4 rounded-md font-semibold lg:w-96`}>
            {question.text}
          </p>
          <ul className="p-4">
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question${currentQuestionIndex}`}
                    value={optionIndex}
                    checked={userAnswers[currentQuestionIndex] === optionIndex}
                    onChange={() => handleOptionChange(optionIndex)}
                    className="mr-2"
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row justify-between gap-2">
          {currentQuestionIndex > 0 && (
            <button
              className={`w-28 h-10 font-bold border border-neutral-400 p-2 rounded-md mt-12`}
              onClick={handlePreviousQuestion}
            >
              Previous
            </button>
          )}
          <button
            className={`w-28 h-10 font-bold bg-neutral-400 p-2 rounded-md mt-12`}
            onClick={currentQuestionIndex < quiz.questions.length - 1 ? handleNextQuestion : handleFinish}
          >
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </>
    );
  };

  const renderResult = () => {
    const themeColor = getThemeColor(quiz?.theme || '');

    return (
      <div className={`w-72 h-60 ${themeColor} flex flex-col items-center justify-evenly rounded-md shadow-md text-2xl p-4 text-center mt-12 mb-60 font-bold`}>
        <h1 className={`${themeColor}`}>{quiz?.title}</h1>
        <span className={`${themeColor} mb-4`}>
          You got {calculateScore()} answers right out of {quiz?.questions.length}.
        </span>
        <button
          onClick={handleRetakeQuiz}
          className="w-1/2 bg-neutral-200 p-2 text-sm rounded-md shadow-md"
        >
          Retake Quiz <ReplayIcon />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-row m-6 gap-4 text-neutral-400 text-sm font-bold lg:m-12">
        <Link to="/browse-quizzes" className="hover-italic">
          <KeyboardArrowRightIcon /> Browse Quizzes
        </Link>
        <Link to="/create-quiz" className="hover-italic">
          <KeyboardArrowRightIcon /> Create a New Quiz
        </Link>
        <Link to={`/manage/${username}`} className="hover-italic">
          <KeyboardArrowRightIcon /> My Quizzes
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center mx-6 my-6 text-neutral-700 border border-neutral-300 rounded-md p-4">
        {!showResult ? renderQuizContent() : renderResult()}
      </div>
    </>
  );
};

export default TakeQuiz;
