import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import * as React from 'react';

import Logo from '~/svg/cvizardLogo.svg';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 col-span-3 bg-bg-primary/70 '>
      <div className='layoutGrid'>
        <div className='col-start-2 flex items-center justify-between pt-5'>
          <Link href='/'>
            <Logo
              aria-label='Website logo'
              className='h-[100px] w-[168px] fill-primary-700 text-primary-700 transition-colors duration-1000'
            />
          </Link>
          <Link href='/components'>
            <button className='flex-0 rounded-md bg-primary-700 px-4 py-2 text-sm text-white hover:bg-primary-400'>
              Try CVizard NOW <ArrowForwardIcon className='-mt-1' />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
