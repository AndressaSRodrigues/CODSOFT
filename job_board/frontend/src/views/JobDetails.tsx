import JobDetailsInfo from "../components/Jobs/JobDetailsInfo";
import Navbar from "../components/Shared/Navbar"
import JobDetailsActions from "../components/Jobs/JobDetailsActions";

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