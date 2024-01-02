import { Link } from 'react-router-dom';
import QuizHub from '../assets/QuizHub.png';

function Home() {

  const buttonStyle = 'w-40 h-40 bg-primary rounded-md shadow-md text-lg text-white font-bold hover:bg-blue';

  return (
    <>
      <div className='flex flex-col items-center m-16 gap-12 text-center lg:m-10'>
        <img src={QuizHub} alt="QuizHub Logo" className='w-52 lg:w-72' />
        <div className='flex flex-col bg-blue p-4 rounded-md font-bold text-white'>
          <span className='text-primary bg-blue p-1'>
            Welcome to QuizHub!
          </span>
          <span className='bg-blue'>
            Create quizzes and challenge your friends!
          </span>
        </div>
        <div className='flex flex-row gap-4'>
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
    </>
  )
}

export default Home