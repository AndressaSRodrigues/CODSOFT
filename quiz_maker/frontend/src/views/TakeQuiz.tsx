import TakeQuizForm from "../components/Quizzes/TakeQuizForm";
import Navigation from "../components/Shared/Navigation";

function TakeQuiz() {
  return (
    <>
      <Navigation />
      <div className="flex flex-col items-center justify-center mx-6 my-6 text-neutral-700 border border-neutral-300 rounded-md p-4">
        <TakeQuizForm />
      </div>
    </>
  );
};

export default TakeQuiz
