import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

import Button from '@/components/buttons/Button';
import ScoreCircle from '@/components/common/ScoreCircle';

import { IJob } from '@/types/types';

const JobSummaryCard = ({ job }: { job: IJob }) => {
  return (
    <div className='bg-primary-400/10 p-2 text-primary-900 hover:bg-primary-200/50 md:p-4 [&_div]:leading-4'>
      <div className='text-[0.75em] text-text-primary'>{job.date}</div>
      <h2 className='my-1 text-lg font-bold leading-4'>{job.title}</h2>
      <div className='text-text-primary'>@ {job.company}</div>
      <div className='my-4 flex gap-0 md:gap-2 '>
        <ScoreCircle score={30} name='CV' />
        <ScoreCircle score={10} name='Cover Letter' />
      </div>
      <div className='mt-4 flex justify-center gap-2 text-xs'>
        <Button variant='ghost' className='text-text-primary md:flex-1'>
          <EditIcon className='text-primary-900' /> Edit
        </Button>
        <Button variant='ghost' className='text-text-primary md:flex-1'>
          <DownloadIcon className='text-primary-900' /> Download
        </Button>
      </div>
    </div>
  );
};

export default JobSummaryCard;
