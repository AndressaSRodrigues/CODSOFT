import { useForm, Controller } from 'react-hook-form';

type FormData = {
  title: string,
  theme: string,
  questions: Array<{
    text: string;
    options: string[];
    correctOptionIndex: number;
  }>
}

const themeOptions = ['Environment', 'Technology', 'Literature', 'Cinema', 'Geography', 'History'];

function CreateQuiz() {

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      title: '',
      theme: '',
      questions: []
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('sent:', data)
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
        <button
          type="submit"
          className="w-72 bg-primary text-white font-bold p-2 rounded-md border border-primary hover:bg-neutral-200 hover:text-primary "
        >
          Done!
        </button>
      </form>
    </>
  )
}

export default CreateQuiz