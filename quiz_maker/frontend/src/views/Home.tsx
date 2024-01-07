import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import QuizHub from '../assets/QuizHub.png';
import HomePhoto from '../assets/Home.jpg';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function Home() {
  const { token } = useAuth();

  return (
    <>
      <div className='flex flex-col items-center justify-center m-4 lg:flex lg:flex-row'>
        <div className='w-fit lg:w-2/3'>
          <img src={HomePhoto} alt="girl" className='rounded-md' />
        </div>
        <div className='lg:w-1/3 flex flex-col items-center m-4 gap-6 text-center lg:gap-12 lg:m-16'>
          <img src={QuizHub} alt="QuizHub Logo" className='w-52 lg:w-72' />
          <div className='w-92 flex flex-col bg-blue p-4 rounded-md font-bold text-white lg:text-2xl'>
            <span className='text-primary bg-blue p-1'>
              Welcome to QuizHub!
            </span>
            <span className='bg-blue'>
              Create quizzes and challenge your friends!
            </span>
          </div>
          <div className='flex flex-col items-start gap-4 text-lg text-primary lg:text-2xl'>
            {!token && (
              <>
                <Link to={'/login'} className='hover:italic'>
                  <KeyboardArrowRightIcon /> Login
                </Link>
                <Link to={'/create-account'} className='hover:italic'>
                  <KeyboardArrowRightIcon /> Create an account
                </Link>
              </>
            )}
            {token && (
              <>
              <Link to={'/create-quiz'} className='hover:italic'>
                <KeyboardArrowRightIcon /> Create a New Quiz
              </Link>
              <Link to={'/take-quiz'} className='hover:italic'>
                <KeyboardArrowRightIcon /> Take a Quiz
              </Link>
            </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home