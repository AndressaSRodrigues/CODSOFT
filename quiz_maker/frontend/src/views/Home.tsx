import { Link } from 'react-router-dom';
import QuizHub from '../assets/QuizHub.png';
import HomePhoto from '../assets/Home.jpg';

function Home() {

  const buttonStyle = 'w-40 h-40 bg-primary rounded-md shadow-md text-lg text-white font-bold hover:bg-blue';

  return (
    <>
      <div className='flex flex-col items-center justify-center m-4 lg:flex lg:flex-row'>
        <div className='w-fit lg:w-2/3'>
          <img src={HomePhoto} alt="girl" className='rounded-md' />
        </div>
        <div className='lg:w-1/3 flex flex-col items-center m-4 gap-6 text-center lg:gap-12 lg:m-16'>
          <img src={QuizHub} alt="QuizHub Logo" className='w-52 lg:w-72' />
          <div className='w-92 flex flex-col bg-blue p-4 rounded-md font-bold text-white'>
            <span className='text-primary bg-blue p-1'>
              Welcome to QuizHub!
            </span>
            <span className='bg-blue'>
              Create quizzes and challenge your friends!
            </span>
          </div>
          <div className='flex flex-row gap-5'>
            <Link to={'/create-quiz'}>
              <button className={buttonStyle}>
                Create a Quiz
              </button>
            </Link>
            <Link to={'/browse-quizzes'}>
              <button className={buttonStyle}>
                Answer a Quiz
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home