import HireHubLogo from '../assets/HireHub.png';
import HomePagePhoto from '../assets/Home.png';

function HomePage() {
    return (
        <div className='w-screen flex flex-col text-center items-center lg:flex lg:flex-row'>
            <div className='w-fit flex justify-center'>
                <img src={HomePagePhoto} alt="Home Page Picture" width='70%' />
            </div>
            <div className='w-fit flex flex-col items-center'>
                <img src={HireHubLogo} alt="HireHub Logo" width='75%' className='lg:mb-12' />
                <p className='text-neutral-600 text-sm mx-5 lg:text-2xl'>
                    Welcome to HireHub, <br />
                    your all-in-one job search platform.<br />
                    HireHub connects individuals with their ideal jobs and helps companies find perfect candidates.
                </p>
            </div>
        </div>
    )
}

export default HomePage