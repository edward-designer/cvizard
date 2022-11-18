import { useRef } from 'react';

import BlockWithImage from '@/components/common/BlockWithImage';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';

import useIntersectionObserver from '@/hook/useIntersectionObserver';

import type { NextPageWithLayout } from './_app';

import StepsImg from '~/svg/4steps.svg';
import ChemleonImg from '~/svg/chemleon.svg';
import CoverLetterImg from '~/svg/coverLetter.svg';
import FeatureImg from '~/svg/feature.svg';
import KeywordImg from '~/svg/keyword.svg';

const HomePage: NextPageWithLayout = () => {
  const observerRef = useRef<HTMLElement | null>(null);
  useIntersectionObserver(observerRef);

  return (
    <Layout bgText=''>
      <Seo />
      <main className='col-span-3' ref={observerRef}>
        <section className='layoutGrid mb-8 bg-primary-800/5 md:min-h-[90vh]'>
          <div className='col-start-2 flex  flex-col items-center gap-2 pb-10 sm:flex-row sm:gap-8 sm:pb-4 md:-mt-40'>
            <div className='h-[235px] w-[453px] max-w-[100%] md:h-[350px] md:flex-1'>
              <FeatureImg
                className='-translateX-[2em]  h-full w-full animate-slideInLeft text-primary-700 opacity-0 dark:text-primary-900 
              [&_*]:origin-center [&_.feature\_svg\_\_gear]:animate-gear [&_.feature\_svg\_\_placeholder]:animate-pulse
              [&_.feature\_svg\_\_profileImg]:animate-ping [&_.feature\_svg\_\_tick]:animate-tick'
              />
            </div>
            <div className='md:flex-1'>
              <h1 className='font-strong text-text-primary md:text-7xl'>
                <span className='text-lg font-thin text-primary-700'>
                  &lt;developers&gt;
                </span>
                <br />
                DIY your CV + Cover Letter for free
                <br />
                <span className='relative text-lg font-thin text-primary-700 md:-top-6'>
                  &lt;/developers&gt;
                </span>
              </h1>
              <p className='py-4 font-thin md:text-lg md:leading-10'>
                Clone from github repo and run locally, then create unlimited
                variations of CV + Cover Letters fast and easy with the familiar{' '}
                <strong>markdown</strong> syntax. All data are stored and
                organized on your computer as markdown files only. No database
                needed.
              </p>
            </div>
          </div>
        </section>
        <section className='layoutGrid'>
          <BlockWithImage mobileReverse={true}>
            <div className='md:flex-1'>
              <h2>
                4 Simple Steps to Your <span>Perfect CV</span>
              </h2>
              <ol className='ml-5 list-outside list-decimal pb-4'>
                <li>
                  <strong>Paste</strong> job descriptions of the post you intend
                  to apply
                </li>
                <li>
                  <strong>Create</strong> a new CV (for the first time) or{' '}
                  <strong>pick</strong> a CV version that scores the best
                </li>
                <li>
                  <strong>Edit</strong> the CV in markdown based on keyword
                  suggestions
                </li>
                <li>
                  <strong>Download</strong> your CV in PDF format
                </li>
              </ol>
              <p>
                Rest assured that all your data is stored ONLY on your local
                computer as markdown files.
              </p>
            </div>
            <div className='h-[260px] w-[420px] max-w-[80%] md:flex-1'>
              <StepsImg className='-translateX-[2em] h-full w-full text-primary-200 opacity-0 dark:text-primary-800 ' />
            </div>
          </BlockWithImage>
          <div className='relative col-start-2 flex border-primary-800/5 p-0 pt-[50%] md:border-[5em]'>
            <iframe
              src='https://player.vimeo.com/video/772609886?h=6386870c9d&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1'
              frameBorder='0'
              allow='autoplay; fullscreen; picture-in-picture'
              allowFullScreen
              className='absolute top-0 left-0 h-full w-full bg-primary-800/5'
              title='Walkthrough overview'
            ></iframe>
          </div>
          <BlockWithImage>
            <div className='h-[330px] w-[453px] max-w-[80%] md:flex-1'>
              <KeywordImg className='-translateX-[2em] h-full w-full text-primary-200 opacity-0 dark:text-primary-800' />
            </div>
            <div className='md:flex-1'>
              <h2>
                <span>Keyword</span> Matching Score + Keyword Suggestions
              </h2>
              <p>
                <strong>CVizard is your personal CV wizard.</strong> Once you
                have pasted the job descriptions of the position you are
                applying for, the app will immdiately evalute your previous CVs
                and cover letters with the keywords from this job ad.{' '}
                <strong>Keyword matching scores</strong> will be provided for
                you to choose the most suitable versions to build upon your new
                CV and cover letter. As you are editing, the keyword score and
                keyword suggestions will be updated immediately for timely
                feedback.
              </p>
            </div>
          </BlockWithImage>
          <div className='relative col-start-2 flex border-primary-800/5 p-0 pt-[50%] md:border-[5em]'>
            <iframe
              src='https://player.vimeo.com/video/772615605?h=e667b6b4b2&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1'
              frameBorder='0'
              allow='autoplay; fullscreen; picture-in-picture'
              allowFullScreen
              className='absolute top-0 left-0 h-full w-full  bg-primary-800/5'
              title='Adding a new job info'
            ></iframe>
          </div>
          <BlockWithImage mobileReverse={true}>
            <div className='md:flex-1'>
              <h2>
                <span>Cover Letter</span> Editor with Matching Design
              </h2>
              <p>
                For a professional look, you can also compose and download your
                cover letters with the same design and color scheme as your CVs.
                You can freely choose from a variety of suggested color schemes.
              </p>
            </div>
            <div className='h-[210px] w-[453px] max-w-[80%] md:flex-1'>
              <CoverLetterImg className='-translateX-[2em] h-full w-full text-primary-300 opacity-0 dark:text-primary-800' />
            </div>
          </BlockWithImage>
        </section>
        <section className='layoutGrid mt-10 bg-primary-700 p-10 pb-20'>
          <div className='col-start-2 text-center text-white dark:text-slate-300'>
            <div className='mb-2 flex justify-center'>
              <ChemleonImg className='-translateX-[2em] h-[46px] w-[122px] text-primary-400 opacity-0 dark:text-primary-800 [&_.chemleon\_svg\_\_face]:fill-primary-600 [&_.chemleon\_svg\_\_body]:fill-primary-300 dark:[&_.chemleon\_svg\_\_body]:fill-primary-600 [&_.chemleon\_svg\_\_hat]:fill-primary-900' />
            </div>
            <h1>CVizard - Your Personal CV Wizard</h1>
            <p className=' py-8 sm:px-40'>
              Finding a job is a daunting task, CVizard is designed for
              developers to create the best tailored CV and cover letter for
              your perfect job fast and easy, with a little bit of magic touch :
              )
            </p>
            <ArrowLink
              as={ButtonLink}
              direction='right'
              className='mt-2'
              href='/dashboard'
            >
              Try CVizard NOW
            </ArrowLink>
          </div>
        </section>
      </main>
      <script async src='https://player.vimeo.com/api/player.js'></script>
    </Layout>
  );
};

export default HomePage;
