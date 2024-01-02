import { Link } from "react-router-dom";
import { GitHub } from "@mui/icons-material";
import { LinkedIn } from "@mui/icons-material";

function Footer() {
  return (
    <>
    <div className="w-full h-14 flex flex-row items-center justify-center text-primary p-2 gap-2">
      <Link to={"https://github.com/AndressaSRodrigues"} target="_blank"><GitHub /></Link>
      <Link to={"https://www.linkedin.com/in/andressa-webdev/"} target="_blank"><LinkedIn /></Link>
    </div>
  </>
  )
}

export default Footer