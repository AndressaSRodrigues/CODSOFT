import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { deleteUserByEmail } from '../../services/users';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    open: boolean;
    onClose: () => void;
}

function DeleteUserModal({ open, onClose }: ModalProps) {
    const { token, userEmail } = useAuth();
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    const handleDeleteUser = async (token: string, userEmail: string) => {
        try {
            await deleteUserByEmail(token, userEmail);
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName');
            setSuccessMessage(true);
        } catch (error) {
            console.error(error)
        }
    };

    const modalStyle = `
        w-fit
        h-fit
        absolute
        top-1/2
        left-1/2
        transform -translate-x-1/2 -translate-y-1/2
        w-400
        bg-neutral-100
        border-black
        shadow-sm
        shadow-primary
        rounded-md
        p-4
        backdrop-filter backdrop-blur-sm
        pointer-events-auto
    `;

    const backdropStyle = `
        fixed
        inset-0
        bg-black
        opacity-30
        pointer-events-none
    `;

    return (
        <div>
            {open && (
                <>
                    <div className={backdropStyle}></div>
                    <div className={modalStyle}>
                        {!successMessage && (
                            <>
                                <div className="flex flex-row justify-between">
                                    <h1 className="text-primary text-2xl font-bold mb-6">Delete Account</h1>
                                    <CloseIcon className="text-primary cursor-pointer" onClick={onClose} />
                                </div>
                                <div className='flex flex-col justify-start'>
                                    <span className="text-lg mb-4">Are you sure you want to delete your account?</span>
                                    <span className="text-sm mb-4">This action is permanent and all your applications will be lost.</span>
                                    <div className='flex flex-row items-end justify-end gap-4 mt-4'>
                                        <button
                                            onClick={onClose}
                                            className='w-16 h-8 p-1 bg-neutral-400 rounded-md shadow-sm text-sm text-white'>
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(token, userEmail)}
                                            className='w-44 h-8 p-1 bg-primary rounded-md shadow-sm text-sm text-white'>
                                            Yes, delete my account.
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                        {successMessage && (
                            <div className='flex flex-col items-center justify-center gap-4'>
                                <span className='text-2xl'>Your account has been deleted.</span>
                                <span className='text-md'>You're welcome to join us again whenever you want.</span>
                                <button className='w-16 h-8 p-1 bg-primary rounded-md shadow-sm text-sm text-white'><Link to={'/'}>Close</Link></button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default DeleteUserModal