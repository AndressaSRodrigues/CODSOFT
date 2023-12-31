import React from "react";
import { ModalProps } from "../../interfaces/ModalProps";
import CloseIcon from "@mui/icons-material/Close";

const Modal: React.FC<ModalProps> = ({ title, open, onClose, children }) => {
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
    z-10
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
                            <h1 className="text-primary text-2xl font-bold mb-6">{title}</h1>
                            <CloseIcon className="text-primary cursor-pointer" onClick={onClose} />
                        </div>
                        {children}
                    </div>
                </>
            )}
        </>
    );
};

export default Modal;
