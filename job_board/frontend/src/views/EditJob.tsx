import Navbar from "../components/Shared/Navbar";
import JobDetailsInfo from "../components/Jobs/JobDetailsInfo";
import EditJobForm from "../components/JobsManagement/EditJobForm";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Link } from "react-router-dom";
import { JobDetailsProvider } from "../context/JobDetailsContext";

function EditJob() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start justify-around m-12 gap-4 lg:flex lg:flex-row lg:items-start lg:m-16 lg:mx-28">
        <div>
          <Link to={"/dashboard/c"}>
            <button className="w-16 h-8 border-primary border-2 text-primary rounded-md mb-2">
              <KeyboardReturnIcon />
            </button>
          </Link>
          <JobDetailsProvider>
            <JobDetailsInfo />
          </JobDetailsProvider>
        </div>
        <div className="mt-8 lg:ml-32 lg:mt-0">
          <EditJobForm />
        </div>
      </div>
    </>
  )
};

export default EditJob
