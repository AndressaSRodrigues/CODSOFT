import DisplayQuizzesByUser from "../components/Quizzes/DisplayQuizzesByUser";
import Navigation from "../components/Shared/Navigation";

function ManageQuizzes() {
    return (
        <>
            <Navigation />
            <div className="flex flex-col items-center justify-center gap-4 lg:flex lg:flex-row lg:flex-wrap lg:gap-8">
                <DisplayQuizzesByUser />
            </div>
        </>
    )
}

export default ManageQuizzes
