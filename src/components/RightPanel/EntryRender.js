import { Button } from "reactstrap";
import { EntryType } from "../Schemas";
import { compose, mapProps, withState } from "recompose";
import { connect } from "react-redux";
import { set } from "lodash";
import EntryModal from "./EntryModal";
import EntryStatus from "../Schemas/EntryStatus";
import PropTypes from "prop-types";
import React from "react";

const EntryRender = ({
  entry,
  toggleModal,
  modalVisible,
  onSubmit,
  values,
  setValues
}) => (
  <div>
    <Button
      outline
      color="secondary"
      onClick={toggleModal}
      style={{ width: "100%", height: "100%" }}
    >
      {entry.name}
    </Button>
    <EntryModal
      values={values}
      setValue={setValues}
      visible={modalVisible}
      entry={entry}
      toggle={toggleModal}
      onSubmit={onSubmit}
    />
  </div>
);

const enhancer = compose(
  mapProps(props => ({
    values: props.values,
    setValues: (label, val) => {
      const nValues = { ...props.values };
      props.setValues(set(nValues, label, val));
    },
    onSubmit: () => {
      // join to string
      const entry = {
        name: props.entry.name,
        fields: props.values,
        status: EntryStatus.Completed,
        mType: props.entry.id
      };
      props.onSubmit(entry);
    },
    entry: props.entry,
    modalVisible: props.modalVisible,
    toggleModal: (clear = true) => {
      if (!props.useModal) {
        const res = props.entry;
        const fields = {};
        res.fields.forEach(key => {
          fields[key.name] = "";
        });
        const entry = {
          name: res.name,
          mType: res.id,
          category: res.category,
          fields
        };
        props.onSubmit(entry);
        return;
      }

      props.setModalVisible(!props.modalVisible);
      if (clear) props.setValues({});
    },
    setModalVisible: props.setModalVisible
  }))
);

export const EntryRenderUnControlled = enhancer(EntryRender);

EntryRender.propTypes = {
  entry: EntryType.isRequired,
  toggleModal: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.object,
  setValues: PropTypes.func.isRequired
};

const enhancer2 = compose(
  connect(state => ({
    useModal: state.ui.useModalEdit
  })),
  withState("values", "setValues", {}),
  withState("modalVisible", "setModalVisible", false),
  enhancer
);

export default enhancer2(EntryRender);
