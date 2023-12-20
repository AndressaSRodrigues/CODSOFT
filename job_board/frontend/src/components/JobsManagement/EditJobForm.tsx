import { useState } from "react"
import { useForm, Controller } from 'react-hook-form'
import { FormControl, TextField, Button, Stack } from '@mui/material'
import { updateJob } from "../../services/jobs"
import { useAuth } from "../../context/AuthContext"
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

type FormData = {
    title: string,
    level: string,
    company: string,
    location: string,
    salary: string,
    description: string,
    modality: string,
    startDate: string,
};

function EditJobForm () {
    const { token } = useAuth();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const navigateTo = useNavigate();

    const { handleSubmit, control } = useForm<FormData>({
        defaultValues: {
            title: '',
            company: '',
            level: '',
            location: '',
            modality: '',
            description: '',
            salary: '',
            startDate: '',
        },
    });

    const renderTextField = (name: keyof FormData, label: string, multiline?: boolean) => (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    label={label}
                    type="text"
                    multiline={multiline}
                    rows={multiline ? 5 : 1}
                    error={!!fieldState.error}
                    helperText={fieldState.error ? fieldState.error.message : ''}
                    {...field}
                />
            )}
        />
    );

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            await updateJob(token, id, data);
            navigateTo('/dashboard/c');
        } catch (error) {
            const errorMessage = error instanceof Error
                ? `${error.message}.`
                : 'An error occurred';
            setErrorMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>  
        <h1 className="text-primary text-2xl font-bold mb-4">Update Job Information <AutoAwesomeIcon /></h1>
        <span className="text-neutral-600">You're not required to fill in every field.<br />Update only the necessary information.</span>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <FormControl>
                    <Stack spacing={2} className='w-72 lg:w-96'>
                        {renderTextField("title", "Job Title")}
                        {renderTextField("level", "Level (Internship, Junior, Mid, Senior)")}
                        {renderTextField("company", "Company")}
                        {renderTextField("location", "Location (City and country)")}
                        {renderTextField("salary", "Salary")}
                        {renderTextField("description", "Description (write about job requirements, benefits...)", true)}
                        {renderTextField("modality", "Modality (Remote, Hybrid, Office)")}
                        {renderTextField("startDate", "Start date")}
                        <span>{errorMessage}</span>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update'}
                        </Button>
                    </Stack>
                </FormControl>
            </form>
        </>
    );
}

export default EditJobForm