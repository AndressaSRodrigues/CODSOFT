import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type FormData = {
    username: string;
    password: string;
};

function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    const { handleSubmit, control } = useForm<FormData>({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            await login(data.username, data.password);
        } catch (error) {
            const errorMessage = error instanceof Error ? `Invalid credentials.` : 'An error occurred';
            setErrorMessage(errorMessage);
        } finally {
            setIsLoading(false);
            navigate('/browse-quizzes')
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: 'Username is required' }}
                    render={({ field, fieldState }) => (
                        <input
                            type="text"
                            id="username"
                            className={`border border-primary rounded-md p-2 lg:w-96 ${fieldState.error ? 'border-red-500' : ''}`}
                            placeholder="Username"
                            {...field}
                        />
                    )}
                />
                {errorMessage && (
                    <span className="text-red-500 mt-2 flex items-center">
                        <ErrorOutlineIcon className="mr-2" /> {errorMessage}
                    </span>
                )}
            </div>
            <div className="mb-4">
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Password is required' }}
                    render={({ field, fieldState }) => (
                        <input
                            type="password"
                            id="password"
                            className={`border border-primary rounded-md p-2 w-full ${fieldState.error ? 'border-red-500' : ''}`}
                            placeholder="Password"
                            {...field}
                        />
                    )}
                />
            </div>
            <button
                type="submit"
                className="w-full bg-primary text-white font-bold p-2 rounded-md border border-primary hover:bg-neutral-200 hover:text-primary "
                disabled={isLoading}
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}

export default LoginForm;
