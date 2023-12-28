import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getJobsByUser, deleteJobById } from "../../services/jobs";
import { JobCardProps } from "../../interfaces/JobCardProps";
import { Link } from "react-router-dom";
import Modal from "../Shared/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Loading from "../../assets/Loading.gif";

type JobsByUserProps = {
    isJobCreated: boolean;
};

function JobsByUser({ isJobCreated }: JobsByUserProps) {
    const [jobs, setJobs] = useState<JobCardProps[]>([]);
    const [message, setMessage] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const { token, userId } = useAuth();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [jobIdToDelete, setJobIdToDelete] = useState<string | undefined>('');
    const [jobTitleToDelete, setJobTitleToDelete] = useState<string>('');

    const fetchJobsByUser = async () => {
        setLoading(true);
        try {
            const allJobsByUser = await getJobsByUser(userId);
            if (allJobsByUser.length === 0) {
                setMessage(true);
            }
            setJobs(allJobsByUser);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobsByUser();
        if (isJobCreated) {
            fetchJobsByUser();
        }
    }, [userId, isJobCreated]);

    const handleDeleteJob = (jobId: string, jobTitle: string) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setJobIdToDelete(jobId);
        setJobTitleToDelete(jobTitle);
        setShowModal(true);
    };

    const confirmDeleteJob = async (token: string, jobId: string | undefined) => {
        try {
            await deleteJobById(token, jobId);
            setShowModal(false);
            fetchJobsByUser();
        } catch (error) {
            console.error(error)
        }
    };

    const cancelDeleteJob = () => {
        setShowModal(false);
        setJobIdToDelete(undefined);
        setJobTitleToDelete('');
    };

    return (
        <>
            <div className="w-full flex flex-col items-start justify-center gap-8">
                {loading ? (
                    <div className="flex flex-col justify-center items-center">
                        <img src={Loading} alt="loading..." width="300vw" />
                    </div>
                ) : (jobs.map((job) => (
                    <span key={job._id} className="w-full flex flex-row justify-between gap-2">
                        <Link to={`/job/${job._id}`} target="_blank">
                            <h2 className="text-lg font-bold">
                                {job.title}
                            </h2>
                        </Link>
                        <span>
                            <Link to={`/job/edit/${job._id}`}>
                                <EditIcon className="text-primary mr-4 cursor-pointer" />
                            </Link>
                            <DeleteOutlineIcon
                                className="text-neutral-500 cursor-pointer"
                                onClick={() => handleDeleteJob(job._id, job.title)} />
                        </span>
                    </span>
                ))
                )}
                {message && (
                    <span className="bg-neutral-200 p-12 rounded-md shadow-sm text-center text-lg">You haven't added any job posts yet.</span>
                )}
                <button
                    className="w-32 h-12 bg-primary text-white rounded-md"
                    onClick={fetchJobsByUser}
                >Refresh <AutorenewIcon /></button>
            </div>
            <Modal title="Confirm Delete" open={showModal} onClose={cancelDeleteJob}>
                <div className="flex flex-col items-center">
                    <p>Are you sure you want to delete this job?</p>
                    <span className="font-bold">{jobTitleToDelete}</span>
                </div>

                <div className="flex flex-row items-end justify-end gap-4 mt-6 text-white text-sm">
                    <button
                        onClick={cancelDeleteJob}
                        className="w-16 h-8 p-1 bg-neutral-400 rounded-md shadow-sm">
                        No
                    </button>
                    <button
                        onClick={() => confirmDeleteJob(token, jobIdToDelete)}
                        className="w-32 h-8 p-1 bg-primary rounded-md shadow-sm"
                    >
                        Yes, delete it.
                    </button>
                </div>
            </Modal>
        </>
    )
};

export default JobsByUser
