export interface QuizProps {
    _id: string | undefined;
    title: string;
    theme: string;
    questions: Array<{
        text: string;
        options: string[];
        correctOptionIndex: number;
    }>;
    createdBy: string;
    createdAt: Date;
}
