import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { saveToFile } from '@/lib/fileHandling';
import { readFromJobMD } from '@/lib/reader';

import Button from '@/components/buttons/Button';
import InputField from '@/components/common/InputField';
import MDEditor from '@/components/common/MDEditor';
import StepIndicator from '@/components/common/StepIndicator';
import FieldSet from '@/components/job/FieldSet';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { appSteps, trackerSteps } from '@/constant/global';

import { IJob } from '@/types/types';

const Job = ({ jobDetails }: { jobDetails: IJob }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const id = `${jobDetails.id}-job.md`;
  const nextHref = `/job/${jobDetails.id}/cv`;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const target = e.target as typeof e.target & {
      jobTitle: { value: string };
      employer: { value: string };
      date: { value: string };
      url: { value: string };
      description: { value: string };
      init: { value: string };
      initNotes: { value: string };
      apply: { value: string };
      applyNotes: { value: string };
      interview: { value: string };
      interviewNotes: { value: string };
      offer: { value: string };
      offerNotes: { value: string };
    };
    const jobTitle = target.jobTitle.value;
    const employer = target.employer.value;
    const date = target.date.value;
    const url = target.url.value;
    const description = target.description.value;
    const scoreCV = jobDetails.scoreCV;
    const scoreCover = jobDetails.scoreCover;
    const init = target.init?.value ?? '';
    const initNotes = target.initNotes?.value ?? '';
    const apply = target.apply?.value ?? '';
    const applyNotes = target.applyNotes?.value ?? '';
    const interview = target.interview?.value ?? '';
    const interviewNotes = target.interviewNotes?.value ?? '';
    const offer = target.offer?.value ?? '';
    const offerNotes = target.offerNotes?.value ?? '';

    try {
      saveToFile({
        id,
        jobTitle,
        employer,
        date,
        url,
        description,
        scoreCV,
        scoreCover,
        init,
        initNotes,
        apply,
        applyNotes,
        interview,
        interviewNotes,
        offer,
        offerNotes,
      }).then((msg) => {
        if (msg === 'error') {
          toast.warning('Data not saved.');
        } else {
          toast.success('Successfully saved job details.');
        }
        router.push(nextHref);
      });
    } catch {
      (err: Error) => {
        toast(err.message);
      };
    }
  };
  const today = new Date().toISOString().split('T')[0];

  return (
    <Layout bgText='&nbsp;1'>
      <Seo />
      <main className='col-start-2 mb-4 min-h-[calc(100vh_-_120px)]'>
        <div className='contents-center flex flex-col gap-4 md:flex-row'>
          <div className='flex-1'>
            <h1 className='text-primary-800'>Job Descriptions</h1>
            <p className='italic text-text-primary'>
              Tips: You can simply copy and paste from online job ads.
            </p>
          </div>
          <div className='md:w-[30em]'>
            <StepIndicator
              currentStep={1}
              steps={appSteps}
              id={jobDetails.id}
            />
          </div>
        </div>
        <div className='mt-10'>
          <form
            className='grid grid-cols-1 gap-10 md:grid-cols-2'
            onSubmit={handleSubmit}
          >
            <div className='col-span-1'>
              <h3 className='mb-4 border-t'>Job Ad</h3>
              <InputField
                name='jobTitle'
                title='Job Title'
                value={jobDetails.jobTitle}
              />
              <InputField
                name='employer'
                title='Employer'
                value={jobDetails.employer}
              />
              <InputField
                name='date'
                title='Date'
                type='date'
                value={jobDetails.date || today}
              />
              <InputField
                name='url'
                title='Job Ad URL'
                value={jobDetails.url}
              />
              <MDEditor
                name='description'
                title='Description'
                value={jobDetails.description}
                showPreview={false}
                className='aspect-square'
              />
            </div>
            <div className='col-span-1'>
              <h3 className='mb-4 border-t'>Job Application Tracker</h3>
              {trackerSteps.map(({ text }) => (
                <FieldSet key={text} name={text} jobDetails={jobDetails} />
              ))}
            </div>
            <div className='col-span-2 flex flex-row-reverse gap-2 '>
              <Button
                variant='outline'
                type='reset'
                onClick={() => router.reload()}
                className=''
              >
                Reset
              </Button>
              <Button
                variant='primary'
                type='submit'
                isLoading={isLoading}
                className='[&_svg]:transition-all [&_svg]:hover:translate-x-1'
              >
                Save <ArrowForwardIcon />
              </Button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default Job;

export async function getServerSideProps({
  params: { id },
}: {
  params: { id: string };
}) {
  const fileName = `${id}-job.md`;
  const meta = (await readFromJobMD(fileName)) || {};
  const jobDetails = { ...meta, id } as IJob;
  return { props: { jobDetails } };
}
