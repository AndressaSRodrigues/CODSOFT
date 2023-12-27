import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Icon from '../../assets/NavIcon.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NavbarMenu from './NavbarMenu';

function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const { token, userName } = useAuth();

    const toggleMenu = (): void => {
        setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    };

    return (
        <>
            <div className='w-full h-14 flex flex-row items-center justify-between bg-primary text-white p-2'>
                <div className='flex flex-row text-sm items-center justify-center'>
                    <Link to={'/'} className='ml-4'><img src={Icon} alt='HireHub Icon' width='40vw' /></Link>
                    {userName &&
                        <span className='ml-12'>Welcome, {userName}!</span>
                    }
                </div>
                <div className='flex flex-row items-center justify-center mr-4'>
                <Link to={'/jobs'} className='mr-8'>All Jobs</Link>
                    {token &&
                        <div onClick={toggleMenu} className='cursor-pointer'>
                            <AccountCircleIcon />
                        </div>
                    }
                    {!token &&
                        <div className='cursor-pointer'>
                            <Link to={'/create-account'} className='mx-4'>Create Account</Link>
                            <Link to={'/login'} className='mx-4'>Log In</Link>
                        </div>
                    }
                </div>
            </div>
            {isMenuOpen &&
                <div className='absolute right-0 z-10'>
                    <NavbarMenu />
                </div>
            }
        </>
    );
}
export default Navbar;