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
  const id = router.query.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState(coverLetterFromServer);
  const jobs = jobsFromServer;
  const jobDescription = jobDetails?.description || '';

  const fileId = `${id}-coverLetter.md`;
  const nextHref = `/job/${id}/preview`;

  const { notMatchedKeywords, score } = getKeywordStat(
    coverLetter.content,
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
          <div className='md:w-[30em]'>
            <StepIndicator currentStep={3} steps={appSteps} id={id} />
          </div>
        </div>
        <div className='mt-10 mb-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {coverLetter.id ? (
            <>
              <KeywordSidebar
                score={score}
                notMatchedKeywords={notMatchedKeywords}
              />
              <ContentEditor
                title={`Cover Letter for ${jobDetails.jobTitle} @ ${jobDetails.employer}`}
                content={coverLetter.content}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                changeHandler={changeHandler}
              />
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
