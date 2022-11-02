import { readMetaFromDir } from '@/lib/reader';

import JobNew from '@/components/dashboard/JobNew';
import JobSummaryCard from '@/components/dashboard/JobSummaryCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { IJob } from '@/types/types';

export default function dashboard({ jobs }: { jobs: IJob[] }) {
  return (
    <Layout bgText='HELLO'>
      <Seo />
      <main className='col-start-2 min-h-[calc(100vh_-_120px)] '>
        <h1 className='text-primary-800'>My Job Applications</h1>
        <div className='mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          <JobNew />
          {jobs.map((job) => (
            <JobSummaryCard job={job} key={job.id} />
          ))}
        </div>
      </main>
    </Layout>
  );
}

dashboard.getInitialProps = () => {
  const jobs = readMetaFromDir();
  return { jobs };
};
