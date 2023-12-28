import { useJobDetails } from "../../context/JobDetailsContext";
import SendApplicationForm from "./SendApplicationForm";
import Modal from "../Shared/Modal";

interface SendApplicationModalProps {
    open: boolean;
    onClose: () => void;
};

function SendApplicationModal({ open, onClose }: SendApplicationModalProps) {
    const { jobTitle, companyName } = useJobDetails();

    return (
        <>
            {open && (
                <>
                    <Modal title="Application" open={open} onClose={onClose}>
                        <div className="flex flex-col justify-start">
                            <span className="text-lg mb-4">You're applying to {jobTitle} at {companyName}.</span>
                            <span className="text-sm">Please, upload your CV.</span>
                            <span className="text-sm mb-4">Your information you'll be shared with the company.</span>
                            <SendApplicationForm />
                        </div>
                    </Modal>

                </>
            )}
        </>
    );
};

export default SendApplicationModal;
