import { useEffect, useState } from "react";
import { JobCardProps } from "../../interfaces/JobCardProps";
import { getJobs, getJobsByQuery } from "../../services/jobs";
import SearchIcon from "@mui/icons-material/Search";
import JobCard from "../../components/Jobs/JobCard";

function DisplayAllJobsAndSearch() {
    const [jobs, setJobs] = useState<JobCardProps[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [noMatchesMessage, setNoMatchesMessage] = useState<boolean>(false);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            getJobs()
                .then((data) => {
                    setJobs(data);
                    setNoMatchesMessage(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            const encodedQuery = encodeURIComponent(searchQuery);
            getJobsByQuery(encodedQuery)
                .then((data) => {
                    setJobs(data);
                    if (data.length === 0) {
                        setNoMatchesMessage(true);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [searchQuery]);

    return (
        <>
            <div className="flex flex-col text-left m-4 lg:m-4">
                <div className="flex flex-col justify-between items-center mb-4 lg:flex lg:flex-row">
                    <h1 className="text-primary text-2xl p-4 font-extrabold">Browse Job Listings</h1>
                    <div className="w-fit h-8 flex flex-row justify-between items-center p-2 border-neutral-200 border-2 rounded-md shadow-sm">
                        <input
                            type="search"
                            placeholder="Search job..."
                            className="px-1 focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <SearchIcon className="text-primary" />
                    </div>
                </div>

                <div className="w-full bg-neutral-200 flex flex-col items-center justify-center p-4 rounded-md lg:flex lg:flex-row lg:flex-wrap md:flex md:flex-row md:flex-wrap">
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
                    {noMatchesMessage && (
                        <span>There are no matches for this search.</span>
                    )}
                </div>
            </div>
        </>
    );
}

export default DisplayAllJobsAndSearch