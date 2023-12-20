export interface UserLoginProps {
    token: string,
    user: {
        _id: string,
        email: string,
        password: string,
        role: string,
    }
    error?: string;
}