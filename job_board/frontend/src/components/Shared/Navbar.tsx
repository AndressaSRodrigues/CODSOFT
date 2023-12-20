import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Icon from '../../assets/NavIcon.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarMenu from './NavbarMenu';

function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    const toggleMenu = (): void => {
        setMenuOpen((prevMenuOpen) => !prevMenuOpen);
      };

    return (
        <>
            <div className='w-full h-12 flex flex-row items-center justify-between bg-primary text-white p-2'>
                <div className='flex flex-row text-sm'>
                    <Link to={'/'}><img src={Icon} alt='HireHub Icon' width='40vw' /></Link>
                    <Link to={'/all-jobs'} className='mt-2 mx-4'>Jobs</Link>
                    <Link to={'/create-account'} className='mt-2 mx-4'>Create Account</Link>
                </div>
                <div onClick={toggleMenu} className='cursor-pointer'>
                    <AccountCircleIcon />
                    <Link to={'/login'} className='mx-4'>Log In</Link>
                </div>
            </div>
            {isMenuOpen &&
                <div className='absolute right-0'>
                    <NavbarMenu />
                </div>
            }
        </>
    );
}
export default Navbar;