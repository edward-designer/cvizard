import React from 'react';

import AnimatedListChange from '@/components/common/AnimatedListChange';
import ScoreCircle from '@/components/common/ScoreCircle';

interface IKeywordSidebar {
  notMatchedKeywords: string[];
  score: number;
}

const KeywordSidebar = ({ notMatchedKeywords, score }: IKeywordSidebar) => {
  return (
    <div className='col-span-2 col-start-1 md:col-span-1'>
      <h2 className='mb-2 text-2xl text-primary-900/60 dark:text-primary-700'>
        Keyword Analysis
      </h2>
      <div className='text-primary-900 dark:text-primary-700'>
        <ScoreCircle score={score} name='CV' />
      </div>
      <h2 className='mt-4 mb-2 border-t text-2xl text-primary-900/60 dark:text-primary-700'>
        Keyword Suggestions
      </h2>
      <div className='flex flex-wrap text-xs'>
        <AnimatedListChange classToAdd='text-white bg-primary-900/50 animate-fadeOut'>
          {notMatchedKeywords.map((keyword) => (
            <span
              className='m-1 inline-flex border p-2 dark:border-slate-700'
              key={keyword}
            >
              {keyword}
            </span>
          ))}
        </AnimatedListChange>
      </div>
    </div>
  );
};

export default KeywordSidebar;
