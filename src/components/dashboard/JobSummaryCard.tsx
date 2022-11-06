import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

import ScoreCircle from '@/components/common/ScoreCircle';
import ButtonLink from '@/components/links/ButtonLink';

import { IJob } from '@/types/types';

const JobSummaryCard = ({
  job,
  clickHandler,
  className,
}: {
  job: IJob;
  clickHandler?: (id: string) => () => void;
  className?: string;
}) => {
  return (
    <div
      className={`${className} group relative flex flex-col bg-primary-400/10 p-2 text-primary-900 hover:bg-primary-200/50 dark:hover:bg-primary-800/40 md:p-4 [&_div]:leading-4`}
    >
      {clickHandler && (
        <button
          className='invisible absolute right-2 text-primary-800/50 group-hover:visible'
          aria-label='delete this job application stack'
          onClick={clickHandler(job.id)}
        >
          <CloseIcon />
        </button>
      )}
      <div className='flex-1'>
        <div className='text-[0.75em] text-text-primary'>{job.date}</div>
        <h2 className='my-1 text-lg font-bold leading-4'>{job.jobTitle}</h2>
        <div className='text-text-primary'>@ {job.employer}</div>
      </div>
      <div className='my-4 flex gap-0 md:gap-2 '>
        <ScoreCircle score={job.scoreCV} name='CV' />
        <ScoreCircle score={job.scoreCover} name='Cover Letter' />
      </div>
      <div className='invisible mt-4 flex justify-center gap-2 text-xs group-hover:visible '>
        <ButtonLink
          href={`/job/${job.id}/job`}
          variant='ghost'
          className='block flex-1 text-center text-text-primary'
          aria-label={`edit the job application stack for ${job.jobTitle} at ${job.employer}`}
        >
          <EditIcon className='text-primary-900' /> Edit
        </ButtonLink>

        <ButtonLink
          href={`/job/${job.id}`}
          variant='ghost'
          className='block flex-1 text-center text-text-primary'
          aria-label={`download the PDF files of the CV and Cover Letter for ${job.jobTitle} at ${job.employer}`}
        >
          <DownloadIcon className='text-primary-900' /> PDF
        </ButtonLink>
      </div>
    </div>
  );
};

export default JobSummaryCard;
