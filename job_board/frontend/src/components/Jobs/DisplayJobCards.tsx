import { useEffect, useState } from 'react';
import { JobCardProps } from '../../interfaces/JobCardProps';
import { getJobs } from '../../services/jobs';
import JobCard from "./JobCard"

function DisplayJobCards() {
    const [jobs, setJobs] = useState<JobCardProps[]>([]);

    useEffect(() => {
        getJobs()
            .then((data) => {
                setJobs(data);
                console.log('Displaying Jobs Data')
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])
    
    return (
        <>
            <div className='flex flex-col text-left m-4 lg:m-4'>
                <h1 className='text-primary text-2xl p-4 font-extrabold'>Find your next opportunity</h1>
                <div className='w-full bg-neutral-200 flex flex-col items-center justify-center p-4 rounded-md lg:flex lg:flex-row lg:flex-wrap md:flex md:flex-row md:flex-wrap'>
                    {jobs.map((job) => (
                        <JobCard
                            key={job._id}
                            _id={job._id}
                            title={job.title}
                            level={job.level}
                            company={job.company}
                            location={job.location}
                            salary={job.salary}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default DisplayJobCards