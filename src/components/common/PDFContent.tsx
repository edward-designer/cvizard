import { Canvas, Document, Font, Page, View } from '@react-pdf/renderer';
import React from 'react';
import Html from 'react-pdf-html';

import { drawdown } from '@/lib/drawdown';
import { rgb2hex } from '@/lib/helper';

interface IPDFContent {
  pages: string[];
  primaryColor: string;
}

const PDFContent = ({ pages, primaryColor }: IPDFContent) => {
  const hexColor = rgb2hex(primaryColor);

  // use Google fonts (must use TTF fonts only)
  // https://gist.github.com/sadikay/d5457c52e7fb2347077f5b0fe5ba9300
  Font.register({
    family: 'Oswald',
    fonts: [
      {
        src: 'http://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
        fontWeight: 'normal',
      },
    ],
  });
  // convert emoji into twemoji png images
  Font.registerEmojiSource({
    format: 'png',
    url: 'https://twemoji.maxcdn.com/2/72x72/',
  });
  // no breaking of words at end of lines
  Font.registerHyphenationCallback((word) => [word]);

  // styling for PDF elements
  // some styling must be done on the embedded stylesheet
  const styles = {
    page: {
      width: '210mm',
      height: '297mm',
      margin: '0',
      padding: '10mm',
      paddingLeft: '30mm',
      paddingRight: '20mm',
      borderTop: `10px solid ${primaryColor}`,
      fontFamily: 'Helvetica',
    },
    html: {
      fontFamily: 'Helvetica',
      fontSize: '11px',
    },
    h1: {
      fontFamily: 'Oswald',
      fontWeight: 'normal',
      fontSize: '30px',
      marginTop: '5px',
      marginBottom: '5px',
      color: `${primaryColor}`,
      marginLeft: '-30px',
    },
    h2: {
      fontSize: '16px',
      lineHeight: '1.3',
      paddingBottom: '0',
      marginTop: '20px',
      marginBottom: '5px',
      color: `${primaryColor}`,
      borderBottom: '1px dotted ${primaryColor}',
      fontFamily: 'Helvetica',
    },
    h3: {
      fontSize: '11px',
      paddingBottom: '2px',
      fontFamily: 'Helvetica',
      marginTop: '7px',
    },
    strong: {
      fontFamily: 'Helvetica-Bold',
      color: `${primaryColor}`,
    },
    em: {
      fontFamily: 'Helvetica-Oblique',
    },
    blockquote: {
      fontSize: '10px',
      lineHeight: '1.4',
      marginLeft: '-50px',
      fontFamily: 'Helvetica',
      display: 'flex',
      flexDirection: 'row',
    },
    p: {
      fontSize: '10px',
      color: 'black',
      fontFamily: 'Helvetica',
      lineHeight: '1.5',
    },
    li: {
      fontSize: '10px',
      lineHeight: '1.3',
      marginLeft: '5px',
      paddingLeft: '10px',
      color: 'black',
      fontFamily: 'Helvetica',
    },
  };

  const htmls = pages.map(
    (page) => `
    <html>
      <body>
        <style>
          blockquote img {
            width: 37px;
            height: 12px;
            opacity: 0.5;
            padding-right: 5px;
            padding-left: 20px;
          }        
          img[alt=signature] { 
            margin-top: 20px;
            width: 150px; 
          }
        </style>
        ${drawdown(page)}
        </body>
    </html>`
  );

  return (
    <Document>
      {htmls.map((html, index) => (
        <Page key={index} size='A4' style={styles.page}>
          {/* the litter triangle just beneath the top border */}
          <Canvas
            paint={(painterObject) =>
              painterObject
                .save()
                .moveTo(-30, -30)
                .lineTo(-30, -15)
                .lineTo(-15, -30)
                .fill(hexColor)
            }
          />
          <View>
            <Html resetStyles stylesheet={styles}>
              {html}
            </Html>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default PDFContent;
