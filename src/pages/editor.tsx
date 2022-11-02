import MarkdownIt from 'markdown-it';
import mark from 'markdown-it-mark';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const mdParser = new MarkdownIt().use(mark);

export default function editor() {
  return (
    <Layout>
      <Seo />
      <main className='col-start-2 min-h-[calc(100vh_-_120px)] '>
        <MdEditor
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
        />
      </main>
    </Layout>
  );
}
