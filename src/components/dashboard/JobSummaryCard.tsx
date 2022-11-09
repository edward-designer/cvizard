import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import React, { useState } from 'react';

import ScoreCircle from '@/components/common/ScoreCircle';
import StepIndicator from '@/components/common/StepIndicator';
import ButtonLink from '@/components/links/ButtonLink';

import { IJob } from '@/types/types';

const JobSummaryCard = ({
  job,
  clickHandler,
  className = '',
}: {
  job: IJob;
  clickHandler?: (id: string) => () => void;
  className?: string;
}) => {
  const [showTrackerDetails, setShowTrackerDetails] = useState(false);

  return (
    <div
      className={`${className} group relative flex min-h-[380px] flex-col bg-primary-400/10 p-2 text-primary-900 hover:bg-primary-200/50 dark:hover:bg-primary-800/40 md:p-4 [&_div]:leading-4`}
    >
      <div
        className={`${
          showTrackerDetails ? 'max-h-[0px]' : 'max-h-[400px]'
        } relative flex flex-1 flex-col overflow-hidden p-1 transition-[max-height] duration-500 ease-out`}
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
        <div className='my-4 flex flex-1 gap-0 dark:text-primary-700  md:gap-2'>
          <Link
            href={`/job/${job.id}/cv`}
            className='flex flex-1 place-content-center hover:brightness-125 hover:drop-shadow hover:hue-rotate-15 hover:filter'
            title={`keywords analysis for CV: score is ${job.scoreCover}`}
          >
            <ScoreCircle score={job.scoreCV} name='CV' />
          </Link>
          <Link
            href={`/job/${job.id}/coverLetter`}
            className='flex-1 hover:brightness-125 hover:drop-shadow hover:hue-rotate-15 hover:filter'
            title={`keywords analysis for Cover Letter: score is ${job.scoreCover}`}
          >
            <ScoreCircle score={job.scoreCover} name='Cover Letter' />
          </Link>
        </div>

        <div className='mt-4 flex justify-center gap-2 text-xs '>
          <ButtonLink
            href={`/job/${job.id}/job`}
            variant='ghost'
            className='block flex-1 text-center text-text-primary opacity-0 transition-all focus:opacity-100 group-hover:opacity-100 [&_svg]:hover:scale-110'
            aria-label={`edit the job application stack for ${job.jobTitle} at ${job.employer}`}
          >
            <EditIcon className='text-primary-900' /> Edit
          </ButtonLink>

          <ButtonLink
            href={`/job/${job.id}`}
            variant='ghost'
            className='block flex-1 text-center text-text-primary opacity-0 transition-all focus:opacity-100 group-hover:opacity-100 [&_svg]:hover:scale-110 '
            aria-label={`download the PDF files of the CV and Cover Letter for ${job.jobTitle} at ${job.employer}`}
          >
            <DownloadIcon className='text-primary-900' /> PDF
          </ButtonLink>
        </div>
      </div>
      <div className='my-2'>
        <StepIndicator
          clickHandler={() => setShowTrackerDetails(!showTrackerDetails)}
          id='123'
          currentStep={1}
          steps={[
            { text: 'Init', href: '/job/[id]/job' },
            { text: 'Apply', href: '/job/[id]/cv' },
            { text: 'Interview', href: '/job/[id]/coverLetter' },
            { text: 'Offer', href: '/job/[id]/preview' },
          ]}
        />
      </div>
    </div>
  );
};

export default JobSummaryCard;
