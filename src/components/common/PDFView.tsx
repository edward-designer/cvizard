import DownloadIcon from '@mui/icons-material/Download';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useRef, useState } from 'react';

import Button from '@/components/buttons/Button';
import PDFContent from '@/components/common/PDFContent';

import { useThemeContext } from '@/context/theme';

interface IPDFView {
  val: string[];
  docType: string;
  docId: string;
  linkOnly?: boolean;
  previewOnly?: boolean;
}

const PDFView = ({
  val,
  docType,
  docId,
  linkOnly = false,
  previewOnly = false,
}: IPDFView) => {
  const [isClient, setIsClient] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('rgb(0 0 0)');
  const { color } = useThemeContext();
  const previewRef = useRef<HTMLDivElement | null>(null);
  const PDFContentComponent = (
    <PDFContent pages={val} primaryColor={primaryColor} />
  );
  useEffect(() => {
    if (previewRef.current !== null)
      setPrimaryColor(
        getComputedStyle(previewRef.current)
          .getPropertyValue('--color-primary-900')
          .replace('( ', '(')
          .trim()
      );
  }, [color]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div ref={previewRef} className='col-span-2 md:col-span-1'>
      {isClient && (
        <>
          {!linkOnly && (
            <PDFViewer
              showToolbar={false}
              className='aspect-[210/297] w-full shadow'
            >
              {PDFContentComponent}
            </PDFViewer>
          )}
          {!previewOnly && (
            <div className='pb-6 text-center'>
              <PDFDownloadLink
                document={PDFContentComponent}
                fileName={`${docId}-${docType.toLowerCase().replace(' ', '')}`}
              >
                {val.length === 1 ? (
                  <Button
                    variant='ghost'
                    className='text-slate-500 hover:text-primary-500'
                  >
                    <DownloadIcon /> {docType} only
                  </Button>
                ) : (
                  <Button>
                    <DownloadIcon className='text-primary-900' />
                    Download Cover Letter + CV
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PDFView;
