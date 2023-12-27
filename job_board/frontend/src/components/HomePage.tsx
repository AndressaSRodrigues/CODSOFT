import HireHubLogo from "../assets/HireHub.png";
import HomePagePhoto from "../assets/Home.png";

function HomePage() {
    return (
        <div className="lg:w-fit h-fit flex flex-col text-center items-center mt-4 mb-8 lg:flex lg:flex-row lg:mt-0 lg:mb-0">
            <div className="w-1/2 flex justify-center">
                <img src={HomePagePhoto} alt="Home Page Picture" className="lg:w-[60%]" />
            </div>
            <div className="lg:w-1/2 flex flex-col items-center">
                <img src={HireHubLogo} alt="HireHub Logo" width="75%" className="mb-12" />
                <p className="text-neutral-600 text-lg mx-5 lg:text-2xl">
                    Welcome to HireHub,
                    your all-in-one job search platform.<br />
                    HireHub connects individuals with their ideal jobs
                    and helps companies find perfect candidates.
                </p>
            </div>
        </div>
    )
};

export default HomePage
