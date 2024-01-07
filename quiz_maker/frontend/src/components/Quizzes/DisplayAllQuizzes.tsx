import { useState, useEffect } from "react";
import { getQuizzes } from "../../services/quizzes";
import { QuizProps } from "../../interfaces/QuizProps";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import QuizCard from "../../components/Quizzes/QuizCard";

function DisplayAllQuizzes() {
    const { token } = useAuth();
    const [quizzes, setQuizzes] = useState<QuizProps[]>([]);

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
        </>
    )
}

export default DisplayAllQuizzes
