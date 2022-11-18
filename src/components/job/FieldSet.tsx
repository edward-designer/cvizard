import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

import InputField from '@/components/common/InputField';

import { IJob, TNames } from '@/types/types';

interface IFieldSet {
  name: TNames;
  jobDetails: IJob;
}

const FieldSet = ({ name, jobDetails }: IFieldSet) => {
  const checkedState = jobDetails[name] ? true : name === 'init' ? true : false;
  const [checked, setChecked] = useState(checkedState);
  const today = new Date().toISOString().split('T')[0];

  if (checked)
    return (
      <fieldset className='group mb-4 rounded-md border border-slate-500/50 p-2'>
        <legend className='bg-bg-primary p-2 text-lg font-bold capitalize'>
          {name}
        </legend>
        {name !== 'init' && (
          <button
            className='invisible relative -top-4 float-right group-hover:visible'
            type='reset'
            onClick={() => {
              setChecked(!checked);
            }}
            aria-label={`clear ${name} fields`}
          >
            <CloseIcon className='text-slate-500/50 hover:text-primary-800/50' />
          </button>
        )}
        <InputField
          name={name}
          title='Date'
          type='date'
          value={jobDetails[name] || today}
        />
        <textarea
          name={`${name}Notes`}
          placeholder='Write your notes here.'
          className='mb-2 w-full rounded-md border text-text-primary outline-none dark:bg-bg-primary'
          defaultValue={jobDetails[`${name}Notes`] || ''}
        />
      </fieldset>
    );

  return (
    <div className='border-b border-dotted border-slate-500/50 py-4'>
      <input
        type='checkbox'
        name={`${name}Checkbox`}
        id={`${name}Checkbox`}
        className='p-2'
        onClick={() => {
          setChecked(!checked);
        }}
      />
      <label
        htmlFor={`${name}Checkbox`}
        className='p-2 text-lg font-bold capitalize'
      >
        {name}
      </label>
    </div>
  );
};

export default FieldSet;
