import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ModalProps } from '../../interfaces/ModalProps';
import { deleteUserByEmail } from '../../services/users';
import Modal from '../Shared/Modal';

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

    return (
        <div>
            {open && (
                <>
                    <Modal title='Delete Account' open={open} onClose={onClose}>
                    {!successMessage && (
                        <>
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
                    </Modal>
                </>
            )}
        </div>
    );
}

export default DeleteUserModal