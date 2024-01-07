import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DisplayQuizzesByUser from "../components/Quizzes/DisplayQuizzesByUser";

function ManageQuizzes() {
    return (
        <>
            <div className="flex flex-row m-6 text-neutral-400 text-sm font-bold lg:m-12">
                <Link
                    to={'/create-quiz'}
                    className="hover:italic">
                    <KeyboardArrowRightIcon /> Create a New Quiz
                </Link>
                <Link
                    to={'/browse-quizzes'}
                    className="hover:italic">
                    <KeyboardArrowRightIcon /> Browse Quizzes
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 lg:flex lg:flex-row lg:flex-wrap lg:gap-8">
                <DisplayQuizzesByUser />
            </div>
        </>
    )
}

export default ManageQuizzes