import HireHubLogo from '../assets/HireHub.png';
import HomePage from '../assets/Home.png';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <>
      <Navbar />
      <div className='flex flex-row items-center justify-center mx-20'>
        <div className='w-full'>
          <img src={HomePage} alt="Home Page Picture" width='75%' />
        </div>
        <div className='w-full justify-start'>
          <img src={HireHubLogo} alt="HireHub Logo" />
          <p className='mt-4 text-lg text-neutral-600 text-center'>
          Welcome to HireHub, your all-in-one job search platform.<br />
          Whether you're searching for new opportunities or recruiting top talent,
          HireHub connects individuals with their ideal jobs and helps companies find perfect candidates.
          </p>
        </div>
      </div>
    </>
  )
}

export default Home