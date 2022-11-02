import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';

import Logo from '~/svg/cvizardLogo.svg';

export default function Header() {
  const router = useRouter();
  return (
    <header
      className={`${
        router.pathname === '/'
          ? 'sticky top-0 z-50 bg-bg-primary/30 backdrop-blur'
          : 'bg-transparent'
      } col-span-3`}
    >
      <div className='layoutGrid'>
        <div
          className={`${
            router.pathname === '/' ? 'justify-between' : 'justify-end'
          } col-start-2 flex items-center  pt-5`}
        >
          <Link href={router.pathname === '/' ? '/' : '/dashboard'}>
            <Logo
              aria-label='Website logo'
              className='h-[75px] w-[126px] fill-primary-700 text-primary-700 transition-colors duration-1000 md:h-[100px] md:w-[168px]'
            />
          </Link>
          {router.pathname === '/' && (
            <ArrowLink
              as={ButtonLink}
              direction='right'
              className='mt-2'
              href='/dashboard'
            >
              Try CVizard NOW
            </ArrowLink>
          )}
        </div>
      </div>
    </header>
  );
}
