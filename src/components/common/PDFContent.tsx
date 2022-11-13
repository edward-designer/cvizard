import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import React from 'react';
import Html from 'react-pdf-html';

import { drawdown } from '@/lib/drawdown';

interface IPDFContent {
  pages: string[];
  primaryColor: string;
}

const PDFContent = ({ pages, primaryColor }: IPDFContent) => {
  const styles = StyleSheet.create({
    page: {
      width: '210mm',
      height: '297mm',
      padding: '20px',
      margin: '0',
      borderTop: `10px solid ${primaryColor}`,
    },
    html: {
      fontSize: '11px',
    },
  });
  const htmls = pages.map(
    (
      page
    ) => `<html><style>body{font-family:Helvetica;color:${primaryColor}}</style>
  <body><p style='line-height:1.5'>${drawdown(page)}</p></body>
  </html>`
  );

  return (
    <Document>
      {htmls.map((html, index) => (
        <Page key={index} size='A4' style={styles.page}>
          <Html style={styles.html}>{html}</Html>
        </Page>
      ))}
    </Document>
  );
};

export default PDFContent;
