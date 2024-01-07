import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function Navigation() {
const { username } = useAuth();

  return (
    <div className="flex flex-row my-6 ml-4 gap-1 text-neutral-400 text-xs text-center font-bold lg:text-sm lg:m-12">
    <Link to="/browse-quizzes" className="hover:italic">
      <KeyboardArrowRightIcon /> Browse Quizzes
    </Link>
    <Link to="/create-quiz" className="hover:italic">
      <KeyboardArrowRightIcon /> Create a New Quiz
    </Link>
    <Link to={`/manage/${username}`} className="hover:italic">
      <KeyboardArrowRightIcon /> My Quizzes
    </Link>
  </div>
  )
}

export default Navigation