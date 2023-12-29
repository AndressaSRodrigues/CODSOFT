import { getApplicationsByUser, deleteJobApplication } from "../../services/applications";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { JobApplicationProps } from "../../interfaces/JobApplicationProps";
import { Link } from "react-router-dom";
import Loading from "../../assets/Loading.gif";
import SendIcon from "@mui/icons-material/Send";

function DisplayApplicationsByUser() {
    const { token, userEmail } = useAuth();
    const [applications, setApplications] = useState<JobApplicationProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const data = await getApplicationsByUser(userEmail);
            setApplications(data.applications);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchApplications();
    }, [userEmail]);
    
    const handleDeleteApplication = async (token: string, applicationId: string) => {
        setLoading(true);
        try {
            await deleteJobApplication(token, applicationId);
            await fetchApplications();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    const titleStyle = "text-primary text-2xl font-bold mb-6";

    return (
        <>
            <div className="flex flex-col text-left">
                <h1 className={titleStyle}>Applications Sent <SendIcon /></h1>
                <div className="w-fit bg-neutral-200 flex flex-col items-center justify-center p-4 rounded-md lg:flex lg:flex-row lg:flex-wrap md:flex md:flex-row md:flex-wrap">
                    {loading ? (
                        <img src={Loading} alt="loading..." width="300vw" />
                    ) : applications.length > 0 ? (
                        applications.map((application) => (
                            <div key={application._id} className="w-60 flex flex-col p-4 m-1 bg-neutral-100 rounded-md shadow-md">
                                <span className="text-lg font-bold"><Link to={`/job/${application.jobId}`} target="_blank">{application.jobTitle}</Link></span>
                                <span className="italic">{application.companyName}</span>
                                <span>Sent on: {new Date(application.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                })}</span>
                                <div
                                    onClick={() => handleDeleteApplication(token, application._id)}
                                    className="text-primary text-xs text-end cursor-pointer mt-2"
                                >
                                    Remove
                                </div>
                            </div>
                        ))
                    ) : (
                        <span>You haven't applied to any jobs yet.</span>
                    )}
                </div>
                <div className="text-xs text-neutral-400 my-2">
                    <span>Removing the application from this list doesn't mean it'll be unsent.</span>
                </div>
            </div>
        </>
    );
};

export default DisplayApplicationsByUser