import SendApplicationForm from './SendApplicationForm';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';

interface SendApplicationModalProps {
    open: boolean;
    onClose: () => void;
}

function SendApplicationModal({ open, onClose }: SendApplicationModalProps) {
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
        <>
            {open && (
                <>
                    <div className={backdropStyle}></div>
                    <div className={modalStyle}>
                        <div className="flex flex-row justify-between">
                            <h1 className="text-primary text-2xl font-bold mb-6"><EmailIcon className='mb-1' /> Job Application</h1>
                            <CloseIcon className="text-primary cursor-pointer" onClick={onClose} />
                        </div>
                        <div className='flex flex-col justify-start'>
                            <span className="text-lg">Please, upload your resume.</span>
                            <span className="mb-4">Your information you'll be shared with the company.</span>
                            <SendApplicationForm />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default SendApplicationModal;

