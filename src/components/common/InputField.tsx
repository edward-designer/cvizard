import { useState } from 'react';

interface IInputField {
  name: string;
  title: string;
  type?: string;
  value?: string;
}

const InputField = ({
  name,
  title,
  type = 'text',
  value = '',
}: IInputField) => {
  const [val, setVal] = useState(value);

  return (
    <div className='mb-6'>
      <label
        htmlFor={name}
        className='text-sm font-semibold text-text-primary dark:text-slate-500'
      >
        {title}
      </label>
      <input
        id={name}
        name={name}
        className='mt-2 block w-full rounded-md border p-2 dark:bg-bg-primary dark:[color-scheme:dark]'
        value={val}
        type={type}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
    </div>
  );
};

export default InputField;
