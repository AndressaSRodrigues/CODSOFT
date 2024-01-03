import { getQuizById } from "../services/quizzes";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QuizProps } from "../interfaces/QuizProps";
import { useAuth } from "../context/AuthContext";

function TakeQuiz() {
  const [quiz, setQuiz] = useState<QuizProps>();
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const { token } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    getQuizById(token, id)
      .then((data) => {
        setQuiz(data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])

  const handleOptionChange = (questionIndex: number, optionIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
    console.log(updatedAnswers);
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, userAnswer, index) => {
      const correctOptionIndex = quiz?.questions[index].correctOptionIndex;
      return userAnswer === correctOptionIndex ? score + 1 : score;
    }, 0)
  };

  const handleFinish = () => {
    setShowResult(true)
  };

  return (
    <div className="flex flex-col items-start justify-start mx-12 my-8">
      {!showResult && (
        <>
          {quiz ? (
            <>
              <h2 className="text-2xl text-primary font-bold mb-4">{quiz.title}</h2>
              <div className="flex flex-row gap-4 text-sm italic mb-4">
                <p>{quiz.theme}</p>
                <p className="text-neutral-400">{quiz.createdBy}</p>
              </div>
              <ul className="mb-8">
                {quiz.questions.map((question, index) => (
                  <div className="my-4" key={index}>
                    <li key={index}>
                      <p className="bg-neutral-300 p-4 rounded-md">{question.text}</p>
                      <ul className="p-4">
                        {question.options.map((option, optionIndex) => (
                          <li key={optionIndex}>
                            <label>
                              <input
                                type="radio"
                                name={`question${index}`} //ensures that radio buttons within the same question are grouped together
                                value={optionIndex} //represents the index of the current option for the current question
                                checked={userAnswers[index] === optionIndex} //if userAnswers is not equal to the current checked option, it updates
                                onChange={() => handleOptionChange(index, optionIndex)} //updates the setUsersAnswers according to the checked options
                              />
                              {option}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </div>
                ))}
              </ul>
              <button
                className="w-44 text-white font-bold bg-primary ml-14 p-4 rounded-md"
                onClick={handleFinish}
              >
                Finish
              </button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
      {showResult && (
        <span>Your score: {calculateScore()} out of {quiz?.questions.length}.</span>
      )}
    </div>
  );
}

export default TakeQuiz
