import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { deleteFile } from '@/lib/fileHandling';
import { readMetaFromDir } from '@/lib/reader';

import AnimatedListChange from '@/components/common/AnimatedListChange';
import Search from '@/components/common/Search';
import JobNew from '@/components/dashboard/JobNew';
import JobSummaryCard from '@/components/dashboard/JobSummaryCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { IJob } from '@/types/types';

export default function Dashboard({
  jobsFromServer,
}: {
  jobsFromServer: IJob[];
}) {
  const [jobs, setJobs] = useState(jobsFromServer);
  const [search, setSearch] = useState('');

  const deleteHandler = (id: string) => () => {
    deleteFile(id).then(() => {
      setJobs(jobs.filter((job) => job.id !== id));
      toast.success('Job application stack deleted.');
    });
  };

  const filteredJob = () => {
    const regex = new RegExp(search, 'i');
    return jobs.filter((job) => regex.test(`${job.jobTitle} ${job.employer}`));
  };

  const router = useRouter();
  const clickHandler = () => {
    const href = `/job/${Date.now()}/job`;
    router.push(href);
  };

  return (
    <Layout bgText='HELLO'>
      <Seo />
      <main className='col-start-2 min-h-[calc(100vh_-_120px)] '>
        <div className='contents-center flex w-full flex-col md:flex-row md:items-center md:justify-between'>
          <h1 className=' mb-4 text-primary-800 md:mb-0'>
            My Job Applications
          </h1>
          <Search search={search} setSearch={setSearch} />
        </div>
        <div className='mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          <JobNew
            clickHandler={clickHandler}
            label='New Job'
            aria='create a new job application stack'
          />
          <AnimatedListChange classToAdd='animate-fadeOut'>
            {filteredJob().map((job) => (
              <JobSummaryCard
                clickHandler={deleteHandler}
                job={job}
                key={job.id}
              />
            ))}
          </AnimatedListChange>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const jobsFromServer = await readMetaFromDir();
  return { props: { jobsFromServer } };
}
