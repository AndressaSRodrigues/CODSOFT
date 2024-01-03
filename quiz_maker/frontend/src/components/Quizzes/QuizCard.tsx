import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import MoodIcon from '@mui/icons-material/Mood';
import getThemeColor from '../../utils/themeColor';

interface QuizCardProps {
  title: string;
  theme: string;
  questions: number;
  author: string;
}

function QuizCard({ title, theme, questions, author }: QuizCardProps) {

  const themeColor = getThemeColor(theme);

  return (
    <div className={`w-72 h-56 rounded-lg shadow-md text-lg bg-${themeColor}`}>
      <h2 className={`bg-${themeColor} p-4 mb-2 text-white font-bold rounded-lg`}>{title}</h2>
      <div className="flex flex-col items-start justify-center gap-4 mx-2 p-4 text-neutral-500 rounded-lg">
        <span>
          <QuestionAnswerIcon /> {theme}
        </span>
        <span>
          <FormatListNumberedIcon /> {questions}
        </span>
        <span className='text-sm italic'>
          <MoodIcon /> {author}
        </span>
      </div>
    </div>
  );
}

export default QuizCard;
