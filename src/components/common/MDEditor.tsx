import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { useEffect, useRef, useState } from 'react';

import Button from '@/components/buttons/Button';
import MDPreviewer from '@/components/common/MDPreviewer';
interface IMDEditor {
  name: string;
  title: string;
  value?: string;
  showPreview?: boolean;
  changeHandler?: (text: string) => void;
}

const MDEditor = ({
  name,
  title,
  value = '',
  changeHandler,
  showPreview = true,
}: IMDEditor) => {
  const [val, setVal] = useState(value);
  const [preview, setPreview] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (changeHandler) {
      changeHandler(e.target.value);
    }
    setVal(e.target.value);
  };

  const changeEditorWidth = () => {
    const windowWidth =
      document.querySelector('form')?.offsetWidth || window.innerWidth;
    const a4WidthInPixels = 793 + 30;
    const a4HeightInPixels = 1123;
    let scaleRatio = windowWidth / a4WidthInPixels;
    if (scaleRatio > 1) scaleRatio = 1;
    if (editorRef.current) {
      editorRef.current.style.transform = `scale(${scaleRatio})`;
      editorRef.current.style.marginBottom = `${
        -a4HeightInPixels * (1 - scaleRatio) + 30
      }px`;
    }
  };

  const buttonClickHandler = () => {
    setPreview(!preview);
  };

  useEffect(() => {
    changeEditorWidth();
    window.addEventListener('resize', changeEditorWidth);
    return () => window.removeEventListener('resize', changeEditorWidth);
  }, [preview]);

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
            <MDPreviewer ref={editorRef} content={val} />
          </div>
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
            className='mb-2 aspect-square w-full rounded-md border text-text-primary outline-none dark:bg-bg-primary'
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
