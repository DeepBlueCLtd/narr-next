import { Card, CardHeader } from "reactstrap";
import Icon from "react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { Step } from "../Tutorial";
import Filters from "./Filters";
import ScrollingView from "./ScrollingView";

const ExpandStyle = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  border-radius: 50%;
  padding-right: 7px;
  padding-left: 7px;
  padding-top: 1px;
  padding-bottom: 1px;
  background: lightgray;
  transition: all 0.5s ease;
  &:hover {
    background: darkgray;
  }
`;

const ExpandButton = ({ onClick, expanded }) => (
  <ExpandStyle onClick={onClick}>
    <Step
      order={10}
      title="Reviewing data"
      text="The earlier steps showed how the timestamp for a series of events can be captured quickly, then filled in during a more quiet period. Click on this button to expand the narrative, so we can start tidying it.  The event buttons are still on the right-hand side, in case the narrative-keeper wants to insert an entry while still focussing on the content."
      position="bottom"
      overlay
    />{" "}
    <Icon name={expanded ? "chevron-left" : "chevron-right"} />{" "}
  </ExpandStyle>
);

ExpandButton.propTypes = {
  onClick: PropTypes.func,
  expanded: PropTypes.bool.isRequired
};

ExpandButton.defaultProps = {
  onClick: () => null
};

const LeftPanel = ({ toggleExpand, expanded }) => (
  <Card style={{ height: "100%" }}>
    <Step
      order={2}
      title="Narrative"
      text="Here is where the narrative is going to be collated, similar to the Document in the traditional narrative. At the top are a set of controls used to manipulate the whole narrative."
      position="right"
    />
    <Step
      order={11}
      title="Editing Data"
      text="You can now finish off populating new entries. To edit existing data, just double-click on an entry.  A version history is captured for each entry, to support post-event analysis."
      position="left"
      overlay
    />{" "}
    <CardHeader
      className="bg-primary text-center text-white"
      style={{
        textTransform: "uppercase",
        fontWeight: "bolder"
      }}
    >
      <ExpandButton expanded={expanded} onClick={toggleExpand} />

      <Filters />
    </CardHeader>
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ScrollingView />
    </div>
  </Card>
);

LeftPanel.propTypes = {
  toggleExpand: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired
};

export default LeftPanel;
