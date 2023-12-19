import { useEffect, useState } from 'react';
import { JobCardProps } from '../interfaces/JobCard';
import { getJobs } from '../services/jobs';
import HomePage from '../components/HomePage';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';

function Home() {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);

  useEffect(() => {
    getJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        console.error(error);
      })
  })

  return (
    <>
      <Navbar />
      <HomePage />
      <div className='flex flex-col text-left m-4 lg:m-4'>
        <h1 className='text-primary text-2xl p-4 font-extrabold'>Find your next opportunity</h1>
        <div className='w-full bg-neutral-200 flex flex-col items-center justify-center p-4 rounded-md lg:flex lg:flex-row lg:flex-wrap'>
          {jobs.map((job) => (
            <JobCard
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

export default Home