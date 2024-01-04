import { Link } from "react-router-dom";
import CreateQuizForm from "../components/Quizzes/CreateQuizForm";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function CreateQuiz() {
  return (
    <>

      <div className="flex flex-row mt-4 ml-8 gap-6 text-neutral-400 text-sm font-bold">
        <Link to="/browse-quizzes" className="hover-italic">
          <KeyboardArrowRightIcon /> Browse Quizzes
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