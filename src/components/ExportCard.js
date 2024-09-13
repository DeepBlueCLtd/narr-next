import { Badge, Button } from "reactstrap";
import { Step } from "./Tutorial";
import { StyleSheet, css } from "aphrodite";
import { colors } from "./Entry";
import PropTypes from "prop-types";
import React from "react";
import jsPDF from "jspdf";

const styles = StyleSheet.create({
  exportBtn: {
    margin: "-13px 0 -10px 0"
  },
  exportBoxDebug: {
    position: "absolute",
    left: 420,
    top: -280,
    zIndex: 100,
    boxShadow: "0 0 0 1px #000"
  },
  exportBox: {
    width: 0,
    height: 0,
    overflow: "hidden"
  },
  exportContent: {
    backgroundColor: "#fff",
    width: "210mm",
    marginLeft: "auto",
    marginRight: "auto"
  },
  layout: {
    padding: "36mm 10mm 15mm 10mm",
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
    height: "297mm"
  },
  title: {
    position: "absolute",
    top: "12mm",
    left: "0",
    width: "100%",
    textAlign: "center",
    fontWeight: "300"
  },
  pageNumber: {
    position: "absolute",
    bottom: "5mm",
    left: 0,
    width: "100%",
    textAlign: "center"
  },
  dataContent: {
    height: "100%"
  },
  listRight: {
    marginLeft: "25mm"
  },
  listItem: {
    position: "relative"
  },
  listTime: {
    float: "left",
    textDecoration: "underline"
  },
  listText: {
    marginLeft: "25mm"
  }
});

const Export = ({ entries }) => {
  const pages = [];

  const startCord = 40.5;
  const lineSpase = 6.4;
  const lineCord = line => (line - 1) * lineSpase + startCord;
  const timeX = 10;
  const textX = 65;

  const onPdfTextExport = () => {
    const pdf = new jsPDF(); // eslint-disable-line new-cap

    entries.forEach((page, key) => {
      if (key) pdf.addPage();
      let line = 1;

      pdf.setFontSize(24);
      pdf.setFont("Helvetica", "normal");
      pdf.text("HMS NONSUCH", 105, 22, {}, 0, "center");

      pdf.setFontSize(12);
      pdf.text(`- ${key + 1} -`, 105, 290, {}, 0, "center");

      page.forEach(({ fields, mType, privacy, created, linePoint }) => {
        let text = "";
        Object.keys(fields).map(
          key2 => (text = `${text + key2}, ${fields[key2]}`) // eslint-disable-line no-return-assign
        );

        pdf.setFont("Helvetica", "normal");
        pdf.text(timeX, lineCord(line), created);

        pdf.setFont("Helvetica", "bold");
        pdf.text(textX, lineCord(line), `${mType} (${privacy})`);

        pdf.setFont("Helvetica", "normal");
        const splitText = pdf.splitTextToSize(text, 140);
        pdf.text(textX, lineCord(line + 1), splitText);

        line += linePoint + Math.ceil(text.length / 100);
      });
    });

    pdf.save("Text.pdf");
  };

  const PdfLayout = (
    { children, page } // eslint-disable-line react/prop-types
  ) => (
    <div className={css(styles.layout)}>
      <h1 className={`${css(styles.title)} display-5`}>HMS NONSUCH</h1>
      <div className={css(styles.dataContent)}>{children}</div>
      <div className={css(styles.pageNumber)}>- {page} -</div>
    </div>
  );

  const PdfBody = (
    entries // eslint-disable-line no-shadow
  ) => (
    <div>
      {entries.map(({ created, mType, privacy, text }, index) => (
        <div key={index} className={styles.listItem}>
          <div>
            <span className={css(styles.listTime)}>{created}</span>
            <div className={css(styles.listRight)}>
              <b>{mType}</b> <Badge color={colors[privacy]}>{privacy}</Badge>
            </div>
          </div>
          <div className={css(styles.listText)}>{text}</div>
          <br />
        </div>
      ))}
    </div>
  );

  const Pdf = () => (
    <div className={css(styles.exportBox)}>
      {entries.map((pageEntries, index) => (
        <div
          key={index}
          ref={node => {
            pages[index] = node;
          }}
          className={css(styles.exportContent)}
        >
          <PdfLayout page={index + 1}>{PdfBody(pageEntries)}</PdfLayout>
        </div>
      ))}
    </div>
  );

  return (
    <Button
      color="primary"
      size="sm"
      className={`${css(styles.exportBtn)}dropdown-toggle btn btn-secondary`}
      onClick={onPdfTextExport}
      disabled={!entries.length}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Pdf />
        PDF
        <Step
          order={13}
          title="Exporting data"
          text="One of the main roles of the narrative is to form part of a deployment report.  Click on the PDF button to see the exported data."
          position="bottom"
          overlay
        />
      </div>
    </Button>
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
