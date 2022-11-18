import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { useState } from 'react';

import Button from '@/components/buttons/Button';
import PDFView from '@/components/common/PDFView';

interface IMDEditor {
  name: string;
  title: string;
  value?: string;
  showPreview?: boolean;
  changeHandler?: (text: string) => void;
  className?: string;
}

const MDEditor = ({
  name,
  title,
  value = '',
  changeHandler,
  showPreview = true,
  className = '',
}: IMDEditor) => {
  const [val, setVal] = useState(value);
  const [preview, setPreview] = useState(false);

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (changeHandler) {
      changeHandler(e.target.value);
    }
    setVal(e.target.value);
  };

  const buttonClickHandler = () => {
    setPreview(!preview);
  };

  return (
    <>
      <label
        htmlFor={name}
        className='mb-2 block font-semibold text-text-primary dark:text-slate-500'
      >
        {title}
      </label>
      {preview ? (
        <>
          <div className='text-right'>
            <Button
              className='border-0 bg-primary-900/10 text-xs hover:bg-primary-900/90 hover:text-white dark:bg-primary-900/50 dark:hover:bg-primary-900/90'
              variant='outline'
              onClick={buttonClickHandler}
            >
              <EditIcon /> Edit
            </Button>
          </div>
          <div className='mb-4 bg-primary-900/10 p-2 dark:bg-primary-900/50'>
            <PDFView val={[val]} docType='' docId='' previewOnly={true} />
          </div>
          <textarea
            name={name}
            className='hidden'
            placeholder=''
            value={val}
            onChange={handleEditorChange}
          />
        </>
      ) : (
        <>
          {showPreview && (
            <Button
              className='float-right -mb-1 border-0 bg-primary-900/10 text-xs hover:bg-primary-900/90 hover:text-white dark:bg-primary-900/50 dark:hover:bg-primary-900/90'
              variant='outline'
              onClick={buttonClickHandler}
            >
              <PreviewIcon /> Preview
            </Button>
          )}
          <textarea
            name={name}
            className={`mb-2 w-full rounded-md border text-text-primary outline-none dark:bg-bg-primary ${className}`}
            placeholder='Write your markdown here'
            value={val}
            onChange={handleEditorChange}
          />
        </>
      )}
    </>
  );
};

export default MDEditor;
