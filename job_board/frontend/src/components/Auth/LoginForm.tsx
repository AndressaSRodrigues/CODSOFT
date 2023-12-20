import { useForm, Controller } from 'react-hook-form';
import { FormControl, TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { userLogin } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

type FormData = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const navigateTo = useNavigate();

    const { handleSubmit, control } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            const response = await userLogin(data.email, data.password);
            const role = response.user.role;
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.user._id);
            localStorage.setItem('userRole', response.user.role);
            console.log(response.token, response.user._id, response.user.role)
            switch (role) {
                case 'person': navigateTo('/dashboard/p');
                    break;
                case 'company': navigateTo('/dashboard/c');
                    break;
            }
        } catch (error) {
            const errorMessage = error instanceof Error 
            ? `${error.message}. Please, check your credentials.` 
            : 'An error occurred';
            setErrorMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Stack spacing={2} className='w-72 lg:w-96'>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="Email"
                                    type="email"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error ? fieldState.error.message : ''}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required' }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="Password"
                                    type="password"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error ? fieldState.error.message : ''}
                                    {...field}
                                />
                            )}
                        />
                        <span>{errorMessage}</span>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {isLoading ? 'Loggin in...' : 'Login'}
                        </Button>
                    </Stack>
                </FormControl>
            </form>
        </>
    );
};
