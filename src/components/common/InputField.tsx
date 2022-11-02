import React from 'react';

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
  return (
    <div className='mb-6'>
      <label htmlFor={name} className='text-sm font-semibold text-text-primary'>
        {title}
      </label>
      <input
        id={name}
        className='mt-2 block w-full rounded-md border p-2'
        value={value}
        type={type}
      />
    </div>
  );
};

export default InputField;
