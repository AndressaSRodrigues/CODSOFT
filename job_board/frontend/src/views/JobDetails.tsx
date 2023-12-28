import { JobDetailsProvider } from "../context/JobDetailsContext";
import JobDetailsInfo from "../components/Jobs/JobDetailsInfo";
import JobDetailsActions from "../components/Jobs/JobDetailsActions";

function JobDetails() {
    return (
        <>
            <div className="flex flex-col items-center m-8 gap-4 lg:flex lg:flex-row lg:items-start lg:m-16 lg:mx-52">
                <JobDetailsProvider>
                    <JobDetailsInfo />
                    <JobDetailsActions />
                </JobDetailsProvider>
            </div>
        </>
    )
};

export default JobDetails
