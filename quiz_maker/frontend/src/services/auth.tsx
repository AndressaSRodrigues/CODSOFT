import { LoginProps } from "../interfaces/LoginProps";

const URL = 'http://localhost:3000/';

export const login = async (username: string, password: string): Promise<LoginProps> => {
    return fetch(`${URL}login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.error);
                });
            }
            return response.json() as Promise<LoginProps>;
        })
        .catch(() => {
            throw new Error();
        });
};