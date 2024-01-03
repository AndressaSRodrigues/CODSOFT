import { Link } from 'react-router-dom'
import QuizHub from '../../assets/QuizHub.png'
import { useAuth } from '../../context/AuthContext'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

function Navbar() {
  const { token, username, logout } = useAuth();

  const handleLogout = () => {
    logout('', '', '');
  };

  return (
    <>
      <div className="w-full h-14 flex flex-row items-center justify-between bg-neutral-200 text-primary p-2 shadow-md">
        <div>
          <img src={QuizHub} alt='QuizHub Brand' width='100vw' />
        </div>
        <div className='text-sm'>
        {token && (
            <span className='mr-10'><EmojiPeopleIcon /> Hello, {username}!</span>
          )}
          {!token && (
            <Link to={'/login'}>
              Login
            </Link>
          )}
          {token && (
            <Link to={'/'}>
              <button onClick={handleLogout}>
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