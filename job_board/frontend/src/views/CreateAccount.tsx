import RegisterForm from "../components/Auth/RegisterForm";
import HomePagePhoto from "../assets/Home.png";
import Logo from "../assets/HireHub.png";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function CreateAccount() {
  return (
    <>
      <div className="lg:w-fit h-fit flex flex-col text-center items-center mt-4 lg:flex lg:flex-row lg:mt-4 lg:mb-0">
        <div className="w-1/2 flex justify-center">
          <img src={HomePagePhoto} alt="Home Page Picture" className="lg:w-[60%]" />
        </div>
        <div className="lg:w-1/2 flex flex-col items-center">
          <img src={Logo} alt="HireHub Logo" width="75%" className="mb-4" />
          <p className="text-neutral-600 text-lg font-bold mb-8">Create an account to start your search <AutoAwesomeIcon /></p>
          <RegisterForm />
        </div>
      </div>
    </>
  )
};

export default CreateAccount
