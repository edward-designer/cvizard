import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useState } from 'react';

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
  const [isResetLoading, setIsResetLoading] = useState(false);
  const router = useRouter();
  const resetHandler = () => {
    setIsResetLoading(true);
    router.reload();
  };

  return (
    <div className='col-span-2 col-start-1 md:col-span-3 md:col-start-2'>
      <form onSubmit={handleSubmit}>
        <MDEditor
          name='description'
          title={title}
          value={content}
          changeHandler={changeHandler}
        />
        <div className='col-span-2 flex flex-row-reverse gap-2 md:col-start-2'>
          <Button
            variant='outline'
            type='reset'
            onClick={resetHandler}
            isLoading={isResetLoading}
          >
            Reset
          </Button>
          <Button
            variant='primary'
            type='submit'
            isLoading={isLoading}
            className='[&_svg]:transition-all [&_svg]:hover:translate-x-1'
          >
            Save <ArrowForwardIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContentEditor;
