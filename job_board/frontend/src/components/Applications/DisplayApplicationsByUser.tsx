import { getApplicationsByUser } from "../../services/applications"
import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react";
import { JobApplicationProps } from "../../interfaces/JobApplicationProps";
import { Link } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';

function DisplayApplicationsByUser() {
    const { userEmail } = useAuth();
    const [applications, setApplications] = useState<JobApplicationProps[]>([]);

    useEffect(() => {
        getApplicationsByUser(userEmail)
            .then((data) => {
                if (data && Array.isArray(data)) {
                    setApplications(data);
                    console.log(data);
                } else if (Array.isArray(data)) {
                    setApplications(data);
                    console.log(data);
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const titleStyle = "text-primary text-2xl font-bold mb-6";

    return (
        <>
            <div className='flex flex-col text-left'>
            <h1 className={titleStyle}>Applications Sent <SendIcon /></h1>
                <div className='w-full bg-neutral-200 flex flex-col items-center justify-center p-4 rounded-md lg:flex lg:flex-row lg:flex-wrap md:flex md:flex-row md:flex-wrap'>
                    {applications.map((application) => (
                        <div key={application._id} className="w-60 flex flex-col p-4 m-4 bg-neutral-100 rounded-md shadow-md">
                            <span className="text-lg font-bold"><Link to={`/job/${application.jobId}`} target="_blank">{application.jobTitle}</Link></span>
                            <span>{application.companyName}</span>
                            <span>Sent on: {new Date(application.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            })}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DisplayApplicationsByUser