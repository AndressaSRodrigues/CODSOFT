import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createQuiz } from '../../services/quizzes';
import { useNavigate } from 'react-router-dom';
import QuizRules from './QuizRules';
import AddBoxIcon from '@mui/icons-material/AddBox';

type FormData = {
    title: string;
    theme: string;
    questions: {
        text: string;
        options: string[];
        correctOptionIndex: 0;
    }[];
};

const themeOptions = ['Environment', 'Technology', 'Literature', 'Cinema', 'Geography', 'History'];

function CreateQuizForm() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

    const { handleSubmit, control, watch } = useForm<FormData>({
        defaultValues: {
            title: '',
            theme: '',
            questions: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions'
    });

    const questionCount = watch('questions')?.length || 0;

    const onSubmit = async (data: FormData) => {
        try {
            await createQuiz(token, data);
            navigate('/browse-quizzes');
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: 'Title is required'
                        }}
                        render={({ field, fieldState }) => (
                            <div>
                                <input
                                    type="text"
                                    id="title"
                                    className={'border border-primary rounded-md p-2 w-72'}
                                    placeholder="Title"
                                    {...field}
                                />
                                {fieldState.error && (
                                    <p className="text-primary text-sm">{fieldState.error.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>
                <div className="mb-4">
                    <Controller
                        name="theme"
                        control={control}
                        rules={{
                            required: 'Theme is required',
                        }}
                        render={({ field, fieldState }) => (
                            <div>
                                <select
                                    id="theme"
                                    className={'border border-primary rounded-md p-2 w-72'}
                                    {...field}
                                >
                                    <option value="" disabled>Select a theme</option>
                                    {themeOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {fieldState.error && (
                                    <p className="text-primary text-sm">{fieldState.error.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>
                <div className="mb-4">
                    {fields.map((question, index) => (
                        <div key={question.id} className="mb-2">
                            <div className="flex flex-col items-start gap-2 mb-2">
                                <label>Question {index + 1}:</label>
                                <Controller
                                    name={`questions.${index}.text`}
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            className="border border-primary rounded-md p-2 w-72"
                                            type="text"
                                            {...field}
                                            placeholder="Enter question"
                                        />
                                    )}
                                />

                                {Array.from({ length: 4 }).map((_, optionIndex) => (
                                    <div key={optionIndex} className="flex flex-row items-start gap-2">
                                        <Controller
                                            name={`questions.${index}.options.${optionIndex}`}
                                            rules={{
                                                required: 'Option text is required'
                                            }}
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    type="text"
                                                    {...field}
                                                    placeholder={`Option ${optionIndex + 1}`}
                                                    className="border border-primary rounded-md p-2 w-72"
                                                />
                                            )}
                                        />
                                        <label className="ml-2">
                                            <Controller
                                                name={`questions.${index}.correctOptionIndex`}
                                                control={control}
                                                rules={{
                                                    validate: (value) => {
                                                        return value >= 0 || 'Please select at least one correct option';
                                                    },
                                                }}
                                                render={({ field }) => (
                                                    <input
                                                        type="radio"
                                                        {...field}
                                                        defaultChecked={optionIndex === 0}
                                                        value={optionIndex}
                                                        className='mr-2'
                                                    />
                                                )}
                                            />
                                            Correct
                                        </label>
                                    </div>
                                ))}
                                <button type="button"
                                    onClick={() => remove(index)}
                                    className="text-neutral-500 text-xs">
                                    Remove Question
                                </button>
                            </div>
                        </div>
                    ))}

                    {questionCount < 10 && (
                        <button
                            type="button"
                            onClick={() => append({ text: '', options: ['', '', '', ''], correctOptionIndex: 0 })}
                            className="text-primary my-4">
                            <AddBoxIcon />  Add Question
                        </button>
                    )}
                </div>

                {questionCount >= 5 && (
                    <button
                        type="submit"
                        className="w-72 bg-primary text-white font-bold p-2 rounded-md border border-primary hover:bg-neutral-200 hover:text-primary "
                    >
                        Done!
                    </button>
                )}
            </form>

            {isModalOpen && <QuizRules open={true} onClose={handleCloseModal} />}
        </>
    )
}

export default CreateQuizForm