import React, { SyntheticEvent } from 'react';

import Button from '@/components/buttons/Button';
import MDEditor from '@/components/common/MDEditor';

interface IContentEditor {
  title: string;
  content: string;
  handleSubmit: (e: SyntheticEvent) => void;
  changeHandler: (text: string) => void;
  isLoading: boolean;
}

const ContentEditor = ({
  title,
  content,
  handleSubmit,
  changeHandler,
  isLoading,
}: IContentEditor) => {
  return (
    <div className='col-span-2 col-start-1 md:col-span-3 md:col-start-2'>
      <form onSubmit={handleSubmit}>
        <MDEditor
          name='description'
          title={title}
          value={content}
          preview={true}
          changeHandler={changeHandler}
        />
        <div className='col-span-2 text-right md:col-start-2'>
          <Button variant='primary' type='submit' isLoading={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContentEditor;
