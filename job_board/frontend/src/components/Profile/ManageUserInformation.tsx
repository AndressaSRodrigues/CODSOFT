import { useState } from "react";
import DeleteUserModal from "./DeleteUserModal";

function ManageUserInformation() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);

    const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

    const hoverStyle = 'cursor-pointer hover:bg-primary hover:text-white hover:rounded-md hover:px-2';

    return (
        <>
            <div className="w-full flex flex-col items-start justify-start text-md gap-2 lg:text-lg lg:my-4">
                <h1 className="text-primary text-2xl font-bold mb-4">Manage Account</h1>
                <span className={hoverStyle}>Edit Name</span>
                <span className={hoverStyle}>Change role</span>
                <span className={hoverStyle}>Change Password</span>
                <span
                    onClick={handleOpenDeleteModal}
                    className={hoverStyle}>
                    Delete my account
                </span>
            </div>
            {isDeleteModalOpen && <DeleteUserModal open={isDeleteModalOpen} onClose={handleCloseDeleteModal} />}
        </>
    )
}

export default ManageUserInformation