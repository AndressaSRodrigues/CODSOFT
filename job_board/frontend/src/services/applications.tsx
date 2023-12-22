import { JobApplicationProps } from "../interfaces/JobApplicationProps";

const URL = 'http://localhost:3000/';

export const sendNewApplication = async (
    token: string,
    jobId: string | null,
    userId: string,
    resume: File | null,
    companyEmail: string | null,
): Promise<JobApplicationProps> => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('jobId', jobId || '');
    formData.append('resume', resume || '');
    formData.append('companyEmail', companyEmail || '');

    return fetch(`${URL}send`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    })
        .then((response) => {
            return response.json() as Promise<JobApplicationProps>;
        })
        .catch((error) => {
            console.error(error)
            throw new Error('Failed to send application');
        });
};
