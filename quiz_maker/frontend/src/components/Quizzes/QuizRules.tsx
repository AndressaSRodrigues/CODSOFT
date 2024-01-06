import { QuizRulesProps } from "../../interfaces/QuizRulesProps";
import CloseIcon from "@mui/icons-material/Close";

function QuizRules({ open, onClose }: QuizRulesProps) {
    const modalStyle = `
    w-[95vw]
    lg:w-fit
    h-fit
    absolute
    top-1/2
    left-1/2
    transform -translate-x-1/2 -translate-y-1/2
    w-400
    bg-neutral-200
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
                            <h1 className="text-primary text-2xl font-bold mb-6">Important!</h1>
                            <CloseIcon className="text-primary cursor-pointer" onClick={onClose} />
                        </div>
                        <div className="flex flex-col items-center justify-center lg:p-4 lg:gap-4">
                            <p className="font-bold font-lg">Please, read before posting a quiz:</p>
                            <ul className="m-2 list-outside">
                                <li className="my-2 lg:my-4"><span className="text-primary">Minimum and Maximum Questions and Options</span>
                                    <ul className="ml-4 list-disc">
                                        <li>Each quiz must contain a minimum of 5 questions.</li>
                                        <li>There is a limit of 10 questions per quiz.</li>
                                        <li>Each question must contain 4 options.</li>
                                        <li>A corrected option must be selected.</li>
                                    </ul>
                                </li>

                                <li className="my-2 lg:my-4"><span className="text-primary">Language and Content</span>
                                    <ul className="ml-4 list-disc">
                                        <li>Avoid the use of profanity or offensive language.</li>
                                        <li>Refrain from including inappropriate topics.</li>
                                    </ul>
                                </li>
                            </ul>
                            <button
                                onClick={onClose}
                                className="w-60 bg-primary text-white font-bold p-2 rounded-md border border-primary hover:bg-neutral-200 hover:text-primary mt-4">
                                Got it!
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default QuizRules;
