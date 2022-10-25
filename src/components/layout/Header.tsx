import * as React from 'react';

import Logo from '~/svg/cvizardLogo.svg';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 col-start-2 bg-bg-primary/70'>
      <Logo
        aria-label='Website logo'
        className='h-20 w-40 max-w-full fill-primary-700 text-primary-700 transition-colors duration-1000'
      />
    </header>
  );
}
