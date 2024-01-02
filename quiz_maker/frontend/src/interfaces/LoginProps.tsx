export interface LoginProps {
    token: string;
    user: {
        _id: string;
        username: string;
    }
    error?: string;
}