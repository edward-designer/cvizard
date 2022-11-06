import MarkdownIt from 'markdown-it';
import mark from 'markdown-it-mark';
import React, { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';

const mdParser = new MarkdownIt().use(mark);

import 'react-markdown-editor-lite/lib/index.css';

interface IMDEditor {
  name: string;
  title: string;
  value?: string;
  preview?: boolean;
  changeHandler?: (text: string) => void;
}

const MDEditor = ({
  name,
  title,
  value = '',
  preview = false,
  changeHandler,
}: IMDEditor) => {
  const [val, setVal] = useState(value);

  const handleEditorChange = ({ text }: { text: string }) => {
    if (changeHandler) {
      changeHandler(text);
    }
    setVal(text);
  };

  return (
    <div className='mb-6'>
      <label
        htmlFor={name}
        className='text-sm font-semibold text-text-primary dark:text-slate-500'
      >
        {title}
      </label>
      <MdEditor
        onChange={handleEditorChange}
        value={val}
        id={name}
        name={name}
        style={{
          aspectRatio: 210 / 297,
          border: '1px solid #333',
          borderRadius: '5px',
          marginTop: '0.5em',
        }}
        renderHTML={(text) => mdParser.render(text)}
        view={{
          menu: true,
          md: true,
          html: false,
        }}
        canView={{
          menu: true,
          md: true,
          html: preview,
          both: false,
          fullScreen: false,
          hideMenu: false,
        }}
      />
    </div>
  );
};

export default MDEditor;
