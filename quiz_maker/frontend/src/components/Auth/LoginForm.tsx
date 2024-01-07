import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { login } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type FormData = {
    username: string;
    password: string;
};

function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const { setUser } = useAuth();
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
            const response = await login(data.username, data.password);
            const token = response.token;
            const userId = response.user._id;
            const username = response.user.username;
            setUser(token, userId, username);
            navigate('/browse-quizzes');
        } catch (error) {
            const errorMessage = error instanceof Error ? `Invalid credentials.` : 'An error occurred';
            setErrorMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <Controller
                    name="username"
                    control={control}
                    rules={{
                        required: 'Username is required',
                        pattern: {
                            value: /^(?=.*[A-Za-z])[A-Za-z0-9]{4,}$/,
                            message: 'Must contain 4 characters, and at least one letter.',
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                type="text"
                                id="username"
                                className={'border border-primary rounded-md p-2 w-72'}
                                placeholder="Username"
                                {...field}
                            />
                            {fieldState.error && (
                                <p className="text-primary text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div className="mb-4">
                <Controller
                    name="password"
                    control={control}
                    rules={{ 
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters long.',
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                type="password"
                                id="password"
                                className={'border border-primary rounded-md p-2 w-72'}
                                placeholder="Password"
                                {...field}
                            />
                            {fieldState.error && (
                                <p className="text-primary text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            {errorMessage && (
                <span className="text-primary mt-4 mb-4 flex items-center">
                    <ErrorOutlineIcon className="mr-2" /> {errorMessage}
                </span>
            )}
            <button
                type="submit"
                className="w-72 bg-primary text-white font-bold p-2 rounded-md border border-primary hover:bg-neutral-200 hover:text-primary "
                disabled={isLoading}
            >
                {isLoading ? 'Validating your info...' : 'Enter'}
            </button>
        </form>
    );
}

export default LoginForm
