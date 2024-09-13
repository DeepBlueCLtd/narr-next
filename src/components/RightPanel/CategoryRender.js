import { Card, CardColumns } from "reactstrap";
import { CategoryType } from "../Schemas";
import { Step } from "../Tutorial";
import EntryRender from "./EntryRender";
import Panel from "./Panel";
import PropTypes from "prop-types";
import React from "react";
import WidgetRender from "./WidgetRender";

const CategoryRender = ({ category, collapse, addEntry }) => (
  <Panel
    style={{ borderWidth: "3px", borderColor: `${category.color}` }}
    title={category.name}
    color={category.color}
    open={collapse}
    lg={collapse ? 12 : 6}
  >
    <CardColumns style={{ columnCount: collapse ? 1 : 2 }}>
      {category.widgets &&
        category.widgets.filter(x => !x.hidden).map(entry => (
          <Card key={entry.id}>
            {entry.step && (
              <Step
                order={entry.step.order}
                title={entry.step.title}
                text={entry.step.text}
                position={entry.step.text}
              />
            )}
            <WidgetRender config={entry} />
          </Card>
        ))}
      {category.entries.filter(x => !x.hidden).map(entry => (
        <Card key={entry.id}>
          <EntryRender
            entry={entry}
            onSubmit={en =>
              addEntry({
                ...en,
                category: category.name,
                color: category.color
              })
            }
          />
        </Card>
      ))}
    </CardColumns>
  </Panel>
);

CategoryRender.propTypes = {
  category: CategoryType.isRequired,
  collapse: PropTypes.bool,
  addEntry: PropTypes.func.isRequired
};

CategoryRender.defaultProps = {
  collapse: false
};

export default CategoryRender;
