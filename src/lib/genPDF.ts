import path from 'path';
import puppeteer from 'puppeteer';

import { postsDirectory } from '@/constant/global';

export const genPDF = async () => {
  /*const HTMLcontent = await fs.readFile('/job/1667409325586/cv', 'utf8');
  const CSSpath = path.join(process.cwd(),'src/style');
  const CSSfiles = await fs.readdir(CSSpath).then(dirs=>dirs.filter((fn) => fn.endsWith('.css')));
  const CSScontent = await fs.readFile(CSSpath + CSSfiles[0], 'utf8');*/

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none',
    ],
  });
  const page = await browser.newPage();
  await page.setContent(
    '<h1>hello</h1><h1>hello</h1><h1>hello</h1><h1>hello</h1><h1>hello</h1><h1>hello</h1><h1>hello</h1><h1>hello</h1><h1>hello</h1><h1>hello</h1><h1>hello</h1>',
    {
      waitUntil: ['networkidle0'],
    }
  );
  /*await page.addStyleTag({ content: CSScontent });*/
  await page.evaluateHandle('document.fonts.ready');

  await page.pdf({
    path: path.join(postsDirectory, 'cv.pdf'),
    format: 'A4',
    scale: 0.67,
    margin: {
      top: '10mm',
      left: '10mm',
      right: '10mm',
      bottom: '10mm',
    },
  });
  await browser.close();
};
