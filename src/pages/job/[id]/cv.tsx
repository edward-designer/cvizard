import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { copyCVFromTemplate, saveToFile } from '@/lib/fileHandling';
import { getScoreForNewJob } from '@/lib/getScore';
import { getKeywordStat } from '@/lib/helper';
import { getFromServer, readFromJobMD } from '@/lib/reader';

import StepIndicator from '@/components/common/StepIndicator';
import JobNew from '@/components/dashboard/JobNew';
import ContentEditor from '@/components/job/ContentEditor';
import KeywordSidebar from '@/components/job/KeywordSidebar';
import ScoreCard from '@/components/job/ScoreCard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { appSteps } from '@/constant/global';

import { ICV, IJob } from '@/types/types';

const CV = ({
  jobsFromServer,
  cvFromServer,
  jobDetails,
}: {
  jobsFromServer: IJob[];
  cvFromServer: ICV;
  jobDetails: IJob;
}) => {
  const router = useRouter();
  const id = router.query.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [cv, setCV] = useState(cvFromServer);
  const jobs = jobsFromServer;
  const jobDescription = jobDetails?.description || '';

  const fileId = `${id}-cv.md`;
  const nextHref = `/job/${id}/coverLetter`;

  const { notMatchedKeywords, score } = getKeywordStat(
    cv.content,
    jobDescription
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const target = e.target as typeof e.target & {
      description: { value: string };
    };
    const content = target.description.value;
    try {
      saveToFile({
        id: fileId,
        content,
      }).then(() => {
        setIsLoading(false);
        toast.success('Successfully saved CV.');
        router.push(nextHref);
      });
    } catch {
      (err: Error) => {
        toast(err.message);
      };
    }
  };
  const changeHandler = (text: string) => {
    setCV({ ...cv, content: text });
  };

  const clickHandler = () => {
    try {
      saveToFile({
        id: fileId,
        content: '',
      }).then(() => {
        setCV({
          id: fileId,
          content: '',
        });
      });
    } catch {
      (err: Error) => {
        toast(err.message);
      };
    }
  };

  const copyFromTemplate = (templateId: string) => () => {
    try {
      copyCVFromTemplate(templateId, fileId).then((data) => {
        setCV({
          id: fileId,
          content: data,
        });
      });
    } catch {
      (err: Error) => {
        toast(err.message);
      };
    }
  };

  return (
    <Layout bgText='&nbsp;2'>
      <Seo />
      <main className='col-start-2 min-h-[calc(100vh_-_120px)]'>
        <div className='contents-center flex flex-col gap-4 md:flex-row'>
          <div className='flex-1'>
            <h1 className='text-primary-800'>CV</h1>
            <p className='italic text-text-primary'>
              {cv.id
                ? 'Tips: Try to improve your CV to get close to 100% keyword match!'
                : 'Tips: Select the one below with the hightest score to give you a head start.'}
            </p>
          </div>
          <StepIndicator currentStep={2} steps={appSteps} id={id} />
        </div>
        <div className='mt-10 mb-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {cv.id ? (
            <>
              <KeywordSidebar
                score={score}
                notMatchedKeywords={notMatchedKeywords}
              />
              <ContentEditor
                title={`My tailored CV for ${jobDetails.jobTitle} @ ${jobDetails.employer}`}
                content={cv.content}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                changeHandler={changeHandler}
              />
            </>
          ) : (
            <>
              <JobNew
                label='New CV from scratch'
                aria='create a new CV from scratch'
                clickHandler={clickHandler}
              />
              {jobs.map((job) => {
                if (job.id !== cv.id)
                  return (
                    <ScoreCard
                      key={job.id}
                      job={job}
                      clickHandler={copyFromTemplate(`${job.id}-cv.md`)}
                    />
                  );
              })}
            </>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default CV;

export async function getServerSideProps({
  params: { id },
}: {
  params: { id: string };
}) {
  const jobDetails = await readFromJobMD(`${id}-job.md`);
  const cvFromServer = await getFromServer(id, 'cv');
  const jobsFromServer = await getScoreForNewJob(id, 'cv');
  return { props: { jobsFromServer, cvFromServer, jobDetails } };
}
