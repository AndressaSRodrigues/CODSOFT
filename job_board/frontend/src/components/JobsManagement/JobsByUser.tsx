import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { getJobsByUser } from "../../services/jobs"
import { JobCardProps } from "../../interfaces/JobCardProps"
import { Link } from "react-router-dom"
import { deleteJobById } from "../../services/jobs"
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AutorenewIcon from '@mui/icons-material/Autorenew'

type JobsByUserProps = {
    isJobCreated: boolean;
};

function JobsByUser({ isJobCreated }: JobsByUserProps) {
    const [jobs, setJobs] = useState<JobCardProps[]>([]);
    const { token, userId } = useAuth();

    const fetchJobsByUser = async () => {
        try {
            const allJobsByUser = await getJobsByUser(userId);
            setJobs(allJobsByUser);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchJobsByUser();
        if (isJobCreated) {
            fetchJobsByUser();
        }
    }, [userId, isJobCreated]);

    const handleDeleteJob = async (token: string, jobId: string) => {
        try {
            await deleteJobById(token, jobId);
            fetchJobsByUser();
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <>
            <div className='w-full flex flex-col items-start justify-center gap-8'>
                <span>You can view, edit or delete your job posts.</span>
                {jobs.map((job) => (
                    <span key={job._id} className="w-full flex flex-row justify-between gap-4">
                        <Link to={`/job/${job._id}`} target="_blank">
                            <h2 className="text-lg font-bold">
                                {job.title}
                            </h2>
                        </Link>
                        <span>
                            <Link to={`/job/edit/${job._id}`}><EditIcon className="text-primary mr-4 cursor-pointer" /></Link>
                            <DeleteOutlineIcon className="text-neutral-500 cursor-pointer" onClick={() => handleDeleteJob(token, job._id)} />
                        </span>
                    </span>
                ))}
                <button
                    className="w-32 h-12 border-primary border-2 text-primary rounded-md"
                    onClick={fetchJobsByUser}
                >Refresh <AutorenewIcon /></button>
            </div>
        </>
    )
}

export default JobsByUser