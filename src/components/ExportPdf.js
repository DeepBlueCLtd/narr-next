import { Button } from "reactstrap";
import PropTypes from "prop-types";
import React from "react";
import jsPDF from "jspdf";

const Export = ({ entries }) => {
  const timeX = 10;
  const textX = 35;
  const font = "Helvetica";

  const startCord = 40.5;
  const lineSpase = 6.4;

  const lineCord = line => (line - 1) * lineSpase + startCord;

  const onPdfTextExport = () => {
    const pdf = new jsPDF("p", "mm", "a4"); // eslint-disable-line new-cap

    entries.forEach((page, key) => {
      if (key) pdf.addPage();
      let line = 1;

      pdf.setFontSize(24);
      pdf.setFont(font, "normal");
      pdf.text("HMS NONSUCH", 105, 22, {}, 0, "center");

      pdf.setFontSize(12);
      pdf.text(`- ${key + 1} -`, 105, 290, {}, 0, "center");

      page.forEach(
        ({ fieldsFormatted, mType, privacy, created, linePoint }) => {
          pdf.setFont(font, "normal");
          pdf.text(
            timeX,
            lineCord(line),
            new Date(created).toLocaleTimeString()
          );

          pdf.setFont(font, "bold");
          pdf.text(
            textX,
            lineCord(line),
            `${mType} ${privacy ? `(${privacy})` : ""}`
          );

          if (fieldsFormatted) {
            pdf.setFont(font, "normal");
            pdf.text(textX, lineCord(line + 1), fieldsFormatted);
          }

          line += linePoint;
        }
      );
    });

    pdf.save("Text.pdf");
  };

  return (
    <div style={{ marginTop: "10px" }}>
      Export:
      <Button
        color="success"
        onClick={onPdfTextExport}
        disabled={!entries.length}
      >
        PDF
      </Button>
    </div>
  );
};

Export.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      selected: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
      created: PropTypes.object.isRequired,
      mType: PropTypes.string.isRequired,
      privacy: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default Export;
