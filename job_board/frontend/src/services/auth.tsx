import { UserLoginProps } from "../interfaces/UserLoginProps";

const URL = 'http://localhost:3000/';

export const userLogin = async (email: string, password: string): Promise<UserLoginProps> => {
    return fetch(`${URL}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.error);
                });
            }
            return response.json() as Promise<UserLoginProps>;
        })
        .catch(() => {
            throw new Error();
        });
};

export const userRegister = async (role: string, name: string, email: string, password: string): Promise<UserLoginProps> => {
    return fetch(`${URL}register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            role: role,
            email: email,
            password: password
        })
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((data) => {
                    throw new Error(data.error);
                });
            }
            return response.json() as Promise<UserLoginProps>;
        })
        .catch((error) => {
            console.error('Registration error:', error);
            throw new Error('An error occurred during registration.');
        });
};