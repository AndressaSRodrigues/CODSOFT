
import DisplayFeaturedJobs from "../components/Jobs/DisplayFeaturedJobs";
import HomePage from "../components/HomePage";
import Navbar from "../components/Shared/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <HomePage />
      <DisplayFeaturedJobs />
    </>
  )
};

export default Home
