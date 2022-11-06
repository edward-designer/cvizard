import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

import Button from '@/components/buttons/Button';
import ScoreCircle from '@/components/common/ScoreCircle';

import { IJob } from '@/types/types';

interface IScoreCard {
  job: IJob;
  clickHandler: () => void;
}

const ScoreCard = ({ job, clickHandler }: IScoreCard) => {
  return (
    <div className='group relative flex flex-col bg-primary-400/10 p-2 text-primary-900 hover:bg-primary-200/50 dark:hover:bg-primary-800/40 md:p-4 [&_div]:leading-4'>
      <div className='flex-1'>
        <div className='text-[0.75em] text-text-primary'>{job.date}</div>
        <h2 className='my-1 text-lg font-bold leading-4'>{job.jobTitle}</h2>
        <div className='text-text-primary'>@ {job.employer}</div>
      </div>
      <div className='my-4 flex place-content-center gap-0 md:gap-2'>
        <ScoreCircle score={job.scoreCV} name='CV' />
      </div>
      <div className='invisible mt-4 flex justify-center gap-2 text-xs group-hover:visible '>
        <Button
          onClick={clickHandler}
          variant='ghost'
          className='block flex-1 text-center text-text-primary'
          aria-label='use this CV as the base to edit'
        >
          <EditIcon className='text-primary-900' /> Use this as template
        </Button>
      </div>
    </div>
  );
};

export default ScoreCard;
