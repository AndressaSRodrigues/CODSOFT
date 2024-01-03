import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuizCard from "../components/Quizzes/QuizCard";
import { getQuizzes } from "../services/quizzes";
import { QuizProps } from "../interfaces/QuizProps";
import { useAuth } from "../context/AuthContext";

function BrowseQuizzes() {
  const { token } = useAuth();
  const [quizzes, setQuizzes] = useState<QuizProps[]>([])

  useEffect(() => {
    getQuizzes(token)
      .then((data) => {
        setQuizzes(data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [token])

  return (
    <>
        <h1 className="text-primary text-3xl text-center my-4 font-bold lg:my-8">
          All Quizzes
        </h1>
        <div className="flex flex-col items-center justify-center gap-4 lg:flex lg:flex-row lg:flex-wrap lg:gap-8">
          {quizzes.map((quiz) => (
            <Link to={`/take-quiz/${quiz._id}`} target="_blank">
              <QuizCard
                title={quiz.title}
                theme={quiz.theme}
                questions={quiz.questions.length}
                author={quiz.createdBy}
              />
            </Link>
          ))}
        </div>
    </>
  )
}

export default BrowseQuizzes