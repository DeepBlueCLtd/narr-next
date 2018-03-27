import { Badge } from "reactstrap";
import { EntryType } from "./Schemas";
import { withState } from "recompose";
import PropTypes from "prop-types";
import React from "react";

const Entry = ({
  selected,
  entry: { text, id, created, mType, privacy }
}) => (
  <div
    style={{
        backgroundColor: selected ? "#FFFFFF" : "transparent"
      }}>
    <span>
      {created.toLocaleTimeString()}  {id}
      <Badge style={{ margin:"2px",width: "100px" }}>{mType}</Badge>
      <Badge>
        {privacy}
      </Badge>
    </span>

    <span style={{ paddingLeft: "10px" }}>
      {Object.keys(text).map(key => (
        <span style={{ paddingLeft: "5px" }}>
          <b>{key}</b> : {text[key]}
        </span>
        ))}
    </span>
  </div>
);

Entry.propTypes = {
  entry: EntryType.isRequired,
  selected: PropTypes.bool.isRequired
};

const enhanced = withState("open", "setOpen", false);

export default enhanced(Entry);
