import { Link } from 'react-router-dom'
import QuizHub from '../../assets/QuizHub.png'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout('', '', '');
  };

  return (
    <>
      <div className="w-full h-14 flex flex-row items-center justify-between bg-neutral-200 text-primary p-2 shadow-md">
        <div>
          <Link to={'/'}>
            <img src={QuizHub} alt='QuizHub Brand' width='100vw' />
          </Link>
        </div>
        <div className='text-sm flex flex-row gap-8'>
          {!token && (
            <Link to={'/login'}>
              Login
            </Link>
          )}
          {token && (
            <Link to={'/'}>
              <button
                onClick={handleLogout}
                className='text-neutral-600'
              >
                Logout
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar