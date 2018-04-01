import { connect } from "react-redux";
import { getVisibleEntries } from "./VisibleEntryList";
import ExportPdf from "../components/ExportPdf";
import jsPDF from "jspdf";

const lineWidth = 195;
const maxLines = 36;

const groupEntries = state => {
  let entries = getVisibleEntries(
    state.entries,
    state.visibilityFilter,
    state.privacyFilter,
    state.timeFilter,
    state.typeFilter,
    state.searchKeyword
  );

  const pdf = new jsPDF("p", "mm", "a4"); // eslint-disable-line new-cap

  entries = entries.map(entry => {
    const theE = entry;

    theE.linePoint = 1;

    const textArray = [];

    if (theE.fields) {
      /* eslint-disable-next-line */
      Object.keys(theE.fields).forEach((field, key) => {
        textArray.push(`${field}: ${theE.fields[field]}`);
      });
    }

    theE.fieldsFormatted = null;

    if (textArray.length) {
      theE.fieldsFormatted = pdf.splitTextToSize(
        textArray.join(", "),
        lineWidth
      );
      theE.linePoint += theE.fieldsFormatted.length;
    }

    return theE;
  });

  const pages = [];

  for (let i = 0, line = 0, pageInd = 0; i < entries.length; i++) {
    if (!pages[pageInd]) pages[pageInd] = [];

    pages[pageInd].push(entries[i]);
    line += entries[i].linePoint;

    if (entries[i + 1] && entries[i + 1].linePoint + line > maxLines) {
      pageInd++;
      line = 0;
    }
  }

  return pages;
};

const mapStateToProps = state => ({
  entries: groupEntries(state)
});

const Export = connect(mapStateToProps)(ExportPdf);

export default Export;
