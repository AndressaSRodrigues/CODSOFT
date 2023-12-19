import JobDetailsInfo from "../components/JobDetailsInfo";
import Navbar from "../components/Navbar"
import JobDetailsActions from "../components/JobDetailsActions";

function JobDetails() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center m-8 gap-4 lg:flex lg:flex-row lg:items-start lg:m-16 lg:mx-52">
                <JobDetailsInfo />
                <JobDetailsActions />
            </div>
        </>
    )
}

export default JobDetails