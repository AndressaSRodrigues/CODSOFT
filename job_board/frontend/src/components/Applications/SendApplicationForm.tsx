import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormControl, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { sendNewApplication } from '../../services/applications';
import { useAuth } from '../../context/AuthContext';
import { useJobDetails } from '../../context/JobDetailsContext';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import EastIcon from '@mui/icons-material/East';

type ResumeFormData = {
  resume: FileList;
};

function SendApplicationForm() {
  const { token, userId } = useAuth();
  const { jobId, companyEmail } = useJobDetails();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<ResumeFormData>();

  const handleResumeSubmit = async (data: ResumeFormData) => {
    try {
      setIsLoading(true);
      await sendNewApplication(token, jobId, userId, data.resume[0], companyEmail);
      setSuccessMessage(true);
    } catch (error) {
      const errorMessage = error instanceof Error
        ? `${error.message}. Please, check your file.`
        : 'An error occurred';
      setErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const successMessageStyle = 'flex flex-col justify-center items-center';
  const navigationButtonsStyle = 'w-fit h-8 p-1 rounded-md shadow-sm text-sm text-primary';

  return (
    <div>
      {!successMessage && (
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
      )}

      {successMessage && (
        <div className={successMessageStyle}>
          <div className={`${successMessageStyle} text-primary text-center font-bold text-lg my-8`}>
            <span>Your application has been sent!</span>
            <span>Good luck <AutoAwesome /></span>
          </div>
          <div className='flex flex-row gap-4'>
            <EastIcon className='text-primary mt-1'/>
            <Link
              to={'/'}
              className={navigationButtonsStyle}>
              Home
            </Link>
            <Link
              to={'/browse-jobs'}
              className={navigationButtonsStyle}>
              Jobs
            </Link>
            <Link
              to={'/dashboard/p'}
              className={navigationButtonsStyle}>
              Dashboard
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}

export default SendApplicationForm