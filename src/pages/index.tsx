import type { ReactElement } from 'react';
import React from 'react';

import Layout from '@/components/layout/Layout';
import LayoutEditor from '@/components/layout/LayoutEditor';
import Seo from '@/components/Seo';

import type { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
  return (
    <Layout>
      <Seo />
      <main className='col-start-2 h-screen grid-cols-12'>
        <section>
          <h1 className='text-primary-800'>CVizard</h1>
        </section>
      </main>
    </Layout>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutEditor>{page}</LayoutEditor>;
};

export default HomePage;
