import { JobDetailsProps } from "../../interfaces/JobDetailsProps";
import { getJobDetails } from "../../services/jobs";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useJobDetails } from "../../context/JobDetailsContext";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../assets/Loading.gif";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PublicIcon from "@mui/icons-material/Public";
import HireHubIcon from "../../assets/HireHubIcon.png";

function JobDetailsInfo() {
    const { token } = useAuth();
    const { setJobDetails } = useJobDetails();
    const [job, setJob] = useState<JobDetailsProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const id = useParams<{ id?: string }>()?.id || "";

    useEffect(() => {
        const fetchJobDetails = async () => {
            setLoading(true);
            try {
                const jobDetails = await getJobDetails(id);
                setJob(jobDetails);
                setJobDetails(jobDetails._id, jobDetails.title, jobDetails.company, jobDetails.companyEmail)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    return (
        <>
            {loading ? (
                <img src={Loading} alt="loading..." width="300vw" className="rounded-md" />
            ) : (
                <article className="w-fit h-fit bg-neutral-100 flex flex-col justify-center rounded-md shadow-md p-4 gap-4 lg:mr-4">
                    <h1 className="text-2xl font-extrabold">{job?.title}</h1>
                    <span><WorkOutlineIcon /> {job?.level}</span>
                    <span><ApartmentIcon /> {job?.company}</span>
                    <span><LocationOnIcon /> {job?.location}</span>
                    <span><AttachMoneyIcon /> {job?.salary}</span>
                    <span><CalendarMonthIcon /> {job?.startDate}</span>
                    <span><PublicIcon /> {job?.modality}</span>
                    <span className="font-bold">Description</span>
                    <span>{job?.description}</span>
                </article>
            )}
            {token === "" && (
                <>
                    <div className="flex flex-col items-center gap-4 bg-neutral-100 p-4 rounded-md shadow-md">
                        <img src={HireHubIcon} alt="HireHub Icon" width="100vw" />
                        <span className="text-primary text-lg font-bold text-center">
                            <Link to={'/create-account'}>Create an account</Link> or <Link to={'/login'}>login</Link> to apply!
                        </span>
                    </div>

                </>
            )}
        </>
    )
};

export default JobDetailsInfo
