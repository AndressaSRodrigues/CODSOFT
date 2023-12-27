import Modal from "../Shared/Modal";
import { Link } from "react-router-dom";
import { ModalProps } from "../../interfaces/ModalProps";

function ConfirmRegistrationModal({ title, open, onClose }: ModalProps) {
    return (
        <Modal title={title} open={open} onClose={onClose}>
            <>
                <div className="flex flex-col items-center justify-center gap-8">
                    <span>Your account has been successfully created!</span>
                    <Link
                        to={'/login'}
                        className="w-44 h-8 p-1 bg-primary rounded-md shadow-sm text-sm text-white">Login into your account</Link>
                </div>
            </>
        </Modal>
    )
}

export default ConfirmRegistrationModal