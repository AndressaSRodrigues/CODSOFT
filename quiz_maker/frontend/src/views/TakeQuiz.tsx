import { getQuizById } from "../services/quizzes";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QuizProps } from "../interfaces/QuizProps";
import { useAuth } from "../context/AuthContext";

function TakeQuiz() {
  const [quiz, setQuiz] = useState<QuizProps>();
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

  return (
    <div className="flex flex-col items-start justify-start mx-12 my-8">
      {quiz ? (
        <>
          <h2 className="text-2xl text-primary font-bold mb-4">{quiz.title}</h2>
          <div className="flex flex-row gap-4 text-sm italic mb-4">
            <p>{quiz.theme}</p>
            <p className="text-neutral-400">{quiz.createdBy}</p>
          </div>
          <ul className="mb-8">
            {quiz.questions.map((question, index) => (
              <div className="my-4">
                <li key={index}>
                  <p className="bg-neutral-300 p-4 rounded-md">{question.text}</p>
                  <ul className="p-4">
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex}>
                        <label>
                          <input
                            type="radio"
                            name={`question${index}`}
                            value={optionIndex}
                          // Handle user selection logic here
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
          <button className="w-44 text-white font-bold bg-primary ml-14 p-4 rounded-md">Finish</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TakeQuiz