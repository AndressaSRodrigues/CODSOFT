import Navbar from "../components/Shared/Navbar"
import DisplayApplicationsByUser from "../components/Applications/DisplayApplicationsByUser";
import { JobDetailsProvider } from "../context/JobDetailsContext";

function DashboardPerson() {



  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center m-12 gap-4 lg:flex lg:flex-row lg:items-start lg:m-16 lg:mx-52">
        <div>
          <JobDetailsProvider>
            <DisplayApplicationsByUser />
          </JobDetailsProvider>
        </div>
      </div>
    </>
  )
}

export default DashboardPerson