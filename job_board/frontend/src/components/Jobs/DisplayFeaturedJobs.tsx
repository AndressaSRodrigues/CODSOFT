import { useEffect, useState } from "react";
import { JobCardProps } from "../../interfaces/JobCardProps";
import { getJobs } from "../../services/jobs";
import JobCard from "./JobCard";
import { Link } from "react-router-dom";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import Loading from "../../assets/Loading.gif";

function DisplayFeaturedJobs() {
    const [jobs, setJobs] = useState<JobCardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        getJobs()
            .then((data) => {
                const featureJobs = data.slice(0, 4);
                setJobs(featureJobs);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    return (
        <>
            <div className="flex flex-col text-left m-4 lg:m-4">
                <h1 className="text-primary text-lg p-4 font-extrabold lg:text-2xl">Find your next opportunity</h1>
                <div className="w-full bg-neutral-200 flex flex-col items-center justify-center p-4 rounded-md lg:flex lg:flex-row lg:flex-wrap md:flex md:flex-row md:flex-wrap">
                    {loading ? (
                        <img src={Loading} alt="loading..." width="300vw" />
                    ) : (jobs.map((job) => (
                        <JobCard
                            key={job._id}
                            _id={job._id}
                            title={job.title}
                            level={job.level}
                            company={job.company}
                            location={job.location}
                            salary={job.salary}
                        />
                    ))
                    )}
                </div>
                <div className="w-full bg-neutral-200 flex flex-row items-center justify-center p-4 rounded-md text-primary">
                    <Link to={'/jobs'}>Browse All Jobs <SavedSearchIcon /></Link>
                </div>
            </div>
        </>
    )
};

export default DisplayFeaturedJobs
