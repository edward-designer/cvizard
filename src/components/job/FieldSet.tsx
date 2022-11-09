import InputField from '@/components/common/InputField';

import { IJob, TNames } from '@/types/types';

interface IFieldSet {
  name: TNames;
  jobDetails: IJob;
}

const FieldSet = ({ name, jobDetails }: IFieldSet) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <fieldset className='mb-4 rounded-md border p-2'>
      <legend className='bg-bg-primary p-2 text-lg font-bold capitalize'>
        {name}
      </legend>
      <InputField
        name={name}
        title='Date'
        type='date'
        value={jobDetails[name] || name === 'init' ? today : ''}
      />
      <textarea
        name={`${name}Notes`}
        placeholder='Write your notes here.'
        className='mb-2 w-full rounded-md border text-text-primary outline-none dark:bg-bg-primary'
      >
        {jobDetails[`${name}Notes`] || ''}
      </textarea>
    </fieldset>
  );
};

export default FieldSet;
