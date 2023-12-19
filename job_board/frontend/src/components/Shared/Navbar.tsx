import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Icon from '../../assets/NavIcon.png';
import { useState } from 'react';
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
                    <img src={Icon} alt='HireHub Icon' width='40vw' />
                    <a href='' className='mt-2 mx-4'>Jobs</a>
                    <a href='/create-account' className='mt-2 mx-4'>Create Account</a>
                </div>
                <div onClick={toggleMenu} className='cursor-pointer'>
                    <AccountCircleIcon />
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