import { QuizProps } from "../interfaces/QuizProps";

const URL = 'https://quizhub-api.onrender.com/';

export const getQuizzes = async (token: string): Promise<QuizProps[]> => {
    return fetch(`${URL}quiz`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.error);
                });
            }
            return response.json() as Promise<QuizProps[]>;
        })
        .catch(() => {
            throw new Error();
        });
};

export const getQuizById = async (token: string, id: string | undefined): Promise<QuizProps> => {
    return fetch(`${URL}quiz/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.error);
                });
            }
            return response.json() as Promise<QuizProps>;
        })
        .catch(() => {
            throw new Error();
        });
};

export const createQuiz = (token: string, data: object): Promise<QuizProps> => {
    return fetch(`${URL}quiz`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(`Failed to create quiz: ${errorData.message}`);
                });
            }
            return response.json() as Promise<QuizProps>;
        })
        .catch((error) => {
            console.error("createQuiz failed:", error);
            throw error;
        });
};

export const getQuizzesByUser = (token: string, username: string): Promise<QuizProps[]> => {
    return fetch(`${URL}quiz/user/${username}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.error);
                });
            }
            return response.json() as Promise<QuizProps[]>;
        })
        .catch(() => {
            throw new Error();
        });
};

export const deleteQuiz = (token: string, quizId: string | undefined): Promise<QuizProps> => {
    return fetch(`${URL}quiz/${quizId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.error);
                });
            }
            return response.json();
        })
        .catch(() => {
            throw new Error();
        });
};
