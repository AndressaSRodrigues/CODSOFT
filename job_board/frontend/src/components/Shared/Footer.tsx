import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <>
      <div className="w-full h-14 flex flex-row items-center justify-center bg-white text-primary p-2 gap-2">
        <Link to={"https://github.com/AndressaSRodrigues"} target="_blank"><GitHubIcon /></Link>
        <Link to={"https://www.linkedin.com/in/andressa-webdev/"} target="_blank"><LinkedInIcon /></Link>
      </div>
    </>
  )
};

export default Footer
