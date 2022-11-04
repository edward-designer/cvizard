import { SyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { saveToFile } from '@/lib/fileHandling';
import { readFromJobMD } from '@/lib/reader';

import Button from '@/components/buttons/Button';
import InputField from '@/components/common/InputField';
import MDEditor from '@/components/common/MDEditor';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { IJob } from '@/types/types';

const Job = ({ jobDetails }: { jobDetails: IJob }) => {
  const [isLoading, setIsLoading] = useState(false);

  const id = `${jobDetails.id}-job.md`;
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const target = e.target as typeof e.target & {
      jobTitle: { value: string };
      employer: { value: string };
      date: { value: string };
      url: { value: string };
      description: { value: string };
    };
    const jobTitle = target.jobTitle.value;
    const employer = target.employer.value;
    const date = target.date.value;
    const url = target.url.value;
    const description = target.description.value;
    try {
      saveToFile({
        id,
        jobTitle,
        employer,
        date,
        url,
        description,
      }).then(() => {
        setIsLoading(false);
        toast.success('Successfully saved to file.');
      });
    } catch {
      (err: Error) => {
        toast(err.message);
      };
    }
  };
  return (
    <Layout bgText='&nbsp;1'>
      <Seo />
      <main className='col-start-2 mb-4 min-h-[calc(100vh_-_120px)]'>
        <h1 className='text-primary-800'>Job Descriptions</h1>
        <p className='italic text-text-primary'>
          Tips: You can simply copy and paste from online job ads.
        </p>
        <div className='mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          <form className='col-span-2 md:col-start-2' onSubmit={handleSubmit}>
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
              value={jobDetails.date}
            />
            <InputField name='url' title='Job Ad URL' value={jobDetails.url} />
            <MDEditor
              name='description'
              title='Description'
              value={jobDetails.description}
            />
            <div className='col-span-2 text-right md:col-start-2'>
              <Button variant='primary' type='submit' isLoading={isLoading}>
                Save
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
  const meta = readFromJobMD(fileName) || {};
  const jobDetails = { ...meta, id } as IJob;
  return { props: { jobDetails } };
}
