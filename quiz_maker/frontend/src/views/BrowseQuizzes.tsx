import DisplayAllQuizzes from "../components/Quizzes/DisplayAllQuizzes";
import Navigation from "../components/Shared/Navigation";

function BrowseQuizzes() {
  return (
    <>
      <Navigation />
      <div className="flex flex-col items-center justify-center gap-4 lg:flex lg:flex-row lg:flex-wrap lg:gap-8">
        <DisplayAllQuizzes />
      </div>
    </>
  )
}

export default BrowseQuizzes