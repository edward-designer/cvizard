import { useRouter } from 'next/router';

import { getFromServer } from '@/lib/reader';

import PDFView from '@/components/common/PDFView';
import StepIndicator from '@/components/common/StepIndicator';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { appSteps } from '@/constant/global';

import { ICV } from '@/types/types';

const Preview = ({
  cvFromServer,
  coverLetterFromServer,
}: {
  cvFromServer: ICV;
  coverLetterFromServer: ICV;
}) => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <Layout bgText='&nbsp;4'>
      <Seo />
      <main className='col-start-2 min-h-[calc(100vh_-_120px)]'>
        <div className='contents-center flex flex-col gap-4 md:flex-row'>
          <div className='flex-1'>
            <h1 className='text-primary-800'>Preview & Download</h1>
            <p className='italic text-text-primary'>
              Tips: Remember to double check your CV and Cover Letter to be free
              from grammatical errors.
            </p>
          </div>
          <div className='md:w-[30em]'>
            <StepIndicator currentStep={4} steps={appSteps} id={id} />
          </div>
        </div>

        <div className='mt-10 grid grid-cols-2 gap-4'>
          <PDFView
            val={[coverLetterFromServer.content]}
            docId={id}
            docType='Cover Letter'
          />
          <PDFView val={[cvFromServer.content]} docId={id} docType='CV' />
        </div>
        <div className='col-span-2 mb-10 bg-primary-800/10 pt-6'>
          <PDFView
            val={[coverLetterFromServer.content, cvFromServer.content]}
            docId={id}
            docType='Stack'
            linkOnly={true}
          />
        </div>
      </main>
    </Layout>
  );
};

export default Preview;

export async function getServerSideProps({
  params: { id },
}: {
  params: { id: string };
}) {
  const cvFromServer = await getFromServer(id, 'cv');
  const coverLetterFromServer = await getFromServer(id, 'coverLetter');
  return { props: { cvFromServer, coverLetterFromServer } };
}
