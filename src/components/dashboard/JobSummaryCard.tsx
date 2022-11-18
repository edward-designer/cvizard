import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';
import React, { useState } from 'react';

import ScoreCircle from '@/components/common/ScoreCircle';
import StepIndicator from '@/components/common/StepIndicator';
import ButtonLink from '@/components/links/ButtonLink';

import { trackerSteps } from '@/constant/global';

import { IJob } from '@/types/types';

import ChemleonImg from '~/svg/celebrate.svg';
import FlagsImg from '~/svg/flags.svg';

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

  const trackerCurrentStep = trackerSteps
    .map((step) => step.text)
    .filter((step) => job[step]).length;

  return (
    <div
      className={`${className} group relative box-border flex min-h-[380px] flex-col overflow-hidden bg-primary-400/10 text-primary-900 hover:bg-primary-200/50 dark:hover:bg-primary-800/40 [&_div]:leading-4`}
    >
      {trackerCurrentStep === 4 && (
        <>
          <FlagsImg className='absolute h-4 w-full' />
          <ChemleonImg className='absolute -right-[5em] top-[55%] h-20 w-40 translate-x-[10em] transition-all duration-1000 group-hover:translate-x-0 [&_path:first-child]:transition-all [&_path:first-child]:delay-1000 [&_path:first-child]:duration-300 [&_path:first-child]:[strokeDasharray:300] [&_path:first-child]:[strokeDashoffset:300] [&_path:first-child]:group-hover:[strokeDashoffset:0]' />
        </>
      )}
      <div
        className={`${
          showTrackerDetails ? 'max-h-[0px]' : 'max-h-[400px]'
        } relative flex-1 overflow-hidden transition-[max-height] duration-500 ease-out`}
      >
        <div className='flex h-full flex-col p-2 md:p-4'>
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
            <h2 className='my-1 text-2xl font-bold leading-4 text-slate-700'>
              {job.jobTitle}
            </h2>
            <div className='text-text-primary'>@ {job.employer}</div>
          </div>
          <div className='my-4 flex flex-1 gap-0 dark:text-primary-700 md:gap-2'>
            <Link
              href={`/job/${job.id}/cv`}
              className='flex flex-1 place-content-center hover:brightness-125 hover:drop-shadow hover:hue-rotate-15 hover:filter'
              title={`keywords analysis for CV: score is ${job.scoreCover}`}
            >
              <ScoreCircle score={job.scoreCV} name='CV' />
            </Link>
            <Link
              href={`/job/${job.id}/coverLetter`}
              className='flex flex-1 place-content-center hover:brightness-125 hover:drop-shadow hover:hue-rotate-15 hover:filter'
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
              href={`/job/${job.id}/preview`}
              variant='ghost'
              className='block flex-1 text-center text-text-primary opacity-0 transition-all focus:opacity-100 group-hover:opacity-100 [&_svg]:hover:scale-110 '
              aria-label={`download the PDF files of the CV and Cover Letter for ${job.jobTitle} at ${job.employer}`}
            >
              <DownloadIcon className='text-primary-900' /> PDF
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className='-mt-1 flex flex-col border-t-4 border-dotted border-bg-primary p-2 md:p-4 md:pb-2'>
        <StepIndicator
          clickHandler={() => setShowTrackerDetails(!showTrackerDetails)}
          currentStep={trackerCurrentStep}
          steps={trackerSteps}
        />

        <div
          className={`${
            showTrackerDetails
              ? 'max-h-[320px] duration-500'
              : 'max-h-0 duration-75'
          } mt-2 -mr-4 overflow-y-scroll pr-4 transition-[max-height] ease-in-out 
          scrollbar-thin scrollbar-track-primary-500/10 scrollbar-thumb-primary-600/20`}
        >
          <h3 className='mt-4 text-lg'>
            <LocationOnIcon /> Application Tracker
          </h3>
          {trackerSteps
            .map((step) => step.text)
            .map(
              (step) =>
                job[step] && (
                  <div key={step}>
                    <div className='mt-6 font-bold text-primary-900/70'>
                      {job[step]}
                    </div>
                    <div
                      className='relative mt-3 rounded-md bg-bg-primary p-2 text-text-primary shadow before:absolute before:-top-5 before:h-0 before:w-0 before:border-[10px]
                  before:border-transparent before:border-b-bg-primary'
                    >
                      <span className='inline-block pr-2 text-primary-900/40'>
                        #{step}
                      </span>
                      {job[`${step}Notes`] || ''}
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default JobSummaryCard;
