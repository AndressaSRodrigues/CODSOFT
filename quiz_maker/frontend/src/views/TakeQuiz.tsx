import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { getQuizById } from "../services/quizzes";
import { useAuth } from "../context/AuthContext";
import { QuizProps } from "../interfaces/QuizProps";
import getThemeColor from "../utils/themeColor";

const TakeQuiz = () => {
  const { token } = useAuth();
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

  const renderQuizContent = () => {
    if (!quiz) {
      return <p>Loading...</p>;
    }

    const question = quiz.questions[currentQuestionIndex];

    return (
      <>
        <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
        <div className="flex flex-row gap-4 text-sm italic mb-4">
          <p>{quiz.theme}</p>
          <p className="text-neutral-400">{quiz.createdBy}</p>
        </div>
        <div className="my-4">
          <p className={`w-72 bg-${getThemeColor(quiz.theme)} p-4 rounded-md font-semibold lg:w-96`}>
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
        <button
          className={`w-32 h-10 font-bold bg-neutral-400 p-2 rounded-md mt-12`}
          onClick={currentQuestionIndex < quiz.questions.length - 1 ? handleNextQuestion : handleFinish}
        >
          {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish'}
        </button>
      </>
    );
  };

  const renderResult = () => (
    <div className={`w-72 h-60 bg-${getThemeColor(quiz?.theme || '')} flex flex-col justify-evenly rounded-md shadow-md text-2xl p-4 text-center mt-12 mb-60`}>
      <h1 className={`bg-${getThemeColor(quiz?.theme || '')}`}>{quiz?.title}</h1>
      <span className={`bg-${getThemeColor(quiz?.theme || '')} font-bold`}>
        You got {calculateScore()} answers right out of {quiz?.questions.length}.
      </span>
    </div>
  );

  return (
    <>
      <div className="flex flex-row mt-4 ml-8 gap-6 text-neutral-400 text-sm font-bold">
        <Link to="/browse-quizzes" className="hover-italic">
          <KeyboardArrowRightIcon /> Browse Quizzes
        </Link>
        <Link to="/create-quiz" className="hover-italic">
          <KeyboardArrowRightIcon /> Create a New Quiz
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center mx-6 my-6 text-neutral-700 border border-neutral-300 rounded-md p-4">
        {!showResult ? renderQuizContent() : renderResult()}
      </div>
    </>
  );
};

export default TakeQuiz;
