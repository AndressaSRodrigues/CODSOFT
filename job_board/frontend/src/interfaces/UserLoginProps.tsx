export interface UserLoginProps {
    token: string,
    user: {
        _id: string,
        name: string,
        email: string,
        password: string,
        role: string,
    }
    error?: string;
}