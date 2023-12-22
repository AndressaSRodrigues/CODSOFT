import { useForm, Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, RadioGroup, Radio, Typography, TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { userRegister } from '../../services/auth';

type FormData = {
    name: string,
    role: string,
    email: string;
    password: string;
};

function RegisterForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const { handleSubmit, control } = useForm<FormData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            const response = await userRegister(data.role, data.name, data.email, data.password);
            localStorage.setItem('token', response.token);
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
                            name="name"
                            control={control}
                            rules={{ required: 'Name is required' }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="Name"
                                    type="text"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error ? fieldState.error.message : ''}
                                    {...field}
                                />
                            )}
                        />
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
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: 'Type is required' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <RadioGroup
                                        aria-label="type"
                                        name="type"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    >
                                        <FormControlLabel value="person" control={<Radio />} label="I'm looking for a job."  />
                                        <FormControlLabel value="company" control={<Radio />} label="I'm looking for talent."  />
                                    </RadioGroup>
                                    {fieldState.error && (
                                        <Typography style={{ color: 'red' }} variant="caption" color="textSecondary">{fieldState.error.message}</Typography>
                                    )}
                                </>
                            )}
                        />
                        <span>{errorMessage}</span>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {isLoading ? 'Creating account...' : 'Create my account'}
                        </Button>
                    </Stack>
                </FormControl>
            </form>
        </>
    );
};

export default RegisterForm