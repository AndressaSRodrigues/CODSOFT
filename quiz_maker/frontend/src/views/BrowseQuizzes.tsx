import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuizCard from "../components/Quizzes/QuizCard";
import { getQuizzes } from "../services/quizzes";
import { QuizProps } from "../interfaces/QuizProps";
import { useAuth } from "../context/AuthContext";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function BrowseQuizzes() {
  const { token } = useAuth();
  const [quizzes, setQuizzes] = useState<QuizProps[]>([])

  useEffect(() => {
    getQuizzes(token)
      .then((data) => {
        const sortedQuizzes = data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setQuizzes(sortedQuizzes);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [token]);

  return (
    <>
      <div className="flex flex-row m-6 text-neutral-400 text-sm font-bold lg:m-12">
        <Link to={'/create-quiz'}
          className="hover:italic"
        >
          <KeyboardArrowRightIcon /> Create a New Quiz
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 lg:flex lg:flex-row lg:flex-wrap lg:gap-8">
        {quizzes.map((quiz) => (
          <Link to={`/take-quiz/${quiz._id}`} key={quiz._id}>
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