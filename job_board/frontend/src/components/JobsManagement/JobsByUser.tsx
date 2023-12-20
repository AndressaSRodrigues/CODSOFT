import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { getJobsByUser } from "../../services/jobs"
import { JobCardProps } from "../../interfaces/JobCardProps";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type JobsByUserProps = {
    isJobCreated: boolean;
};

function JobsByUser({ isJobCreated }: JobsByUserProps) {
    const [jobs, setJobs] = useState<JobCardProps[]>([]);
    const { userId } = useAuth();

    useEffect(() => {
        const fetchJobsByUser = async () => {
            try {
                const allJobsByUser = await getJobsByUser(userId);
                setJobs(allJobsByUser);
                console.log(allJobsByUser)
            } catch (error) {
                console.error(error);
            }
        };

        fetchJobsByUser();
        if (isJobCreated) {
            fetchJobsByUser();
        }
    }, [userId, isJobCreated]);

    return (
        <>
            <div className='w-full flex flex-col items-start justify-center gap-8'>
                <span>You can view, edit or delete your job posts.</span>
                {jobs.map((job) => (
                    <span className="w-full flex flex-row justify-between gap-4">
                        <Link to={`/job/${job._id}`} target="_blank">
                            <h2 className="text-lg font-bold">
                                {job.title}
                            </h2>
                        </Link>
                        <span>
                            <EditIcon className="text-primary mr-4" />
                            <DeleteOutlineIcon className="text-neutral-500" /></span>
                    </span>
                ))}
            </div>
        </>
    )
}

export default JobsByUser