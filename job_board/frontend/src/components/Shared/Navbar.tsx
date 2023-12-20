import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Icon from '../../assets/NavIcon.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NavbarMenu from './NavbarMenu';

function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const { userId, userName } = useAuth();

    const toggleMenu = (): void => {
        setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    };

    return (
        <>
            <div className='w-full h-12 flex flex-row items-center justify-between bg-primary text-white p-2'>
                <div className='flex flex-row text-sm items-center justify-center'>
                    <Link to={'/'}><img src={Icon} alt='HireHub Icon' width='40vw' /></Link>
                    {userName &&
                        <span className='ml-12'>Welcome, {userName}!</span>
                    }
                </div>
                <div className='flex flex-row items-center justify-center'>
                    <div onClick={toggleMenu}>
                        <AccountCircleIcon />
                    </div>
                    {!userId &&
                        <div className='cursor-pointer'>
                            <Link to={'/login'} className='mx-4'>Log In</Link>
                        </div>
                    }
                    {userId &&
                        <div className='cursor-pointer'>
                            <Link to={'/login'} className='mx-4'>Log Out</Link>
                        </div>
                    }
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