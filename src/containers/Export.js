import { connect } from 'react-redux';
import ExportPdf from '../components/ExportPdf';
import { getVisibleEntries } from './VisibleEntryList';
import jsPDF from 'jspdf';

const lineWidth = 195;
const maxLines = 36;

const groupEntries = (state) => {
  let entries = getVisibleEntries(
    state.entries,
    state.visibilityFilter,
    state.privacyFilter,
    state.timeFilter,
    state.typeFilter,
    state.searchKeyword
  );

  const pdf = new jsPDF("p", "mm", "a4");

  entries = entries.map(entry => {
    entry.linePoint = 1;

    let textArray = [];

    if(entry.fields)
      Object.keys(entry.fields).forEach((field, key) => {
        textArray.push(`${field}: ${entry.fields[field]}`)
      })
    ;

    entry.fieldsFormatted = null;

    if(textArray.length) {
      entry.fieldsFormatted = pdf.splitTextToSize(textArray.join(', '), lineWidth);
      entry.linePoint += entry.fieldsFormatted.length;
    }

    return entry;
  });

  let pages = [];

  for(let i = 0, line=0, pageInd = 0; i < entries.length; i++) {
    if(!pages[pageInd])
      pages[pageInd] = []
    ;

    pages[pageInd].push(entries[i]);
    line += entries[i].linePoint;

    if(entries[i+1] && entries[i+1].linePoint + line > maxLines) {
      pageInd++;
      line=0;
    }
  }

  return pages;
}

const mapStateToProps = state => {
  return {
    entries: groupEntries(state)
  }
};

const Export = connect(
    mapStateToProps
)(ExportPdf);

export default Export;
