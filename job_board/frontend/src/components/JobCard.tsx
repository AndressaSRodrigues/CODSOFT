import { JobCardProps } from "../interfaces/JobCard"

function JobCard({ title, level, company, location, salary, }: JobCardProps) {
    return (
        <>
            <div className='w-72 h-60 flex flex-col bg-neutral-100 rounded-md shadow-md m-2 p-4'>
                <div className='h-56 flex flex-col gap-1'>
                    <h2 className="font-bold text-lg">
                        {title}
                    </h2>
                    <span>{level}</span>
                    <span>{company}</span>
                    <span>{location}</span>
                    <span>${salary}</span>
                </div>
                <div className="flex justify-end">
                    <button className="w-12 h-8 bg-primary rounded-md shadow-sm text-sm text-white">Apply</button>
                </div>
            </div>

        </>
    )
}

export default JobCard