import { useForm, Controller } from 'react-hook-form';
import { FormControl, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { sendNewApplication } from '../../services/applications';
import { useAuth } from '../../context/AuthContext';

type ResumeFormData = {
  resume: File;
};

function SendApplicationForm() {
  const { token, userId } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const { handleSubmit, control } = useForm<ResumeFormData>();

  const handleResumeSubmit = async (data: ResumeFormData) => {
    try {
      setIsLoading(true);
      const response = await sendNewApplication(token, jobId, userId, data.resume, companyEmail);
      console.log('Resume uploaded:', response);
    } catch (error) {
      const errorMessage = error instanceof Error
        ? `${error.message}. Please, check your file.`
        : 'An error occurred';
      setErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleResumeSubmit)}>
        <FormControl>
          <Stack spacing={2} className='w-72 lg:w-96 gap-2'>
            <Controller
              name="resume"
              control={control}
              rules={{ required: 'Resume file is required' }}
              render={({ field }) => (
                <input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                  className='text-primary text-sm'
                />
              )}
            />
            <span>{errorMessage}</span>
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </Stack>
        </FormControl>
      </form>
    </>
  );
}

export default SendApplicationForm