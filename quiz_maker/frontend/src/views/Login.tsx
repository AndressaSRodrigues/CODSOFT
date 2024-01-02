import QuizHub from '../assets/QuizHub.png';
import HomePhoto from '../assets/Home.jpg';
import LoginForm from '../components/Auth/LoginForm';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <div className='flex flex-col items-center justify-center m-4 lg:flex lg:flex-row'>
        <div className='w-fit lg:w-2/3'>
          <img src={HomePhoto} alt="girl" className='rounded-md' />
        </div>
        <div className='lg:w-1/3 flex flex-col items-center m-4 gap-6 text-center lg:gap-12 lg:m-16'>
          <img src={QuizHub} alt="QuizHub Logo" className='w-52 lg:w-72 mb-6' />
          <LoginForm />
          <Link
            to={'/create-account'}
            className='text-primary text-sm'
          >
            Don't have an account? Create one here.
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login