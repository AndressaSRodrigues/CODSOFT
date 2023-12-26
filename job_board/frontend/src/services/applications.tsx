import { JobApplicationProps } from "../interfaces/JobApplicationProps";

const URL = 'http://localhost:3000/';

export const sendNewApplication = async (
    token: string,
    jobId: string | null,
    jobTitle: string | null,
    userEmail: string,
    resume: File | null,
    companyName: string | null,
    companyEmail: string | null,
): Promise<JobApplicationProps> => {
    const formData = new FormData();
    formData.append('token', token)
    formData.append('userEmail', userEmail);
    formData.append('jobId', jobId || '');
    formData.append('jobTitle', jobTitle || '')
    formData.append('resume', resume || '');
    formData.append('companyName', companyName || '')
    formData.append('companyEmail', companyEmail || '');

    return fetch(`${URL}applications`, {
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

export const getApplicationsByUser = async (userEmail: string): Promise<JobApplicationProps[]> => {
    try {
        const response = await fetch(`${URL}applications/${userEmail}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch applications');
        }

        const data = await response.json();
        return data.applications || []; // Adjust the parsing logic
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch applications');
    }
};
