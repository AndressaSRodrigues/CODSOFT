import SendApplicationModal from '../Applications/SendApplicationModal';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SendIcon from '@mui/icons-material/Send';
import FlagIcon from '@mui/icons-material/Flag';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function JobDetailsActions() {
    const { token, userRole } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => setIsModalOpen(false);

    const isUserCompany = userRole === 'company';

    const buttonStyle = 'w-[274px] h-16 p-1 bg-primary rounded-md shadow-sm text-lg text-white';
    return (
        <>
            {token !== '' && (
                <>
                    <div className="w-fit h-fit bg-neutral-100 flex flex-col justify-center rounded-md shadow-md p-4 gap-4">
                        <button
                            className={`${buttonStyle} ${isUserCompany ? 'bg-neutral-400 cursor-not-allowed' : ''}`}
                            onClick={handleOpenModal}
                            disabled={isUserCompany}
                        >Apply  <SendIcon />
                        </button>
                        <Link to={'/'}>
                            <button
                                className='w-[274px] h-16 p-1 border-primary border-2 rounded-md shadow-sm text-lg text-primary' >
                                <KeyboardReturnIcon />
                                Home
                            </button>
                        </Link>
                        <Link to={'/report'}
                            className="text-neutral-500 text-center text-sm">
                            <FlagIcon />
                            Report
                        </Link>
                    </div>
                    {isModalOpen &&
                        <SendApplicationModal
                            open={isModalOpen}
                            onClose={handleCloseModal}
                        />}
                </>
            )}
        </>


    )
}

export default JobDetailsActions