import { useState } from "react";
import CreateJob from "../components/JobsManagement/CreateJob";
import JobsByUser from "../components/JobsManagement/JobsByUser";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

function DashboardCompany() {
  const [isJobCreated, setIsJobCreated] = useState<boolean>(false);

  const handleJobCreated = () => {
    setIsJobCreated(true);
  };

  const titleStyle = "text-primary text-2xl font-bold mb-6";

  return (
    <>
      <div className="flex flex-col items-start justify-around m-12 gap-4 lg:flex lg:flex-row lg:items-start lg:m-16 lg:mx-52">
        <div>
          <h1 className={titleStyle}><PostAddIcon /> New Job</h1>
          <CreateJob onJobCreated={handleJobCreated} />
        </div>
        <div className="mt-8 lg:mt-0">
          <h1 className={titleStyle}><SettingsSuggestIcon /> Manage Jobs</h1>
          <div className="bg-neutral-200 py-4 px-2 rounded-md shadow-sm lg:px-12">
            <JobsByUser isJobCreated={isJobCreated} />
          </div>
        </div>
      </div>
    </>
  )
};

export default DashboardCompany
