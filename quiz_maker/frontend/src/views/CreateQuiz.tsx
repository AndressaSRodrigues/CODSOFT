import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CreateQuizForm from "../components/Quizzes/CreateQuizForm";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function CreateQuiz() {
  const { username } = useAuth();

  return (
    <>
      <div className="flex flex-row m-6 gap-4 text-neutral-400 text-sm font-bold lg:m-12">
        <Link to="/browse-quizzes" className="hover:italic">
          <KeyboardArrowRightIcon /> Browse Quizzes
        </Link>
        <Link to={`/manage/${username}`} className="hover:italic">
          <KeyboardArrowRightIcon /> My Quizzes
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center mx-6 my-6 text-neutral-700 border border-neutral-300 rounded-md p-4">
        <h1 className="text-primary text-2xl font-bold mb-8">Create Your Own Quiz</h1>
        <CreateQuizForm />
      </div>
    </>
  )
}

export default CreateQuiz