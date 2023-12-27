import { Link } from "react-router-dom";
import { JobCardProps } from "../../interfaces/JobCardProps";

function JobCard({ _id, title, level, company, location, salary }: JobCardProps) {
    return (
        <>
            <div className="w-72 h-60 flex flex-col bg-neutral-100 rounded-md shadow-md m-2 p-4">
                <div className="h-56 flex flex-col gap-1">
                    <h2 className="font-bold text-lg">
                        {title}
                    </h2>
                    <span>{level}</span>
                    <span>{company}</span>
                    <span>{location}</span>
                    <span>${salary}</span>
                </div>
                <div className="flex justify-end">
                    <Link to={`/job/${_id}`}
                        className="w-fit h-8 p-1 bg-primary rounded-md shadow-sm text-sm text-white">
                        See details
                    </Link>
                </div>
            </div>
        </>
    )
};

export default JobCard
