import { Badge, Card } from "reactstrap";
import { DeleteEntry, UpdateEntry } from "../actions";
import { EntryType } from "./Schemas";
import { compose, lifecycle, mapProps, withState } from "recompose";
import { connect } from "react-redux";
import EntryEditor from "./EntryEditor";
import EntryStatus from "./Schemas/EntryStatus";
import PropTypes from "prop-types";
import React from "react";
import moment from "moment";

export const colors = {
  public: "success",
  sensitive: "info"
};

const Entry = ({
  selected,
  entry,
  useModalEdit,
  expandedView,
  editMode,
  setEditMode,
  updateEntry,
  measure,
  deleteEntry
}) => {
  const { id, created, mType, privacy, fields, color } = entry;
  return (
    <div
      className="inner-filter"
      style={{
        border: `2px solid ${color}`,
        backgroundColor: selected ? "#FFFFFF" : "transparent",
        padding: "0px",
        margin: "5px"
      }}
      onDoubleClick={() => {
        setEditMode(true);
        measure();
      }}
    >
      <Card style={{ padding: "0rem", fontSize: "12px" }}>
        <div>
          {moment(created).format("DDHHmm")}
          <span className="font-small">
            {`:${moment(created).format("SS")}`}
          </span>
          <Badge style={{ margin: "2px", width: "90px" }}>{mType}</Badge>
          <Badge>{privacy}</Badge>
        </div>

        {!editMode && (
          <div style={{ paddingLeft: "10px" }}>
            {Object.keys(fields).map(key => (
              <span key={key} style={{ paddingLeft: "5px" }}>
                <b>{key}</b>: {fields[key]}
              </span>
            ))}{" "}
            ({id})
          </div>
        )}
        <EntryEditor
          inline={!useModalEdit}
          expanded={expandedView}
          entry={entry}
          active={editMode}
          setActive={ac => {
            setEditMode(ac);
            measure();
          }}
          onCancel={() => {
            if (entry.status === "empty") deleteEntry(entry.id);
          }}
          onSubmit={updateEntry}
        />
      </Card>
    </div>
  );
};

Entry.propTypes = {
  entry: EntryType.isRequired,
  selected: PropTypes.bool.isRequired
};

Entry.propTypes = {
  entry: EntryType.isRequired,
  selected: PropTypes.bool,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  expandedView: PropTypes.bool.isRequired,
  useModalEdit: PropTypes.bool.isRequired,
  updateEntry: PropTypes.func.isRequired,
  measure: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired
};

const enhanced = compose(
  lifecycle({
    componentDidMount() {
      this.props.measure();
    }
  }),
  connect(
    state => ({
      expandedView: state.ui.expanded,
      useModalEdit: state.ui.useModalEdit
    }),
    {
      updateEntry: UpdateEntry,
      deleteEntry: DeleteEntry
    }
  ),
  withState("editMode", "setEditMode", false),
  withState("open", "setOpen", false),
  mapProps(props => ({
    ...props,
    editMode: props.editMode || props.entry.status === EntryStatus.Empty
  }))
);

export default enhanced(Entry);
