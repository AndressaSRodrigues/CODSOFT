import CreateJob from "../components/JobsManagement/CreateJob"
import Navbar from "../components/Shared/Navbar"
import PostAddIcon from '@mui/icons-material/PostAdd'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

function DashboardCompany() {
  return (
    <>
      <Navbar />
      <div className="h-full flex flex-col items-center justify-center my-12 lg:flex lg:flex-row lg:justify-start lg:mx-32">
        <div>
          <h1 className="text-primary text-2xl font-bold mb-6"><PostAddIcon /> New Job</h1>
          <CreateJob />
        </div>
        <div>
          <h1 className="text-primary text-2xl font-bold mb-6"><SettingsSuggestIcon /> Manage Jobs</h1>
        </div>
      </div>
    </>
  )
}

export default DashboardCompany