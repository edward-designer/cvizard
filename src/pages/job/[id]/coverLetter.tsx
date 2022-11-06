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

const CoverLetter = ({
  jobsFromServer,
  coverLetterFromServer,
  jobDetails,
}: {
  jobsFromServer: IJob[];
  coverLetterFromServer: ICV;
  jobDetails: IJob;
}) => {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState(coverLetterFromServer);
  const jobs = jobsFromServer;
  const jobDescription = jobDetails?.description || '';
  const keywordsFromAd = useRef(
    getFilteredKeywordListFromString(jobDescription)
  );

  const fileId = `${id}-coverLetter.md`;
  const nextHref = `/job/${id}/preview`;

  const cvKeywords = extractKeywordsFromString(coverLetter.content);
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
        toast.success('Successfully saved cover letter.');
        router.push(nextHref);
      });
    } catch {
      (err: Error) => {
        toast(err.message);
      };
    }
  };
  const changeHandler = (text: string) => {
    setCoverLetter({ ...coverLetter, content: text });
  };

  const clickHandler = () => {
    try {
      saveToFile({
        id: fileId,
        content: '',
      }).then(() => {
        setCoverLetter({
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
        setCoverLetter({
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
    <Layout bgText='&nbsp;3'>
      <Seo />
      <main className='col-start-2 min-h-[calc(100vh_-_120px)]'>
        <div className='contents-center flex flex-col gap-4 md:flex-row'>
          <div className='flex-1'>
            <h1 className='text-primary-800'>Cover Letter</h1>
            <p className='italic text-text-primary'>
              {coverLetter.id
                ? 'Tips: Try to improve your cover letter to get close to 100% keyword match!'
                : 'Tips: Select the one below with the hightest score to give you a head start.'}
            </p>
          </div>
          <StepIndicator currentStep={3} steps={appSteps} />
        </div>
        <div className='mt-10 mb-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {coverLetter.id ? (
            <>
              <div className='col-span-2 col-start-1 md:col-span-1'>
                <h2 className='mb-2 text-base text-primary-900/60'>
                  Keyword Analysis
                </h2>
                <div className='text-primary-900'>
                  <ScoreCircle score={calScore()} name='Cover Letter' />
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
                    title={`Cover Letter for ${jobDetails.jobTitle} @ ${jobDetails.employer}`}
                    value={coverLetter.content}
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
                label='New cover letter'
                aria='create a new cover letter from scratch'
                clickHandler={clickHandler}
              />
              {jobs.map((job) => {
                if (job.id !== coverLetter.id)
                  return (
                    <ScoreCard
                      key={job.id}
                      job={job}
                      clickHandler={copyFromTemplate(
                        `${job.id}-coverLetter.md`
                      )}
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

export default CoverLetter;

export async function getServerSideProps({
  params: { id },
}: {
  params: { id: string };
}) {
  const jobDetails = await readFromJobMD(`${id}-job.md`);
  const coverLetterFromServer = await getFromServer(id, 'coverLetter');
  const jobsFromServer = await getScoreForNewJob(id, 'coverLetter');
  return { props: { jobsFromServer, coverLetterFromServer, jobDetails } };
}
