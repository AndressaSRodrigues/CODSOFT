import { LoginProps } from "../interfaces/LoginProps";

const URL = 'https://quizhub-api.onrender.com/';

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

export const register = async (username: string, password: string): Promise<LoginProps> => {
    return fetch(`${URL}register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(async (response) => {
        if (!response.ok) {
            const data = await response.json();
            if (response.status === 400 && data.message === 'Username already in use.') {
                throw new Error(data.message);
            } else {
                throw new Error("Registration failed. Please check the provided information.");
            }
        }
        return response.json() as Promise<LoginProps>;
    })
    .catch((error) => {
        throw error;
    });
};