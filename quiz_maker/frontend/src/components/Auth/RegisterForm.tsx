import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { register } from '../../services/auth';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from 'react-router-dom';

type FormData = {
    username: string;
    password: string;
};

function RegisterForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [accountCreated, isAccountCreated] = useState<boolean>(false);

    const { handleSubmit, control } = useForm<FormData>({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            const response = await register(data.username, data.password);
            console.log(response);
            isAccountCreated(true);
        } catch (error) {
            const errorMessage = error instanceof Error ? `Invalid credentials.` : 'An error occurred';
            setErrorMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {!accountCreated && (
                <>
                    <h1 className="text-lg text-primary mb-4">Create your account</h1>
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
                            {isLoading ? 'Creating account...' : 'Create now!'}
                        </button>
                    </form>
                </>
            )}
            {accountCreated && (
                <div className='flex flex-col items-center text-lg text-white bg-blue rounded-md shadow-md p-4 mt-4'>
                    <span className='bg-blue'>Your account has been created.</span>
                    <Link
                        to={'/login'}
                        className='bg-blue font-bold text-primary'
                    >Login now!
                    </Link>
                </div>
            )}
        </>
    )
}

export default RegisterForm