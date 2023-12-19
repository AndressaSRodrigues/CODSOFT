import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Icon from '../assets/NavIcon.png';

function Navbar() {

    return (
        <>
            <div className='w-screen h-12 flex flex-row items-center justify-between bg-primary text-white'>
                <div className='flex flex-row ml-4'>
                    <img src={Icon} alt='HireHub Icon' width='40vw' />
                    <div className='ml-10 mt-1'>
                        <a href='' className='mx-5'>Jobs</a>
                        <a href='' className='mx-5'>Create Account</a>
                    </div>
                </div>
                <AccountCircleIcon className='text-white mr-2' />
            </div>
        </>
    );
}
export default Navbar;