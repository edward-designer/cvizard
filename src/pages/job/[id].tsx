import { useRouter } from 'next/router';

import InputField from '@/components/common/InputField';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
const Job = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout bgText='&nbsp;1'>
      <Seo />
      <main className='col-start-2 min-h-[calc(100vh_-_120px)] '>
        <h1 className='text-primary-800'>Job Descriptions</h1>
        <p className='italic text-text-primary'>
          Tips: You can simply copy and paste from online job ads. {id}
        </p>
        <div className='mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          <div className='col-span-2 md:col-start-2'>
            <InputField name='jobTitle' title='Job Title' />
            <InputField name='employer' title='Employer' />
            <InputField name='date' title='Date' type='date' />
            <InputField name='description' title='Description' />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Job;
