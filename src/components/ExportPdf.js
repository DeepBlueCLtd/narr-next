import React from 'react';
import { Button } from 'reactstrap';
import jsPDF from 'jspdf';

const Export = ({ entries }) => {

  const timeX = 10;
  const textX = 35;
  const font = "Helvetica";

  const onPdfTextExport = () => {

    const pdf = new jsPDF("p", "mm", "a4");

    entries.forEach((page, key) => {

      if(key) pdf.addPage();
      let line = 1;

      pdf.setFontSize(24);
      pdf.setFont(font, 'normal');
      pdf.text('HMS NONSUCH', 105, 22, {}, 0, 'center');

      pdf.setFontSize(12);
      pdf.text(`- ${key+1} -`, 105, 290, {}, 0, 'center');

      page.forEach(({fieldsFormatted, mType, privacy, created, linePoint}) => {

        pdf.setFont(font, 'normal');
        pdf.text(timeX, lineCord(line), (new Date(created)).toLocaleTimeString());

        pdf.setFont(font, 'bold');
        pdf.text(textX, lineCord(line), `${mType} ${privacy ? `(${privacy})` : ''}`);

        if(fieldsFormatted) {
          pdf.setFont(font, 'normal');
          pdf.text(textX, lineCord(line+1), fieldsFormatted);
        }

        line += linePoint;
      });
    });

    pdf.save("Text.pdf");
  }

  const startCord = 40.5;
  const lineSpase = 6.4;

  const lineCord = (line) => {
    return (line - 1) * lineSpase + startCord;
  }


  return (
    <div style={{marginTop: '10px'}}>
      Export: <Button
                color="success"
                onClick={onPdfTextExport}
                disabled={!entries.length}
              >
                  PDF
              </Button>
    </div>
  )
}


export default Export;
