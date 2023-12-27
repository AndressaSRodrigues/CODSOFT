import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function NavbarMenu() {
  const { token, userId, userRole, setUser } = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    setUser("", "", "", "", "");
    navigate("/");
  };

  return (
    <>
      {token && (
        <>
          <div className="w-40 h-26 flex flex-col gap-2 bg-neutral-100 rounded-sm shadow-md p-2">
            <button><Link to={`/profile/${userId}`}>Profile</Link></button>
            {userRole === "company" && (
              <button><Link to={"/dashboard/c"}>Dashboard</Link></button>
            )}
            {userRole === "person" && (
              <button><Link to={"/dashboard/p"}>Dashboard</Link></button>
            )}
            {userId &&
              <button onClick={logOut}><Link to={"/"}>Log Out</Link></button>
            }
          </div>
        </>
      )}
    </>
  );
};

export default NavbarMenu;
