import { UserLoginProps } from "../interfaces/UserLoginProps";

const URL = "https://hirehub-api.onrender.com/";

export const userLogin = async (email: string, password: string): Promise<UserLoginProps> => {
    return fetch(`${URL}login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            role: role,
            email: email,
            password: password
        })
    })
    .then(async (response) => {
        if (!response.ok) {
            const data = await response.json();
            if (response.status === 400 && data.message === 'Email already in use.') {
                throw new Error(data.message);
            } else {
                throw new Error("Registration failed. Please check the provided information.");
            }
        }
        return response.json() as Promise<UserLoginProps>;
    })
    .catch((error) => {
        throw error;
    });
};
