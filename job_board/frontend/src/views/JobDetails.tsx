import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { JobDetailsProps } from "../interfaces/JobDetailsProps"
import { getJobDetails } from "../services/jobs";
import { useParams } from "react-router-dom";

import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PublicIcon from '@mui/icons-material/Public';

function JobDetails() {
    const [job, setJob] = useState<JobDetailsProps | null>(null);

    const id = useParams<{ id?: string }>()?.id || "";

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const jobDetails = await getJobDetails(id);
                setJob(jobDetails);
            } catch (error) {
                console.error(error);
            }
        };

        fetchJobDetails();
    }, [id]);


    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center">
                <article className="w-fit h-fit bg-neutral-100 flex flex-col justify-center rounded-md shadow-md m-8 p-4 gap-4 lg:m-12">
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
            </div>


        </>
    )
}

export default JobDetails