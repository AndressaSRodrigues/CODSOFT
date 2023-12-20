import Navbar from "../components/Shared/Navbar"
import SendIcon from '@mui/icons-material/Send'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'

function DashboardPerson() {

  const titleStyle = "text-primary text-2xl font-bold mb-6";

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start justify-around m-12 gap-4 lg:flex lg:flex-row lg:items-start lg:m-16 lg:mx-52">
        <div>
          <h1 className={titleStyle}>Applications Sent <SendIcon /></h1>
        </div>
        <div className="mt-8 lg:ml-32 lg:mt-0">
          <h1 className={titleStyle}>Saved Jobs <BookmarkAddedIcon /></h1>
        </div>
      </div>
    </>
  )
}

export default DashboardPerson