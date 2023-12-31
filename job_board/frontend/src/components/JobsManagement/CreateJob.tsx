import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormControl, TextField, Button, Stack } from "@mui/material";
import { postNewJob } from "../../services/jobs";
import { useAuth } from "../../context/AuthContext";

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

type CreateJobProps = {
    onJobCreated: () => void;
};

function CreateJob({ onJobCreated }: CreateJobProps) {
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const { handleSubmit, control, reset } = useForm<FormData>({
        defaultValues: {
            title: "",
            company: "",
            level: "",
            location: "",
            modality: "",
            description: "",
            salary: "",
            startDate: "",
        },
    });

    const renderTextField = (name: keyof FormData, label: string, multiline?: boolean) => (
        <Controller
            name={name}
            control={control}
            rules={{ required: `${label} is required` }}
            render={({ field, fieldState }) => (
                <TextField
                    label={label}
                    type="text"
                    multiline={multiline}
                    rows={multiline ? 5 : 1}
                    error={!!fieldState.error}
                    helperText={fieldState.error ? fieldState.error.message : ""}
                    {...field}
                />
            )}
        />
    );

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            await postNewJob(token, data.title, data.level, data.company, data.location, data.salary, data.description, data.modality, data.startDate);
            reset();
            onJobCreated();
        } catch (error) {
            const errorMessage = error instanceof Error
                ? `${error.message}.`
                : "An error occurred";
            setErrorMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Stack spacing={2} className="w-72 lg:w-96">
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
                            {isLoading ? "Posting..." : "Post"}
                        </Button>
                    </Stack>
                </FormControl>
            </form>
        </>
    );
};

export default CreateJob
