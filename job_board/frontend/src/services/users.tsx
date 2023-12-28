import { User } from "../interfaces/User";

const URL = "https://hirehub-api.onrender.com/";

export const getUserByEmail = async (token: string, userEmail: string): Promise<User> => {
    return fetch(`${URL}user/${userEmail}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.json();
        })
        .catch(() => {
            throw new Error();
        });
};

export const deleteUserByEmail = async (token: string, userEmail: string): Promise<User> => {
    return fetch(`${URL}user/${userEmail}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.json();
        })
        .catch(() => {
            throw new Error();
        });
};

export const updateUserInfo = async (token: string, userEmail: string, data: object): Promise<User> => {
    return fetch(`${URL}user/${userEmail}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            return response.json();
        })
        .catch(() => {
            throw new Error();
        });
};
