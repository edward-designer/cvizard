import { useRouter } from 'next/router';
import { SyntheticEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { copyCVFromTemplate, saveToFile } from '@/lib/fileHandling';
import { getScoreForNewJob } from '@/lib/getScore';
import {
  extractKeywordsFromString,
  getFilteredKeywordListFromString,
  getKeywordScore,
  getMatchedKeywordList,
  getNotMatchedKeywordList,
} from '@/lib/helper';
import { getFromServer, readFromJobMD } from '@/lib/reader';

import Button from '@/components/buttons/Button';
import AnimatedListChange from '@/components/common/AnimatedListChange';
import MDEditor from '@/components/common/MDEditor';
import ScoreCircle from '@/components/common/ScoreCircle';
import StepIndicator from '@/components/common/StepIndicator';
import JobNew from '@/components/dashboard/JobNew';
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
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [cv, setCV] = useState(cvFromServer);
  const jobs = jobsFromServer;
  const jobDescription = jobDetails?.description || '';
  const keywordsFromAd = useRef(
    getFilteredKeywordListFromString(jobDescription)
  );

  const fileId = `${id}-cv.md`;
  const nextHref = `/job/${id}/coverLetter`;

  const cvKeywords = extractKeywordsFromString(cv.content);
  const matchedKeywords = getMatchedKeywordList(
    cvKeywords,
    keywordsFromAd.current
  );
  const notMatchedKeywords = getNotMatchedKeywordList(
    cvKeywords,
    keywordsFromAd.current
  );
  const calScore = () =>
    getKeywordScore(matchedKeywords, keywordsFromAd.current);

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
          <StepIndicator currentStep={2} steps={appSteps} />
        </div>
        <div className='mt-10 mb-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {cv.id ? (
            <>
              <div className='col-span-2 col-start-1 md:col-span-1'>
                <h2 className='mb-2 text-base text-primary-900/60'>
                  Keyword Analysis
                </h2>
                <div className='text-primary-900'>
                  <ScoreCircle score={calScore()} name='CV' />
                </div>
                <h2 className='mt-4 mb-2 border-t text-base text-primary-900/60'>
                  Keyword Suggestions
                </h2>
                <div className='flex flex-wrap text-xs'>
                  <AnimatedListChange classToAdd='bg-primary-900 text-white animate-fadeOut'>
                    {notMatchedKeywords.map((keyword) => (
                      <span
                        className='m-1 inline-flex border p-2'
                        key={keyword}
                      >
                        {keyword}
                      </span>
                    ))}
                  </AnimatedListChange>
                </div>
              </div>
              <div className='col-span-2 col-start-1 md:col-span-3 md:col-start-2'>
                <form onSubmit={handleSubmit}>
                  <MDEditor
                    name='description'
                    title={`My tailored CV for ${jobDetails.jobTitle} @ ${jobDetails.employer}`}
                    value={cv.content}
                    preview={true}
                    changeHandler={changeHandler}
                  />
                  <div className='col-span-2 text-right md:col-start-2'>
                    <Button
                      variant='primary'
                      type='submit'
                      isLoading={isLoading}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </div>
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
