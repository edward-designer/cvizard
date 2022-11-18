import { forwardRef } from 'react';

/*import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';*/
import { drawdown } from '@/lib/drawdown';

interface IMDPreviewer {
  content: string;
}

type Ref = HTMLDivElement;

const MDPreviewer = forwardRef<Ref, IMDPreviewer>(({ content }, ref) => {
  return (
    <div
      id='preview'
      ref={ref}
      className='border text-text-primary outline-none dark:bg-bg-primary'
    >
      <div>{drawdown(content)}</div>
    </div>
  );
});

export default MDPreviewer;
