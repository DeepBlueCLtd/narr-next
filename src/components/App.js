import { CategoryType } from "./Schemas";
import { Col, Row } from "reactstrap";
import { ToggleUiExpand, addEntry } from "../actions";
import { compose } from "recompose";
import { connect } from "react-redux";
import LeftPanel from "./LeftPanel";
import PropTypes from "prop-types";
import React from "react";
import RightPanel from "../containers/RightPanel";
import Tutorial, { Step } from "./Tutorial";

const App = ({ expanded, toggleExpand, config }) => (
  <Tutorial>
    <Step
      order={1}
      title="Welcome"
      text="
Welcome to the Next-Narrative Demonstrator. This is a browser-based technical demonstrator aimed to validate the following:
<ul>
<li>Browser performance with high volumes of narrative data</li>
<li>Offline-first application (without backend server)</li>
<li>Browser-based export to PDF</li>
</ul>
Adoption of a browser-based application brings the following benefits: 
<ul>
<li>Adherence to web standards make the application future-proof</li>
<li>Versatile, capable UI tools, including re-configurable event library</li>
<li>Secure: nothing is “installed” on client PC, and the app has no direct access to local storage</li>
<li>Should there be a wish to connect to a central server, http is regularly one of the first interfaces to be opened up</li>
</ul>"
      position="center"
      show
      overlay
      forcePrevent
    />
    <Row
      style={{
        width: "100%",
        height: "100%",
        paddingRight: "0",
        paddingLeft: "0px",
        margin: "0px"
      }}
    >
      <Col lg={expanded ? 10 : 3}>
        <LeftPanel toggleExpand={toggleExpand} expanded={expanded} />
      </Col>
      <Col
        style={{
          overflowY: "auto",
          overflowX: "none",
          maxHeight: "100%",
          padding: "0px"
        }}
        lg={expanded ? 2 : 9}
      >
        <Step
          order={3}
          title="Generating Entries"
          text="Here is a set of categorised entry types.  The layout comes from an editable data-file, so it’s quite possible to distribute a set of layouts, to suit different platforms, tasking, or narrative-keeper roles."
          position="left"
          overlay
        />
        <RightPanel collapse={expanded} categories={config.categories} />
      </Col>
    </Row>
  </Tutorial>
);

App.propTypes = {
  expanded: PropTypes.bool.isRequired,
  toggleExpand: PropTypes.func.isRequired,
  config: PropTypes.shape({
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(CategoryType)
  }).isRequired
};

const enhancer = compose(
  connect(
    state => ({
      config: state.ui.config,
      expanded: state.ui.expanded,
      running: state.simulation.running
    }),
    {
      addEntry,
      toggleExpand: ToggleUiExpand
    }
  )
);

export default enhancer(App);
