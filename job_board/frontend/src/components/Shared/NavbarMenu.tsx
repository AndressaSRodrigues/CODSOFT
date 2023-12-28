import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface NavbarMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

function NavbarMenu({ isMenuOpen, toggleMenu }: NavbarMenuProps) {
  const { token, userId, userRole, setUser } = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    setUser("", "", "", "", "");
    navigate("/");
  };

  return (
    <>
      {isMenuOpen && (
        <>
          {token && (
            <>
              <div className="w-40 h-26 flex flex-col gap-2 bg-neutral-100 rounded-sm shadow-md p-2">
                <button onClick={toggleMenu}><Link to={`/profile/${userId}`}>Profile</Link></button>
                {userRole === "company" && (
                  <button onClick={toggleMenu}><Link to={"/dashboard/c"}>Dashboard</Link></button>
                )}
                {userRole === "person" && (
                  <button onClick={toggleMenu}><Link to={"/dashboard/p"}>Dashboard</Link></button>
                )}
                {userId &&
                  <button onClick={() => { logOut(); toggleMenu(); }}><Link to={"/"}>Log Out</Link></button>
                }
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default NavbarMenu;
