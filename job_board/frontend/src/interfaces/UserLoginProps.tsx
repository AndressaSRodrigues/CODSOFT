export interface UserLoginProps {
    token: string,
    user: {
        _id: string,
        name: string,
        email: string,
        role: string,
    }
    error?: string;
}