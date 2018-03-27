import { CardBody } from "reactstrap";
import Entry from "./Entry";
import PropTypes from "prop-types";
import React from "react";

const EntryList = ({ entries, onEntryClick }) => (
  <CardBody>
    {entries.map((entry, index) => (
      <Entry key={entry.id} entry={entry} onClick={() => onEntryClick(index)} />
    ))}
  </CardBody>
);

EntryList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      selected: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
      created: PropTypes.object.isRequired,
      mType: PropTypes.string.isRequired,
      privacy: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onEntryClick: PropTypes.func.isRequired
};

export default EntryList;
