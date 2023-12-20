import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext"

function NavbarMenu() {
  const { userId, userRole, setUserRole } = useAuth();

  const logOut = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  };

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');

    if (storedUserRole !== userRole) {
      setUserRole(storedUserRole || '');
    }

  }, [userRole, setUserRole])

  return (
    <>
      <div className="w-40 h-26 flex flex-col gap-2 bg-neutral-100 rounded-sm shadow-md p-2">
        <button>Profile</button>
        {userRole === 'company' && (
          <button><Link to={'/dashboard/c'}>Dashboard</Link></button>
        )}
        {userRole === 'person' && (
          <button><Link to={'/dashboard/p'}>Dashboard</Link></button>
        )}
        <button>Settings</button>
        {userId &&
          <button onClick={logOut}><Link to={'/'}>Log Out</Link></button>
        }
      </div>
    </>
  )
}

export default NavbarMenu