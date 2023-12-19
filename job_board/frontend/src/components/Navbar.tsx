import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Icon from '../assets/NavIcon.png';

function Navbar() {
    return (
        <>
            <div className='w-screen h-12 flex flex-row items-center justify-between bg-primary text-white p-2'>
                <div className='flex flex-row text-sm'>
                <img src={Icon} alt='HireHub Icon' width='40vw' />
                <a href='' className='mt-2 mx-4'>Jobs</a>
                <a href='' className='mt-2 mx-4'>Create Account</a>
                </div>
                <AccountCircleIcon />
            </div>
        </>
    );
}
export default Navbar;