import { User } from "../interfaces/User";

const URL = 'http://localhost:3000/';

export const deleteUserByEmail = async (token: string, userEmail: string): Promise<User> => {
    return fetch(`${URL}user/${userEmail}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch(() => {
            throw new Error();
        });
};
