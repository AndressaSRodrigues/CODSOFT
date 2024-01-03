import { QuizProps } from "../interfaces/QuizProps";

const URL = 'http://localhost:3000/';

export const getQuizzes = async (): Promise<QuizProps[]> => {
    return fetch(`${URL}quiz`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
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

export const getQuizById = async (id: string | undefined): Promise<QuizProps> => {
    return fetch(`${URL}quiz/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
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
