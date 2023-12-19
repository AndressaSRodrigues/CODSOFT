import { JobCardProps } from '../interfaces/JobCard';

const URL = 'http://localhost:3000/';

export const getJobs = (): Promise<JobCardProps[]> => {
    return fetch(`${URL}jobs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((response) => {
        if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.error);
            });
          }
        return response.json() as Promise<JobCardProps[]>;
    })
    .catch(() => {
        throw new Error();
    });
};