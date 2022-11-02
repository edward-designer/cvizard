import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import JobNew from '@/components/dashboard/JobNew';
import JobSummaryCard from '@/components/dashboard/JobSummaryCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { IJob } from '@/types/types';

const postsDirectory = path.join(process.cwd(), 'src/cv');

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
  const fileNames = fs.readdirSync(postsDirectory);

  const jobs = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  }) as IJob[];
  return { jobs };
};
