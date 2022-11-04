import localFont from '@next/font/local';
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

const myFont = localFont({
  src: './inter-var-latin.woff2',
});

const HomePage: NextPageWithLayout = () => {
  const observerRef = useRef<HTMLElement | null>(null);
  useIntersectionObserver(observerRef);

  return (
    <Layout bgText=''>
      <Seo />
      <main className={`${myFont.className} col-span-3`} ref={observerRef}>
        <section className='layoutGrid bg-primary-600/10'>
          <div className='col-start-2 flex flex-col items-center gap-2 py-4 pb-10 sm:flex-row sm:gap-8 sm:pb-4'>
            <div className='h-[235px] w-[453px] max-w-[80%] md:h-[335px] md:flex-1'>
              <FeatureImg
                className='h-full w-full animate-slideInLeft text-primary-700 dark:text-primary-900 
              [&_*]:origin-center [&_.feature\_svg\_\_gear]:animate-gear [&_.feature\_svg\_\_placeholder]:animate-pulse
              [&_.feature\_svg\_\_profileImg]:animate-ping [&_.feature\_svg\_\_tick]:animate-tick'
              />
            </div>
            <div className='md:flex-1'>
              <h1 className='text-primary-700'>
                Create{' '}
                <span className='text-primary-500'>highly targeted CV</span>{' '}
                FAST & SECURE
              </h1>
              <p className='py-4'>
                CVizard is your tailored CV wizard to help you generate as many
                versions of CV as you need fast and easy. Most importantly, all
                your data are stored on your computer ONLY. CVizard will NEVER
                store or use your data!
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
                  <strong>Edit</strong> the CV based on keyword suggestions
                </li>
                <li>
                  <strong>Download</strong> your CV in PDF format
                </li>
              </ol>
              <p>
                Rest assured that all your data is stored ONLY on your local
                computer. You can even disconnect your computer from the
                internet after pressing the “Try CVizard NOW” button and can
                still continue to work on your CVs and cover letters!
              </p>
            </div>
            <div className='h-[335px] w-[453px] max-w-[80%] md:flex-1'>
              <StepsImg className='h-full w-full text-primary-200 dark:text-primary-800' />
            </div>
          </BlockWithImage>

          <BlockWithImage>
            <div className='h-[300px] w-[453px] max-w-[80%] md:flex-1'>
              <KeywordImg className='h-full w-full text-primary-200 opacity-0 dark:text-primary-800' />
            </div>
            <div className='md:flex-1'>
              <h2>
                <span>Keyword</span> Matching Score + Keyword Suggestions
              </h2>
              <p>
                You know it is crucial to create tailored CV for each job you
                apply, yet it is very time consuming. CVizard comes to the
                rescue. Once you have pasted the job descriptions of the vacancy
                you are applying for, we will immdiately evalute your CVs and
                cover letters to find the most suitable version for you to
                create a tailored CV and cover letter. You are confident that
                your CV can pass through the keyword screening phrase.
              </p>
            </div>
          </BlockWithImage>

          <BlockWithImage mobileReverse={true}>
            <div className='md:flex-1'>
              <h2>
                <span>Cover Letter</span> Editor with Matching Design
              </h2>
              <p>
                For a professional look, you can also compose and download your
                cover letters with the same design and color as your CVs.
              </p>
            </div>
            <div className='h-[250px] w-[453px] max-w-[80%] md:flex-1'>
              <CoverLetterImg className='h-full w-full text-primary-300 dark:text-primary-800' />
            </div>
          </BlockWithImage>
        </section>
        <section className='layoutGrid mt-10 bg-primary-700 p-10 pb-20'>
          <div className='col-start-2 text-center text-white dark:text-slate-300'>
            <div className='mb-2 flex justify-center'>
              <ChemleonImg className='h-[46px] w-[122px] text-primary-400 dark:text-primary-800 [&_.chemleon\_svg\_\_face]:fill-primary-600 [&_.chemleon\_svg\_\_body]:fill-primary-300 dark:[&_.chemleon\_svg\_\_body]:fill-primary-600 [&_.chemleon\_svg\_\_hat]:fill-primary-900' />
            </div>
            <h1>CVizard - Your Personal CV Wizard</h1>
            <p className=' py-8 sm:px-40'>
              Finding a job is a daunting task, CVizard is designed to help you
              creating the best CV and cover letter for your perfect job, with a
              little bit of magic : )
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
    </Layout>
  );
};

export default HomePage;
