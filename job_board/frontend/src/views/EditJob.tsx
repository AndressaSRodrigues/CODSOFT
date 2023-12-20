import Navbar from "../components/Shared/Navbar"
import JobDetailsInfo from "../components/Jobs/JobDetailsInfo"
import EditJobForm from "../components/JobsManagement/EditJobForm"
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { Link } from "react-router-dom"

function EditJob() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start justify-around m-12 gap-4 lg:flex lg:flex-row lg:items-start lg:m-16 lg:mx-52">
        <div>
        <Link to={'/dashboard/c'}>
            <button className="w-16 h-12 border-primary border-2 text-primary rounded-md mb-4">
              <KeyboardReturnIcon />
            </button>
          </Link>
          <JobDetailsInfo />

        </div>
        <div className="mt-8 lg:ml-32 lg:mt-0">
          <EditJobForm />
        </div>
      </div>
    </>
  )
}

export default EditJob