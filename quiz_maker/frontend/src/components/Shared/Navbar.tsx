import { Link } from 'react-router-dom'
import QuizHub from '../../assets/QuizHub.png'

function Navbar() {
  return (
    <>
    <div className="w-full h-14 flex flex-row items-center justify-between bg-neutral-200 text-primary p-2 shadow-md">
      <div>
        <img src={QuizHub} alt='QuizHub Brand' width='100vw' />
      </div>
      <div>
        <Link to={'/login'}>Login</Link>
      </div>
    </div>
    </>
  )
}

export default Navbar