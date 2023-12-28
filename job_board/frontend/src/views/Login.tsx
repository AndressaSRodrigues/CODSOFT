import Logo from "../assets/HireHub.png";
import LoginForm from "../components/Auth/LoginForm";
import HomePagePhoto from "../assets/Home.png";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function Login() {
    return (
        <>
            <div className="lg:w-fit h-fit flex flex-col text-center items-center mt-8 mb-32 lg:flex lg:flex-row lg:mt-12">
                <div className="w-1/2 flex justify-center">
                    <img src={HomePagePhoto} alt="Home Page Picture" className="lg:w-[60%]" />
                </div>
                <div className="lg:w-1/2 flex flex-col items-center mb-16">
                    <img src={Logo} alt="HireHub Logo" width="75%" className="mb-4" />
                    <p className="text-neutral-600 text-lg font-bold mb-8">Login to find your next gig or talent <AutoAwesomeIcon /></p>
                    <LoginForm />
                </div>
            </div>
        </>
    )
};

export default Login
