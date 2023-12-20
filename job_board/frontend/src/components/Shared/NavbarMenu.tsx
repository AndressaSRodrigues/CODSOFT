import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"

function NavbarMenu() {
  const { userRole } = useAuth();

  return (
    <>
      <div className="w-40 h-36 flex flex-col gap-2 bg-neutral-100 rounded-sm shadow-md p-2">
        <button>Profile</button>

        {userRole === 'company' && (
          <button><Link to={'/dashboard/c'}>Dashboard</Link></button>
        )}
        {userRole === 'person' && (
          <button><Link to={'/dashboard/p'}>Dashboard</Link></button>
        )}

        <button>Settings</button>
        <button>Log Out</button>
      </div>
    </>
  )
}

export default NavbarMenu