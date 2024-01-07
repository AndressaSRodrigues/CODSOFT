import CreateQuizForm from "../components/Quizzes/CreateQuizForm";
import Navigation from "../components/Shared/Navigation";

function CreateQuiz() {
  return (
    <>
      <Navigation />
      <div className="flex flex-col items-center justify-center mx-6 my-6 text-neutral-700 border border-neutral-300 rounded-md p-4">
        <h1 className="text-primary text-2xl font-bold mb-8">Create Your Own Quiz</h1>
        <CreateQuizForm />
      </div>
    </>
  )
}

export default CreateQuiz