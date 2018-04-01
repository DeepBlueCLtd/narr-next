import {
  Button,
  ButtonGroup,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  UncontrolledDropdown
} from "reactstrap";
import {
  ClearEntries,
  SetSimulationRate,
  ToggleModalEdit,
  ToggleSimulation,
  addEntries as addEntryAction
} from "../../actions";
import { Step } from "../Tutorial";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import { connect } from "react-redux";
import Generator from "../../Generator";
import Icon from "react-fontawesome";
import Panel from "./Panel";
import PropTypes from "prop-types";
import React from "react";
import moment from "moment";

let generators = null;
const GeneratorConfig = ({
  collapse,
  currentTime,
  setRate,
  running,
  toggleSim,
  rate,
  clearEntries,
  bulkInsert
}) => (
  <Panel
    open={collapse}
    title={
      <React.Fragment>
        <Icon name="cog" /> Simulation
      </React.Fragment>
    }
    inverse
    lg={collapse ? 12 : 6}
    style={{ backgroundColor: "#333", borderColor: "#333" }}
  >
    <Step
      order={4}
      title="Generating bulk data"
      text="Just for testing, we’ve also introduced some controls to generate data."
      position="left"
      overlay
    />
    <Form style={{ padding: "10px", width: "100%" }}>
      <FormGroup row>
        <Label lg={collapse ? 12 : 2}>Time</Label>
        <Col lg={collapse ? 12 : 10}>
          <Input
            readonly
            type="text"
            name="select"
            value={`${moment(currentTime).format("DDHHmm")}:${moment(
              currentTime
            ).format("ss")}`}
          />
        </Col>
      </FormGroup>
      <Row>
        <Col lg={collapse ? 6 : 4}>
          <FormGroup row>
            <Label lg={collapse ? 12 : 6}>Running</Label>
            <Col lg={collapse ? 12 : 6}>
              <Button onClick={toggleSim}>
                <Icon name={running ? "pause" : "play"} size="3x" />
              </Button>
            </Col>
          </FormGroup>
        </Col>
        <Col lg={collapse ? 6 : 6}>
          <FormGroup row>
            <Label lg={collapse ? 12 : 4}>Rate</Label>
            {!collapse && (
              <Col lg={collapse ? 12 : 8}>
                <ButtonGroup size="sm">
                  <Button outline color="primary" onClick={() => setRate(1)}>
                    1x
                  </Button>
                  <Button outline color="primary" onClick={() => setRate(2)}>
                    2x
                  </Button>
                  <Button outline color="primary" onClick={() => setRate(5)}>
                    5x
                  </Button>

                  <Button outline color="primary" onClick={() => setRate(10)}>
                    10x
                  </Button>
                  <Button outline color="primary" onClick={() => setRate(20)}>
                    20x
                  </Button>
                  <Button outline color="primary" onClick={() => setRate(50)}>
                    50x
                  </Button>
                </ButtonGroup>
              </Col>
            )}
            {collapse && (
              <Col lg={8}>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    outline
                    color="primary"
                    style={{ width: "63px", height: "62px" }}
                  >
                    {rate} x
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setRate(1)}>1x</DropdownItem>
                    <DropdownItem onClick={() => setRate(2)}>2x</DropdownItem>
                    <DropdownItem onClick={() => setRate(5)}>5x</DropdownItem>
                    <DropdownItem onClick={() => setRate(10)}>10x</DropdownItem>
                    <DropdownItem onClick={() => setRate(20)}>20x</DropdownItem>
                    <DropdownItem onClick={() => setRate(50)}>50x</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>
            )}
          </FormGroup>
        </Col>
      </Row>
      <FormGroup row>
        {!collapse && (
          <React.Fragment>
            <Label lg={collapse ? 12 : 2}>Bulk</Label>
            <Col lg={collapse ? 6 : 6}>
              <ButtonGroup>
                <Step
                  order={9}
                  title="Sample data"
                  text="Ok, before we can start exploiting the data we could do with some more.  Click on the Add 500 (or, 5000 if you’re feeling brave)."
                  position="left"
                  overlay
                />
                <Button outline color="primary" onClick={() => bulkInsert(50)}>
                  50
                </Button>
                <Button outline color="primary" onClick={() => bulkInsert(500)}>
                  500
                </Button>
                <Button
                  outline
                  color="primary"
                  onClick={() => bulkInsert(5000)}
                >
                  5000
                </Button>
              </ButtonGroup>
            </Col>
          </React.Fragment>
        )}
        {collapse && (
          <Col lg={6}>
            <UncontrolledDropdown>
              <DropdownToggle
                caret
                outline
                color="primary"
                style={{ width: "63px", height: "62px" }}
              >
                Bulk
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => bulkInsert(50)}>50</DropdownItem>
                <DropdownItem onClick={() => bulkInsert(500)}>500</DropdownItem>
                <DropdownItem onClick={() => bulkInsert(5000)}>
                  5000
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        )}

        <Col lg={collapse ? 6 : 4}>
          <Button
            style={{
              width: collapse ? "63px" : "",
              height: collapse ? "62px" : ""
            }}
            outline
            color="warning"
            onClick={clearEntries}
          >
            Clear
          </Button>
        </Col>
      </FormGroup>
    </Form>
  </Panel>
);

GeneratorConfig.propTypes = {
  collapse: PropTypes.bool,
  bulkInsert: PropTypes.func.isRequired,
  currentTime: PropTypes.func.isRequired,
  setRate: PropTypes.func.isRequired,
  running: PropTypes.bool,
  toggleSim: PropTypes.func.isRequired,
  rate: PropTypes.number,
  clearEntries: PropTypes.func.isRequired
};

GeneratorConfig.defaultProps = {
  collapse: false
};

const enhancer = compose(
  withState("currentTime", "setTime", null),
  lifecycle({
    componentDidMount() {
      this.interval = setTimeout(
        () => this.props.setTime(Date.now(true)),
        1000
      );
    },

    componentWillUpdate() {
      window.clearTimeout(this.interval);
      this.interval = setTimeout(
        () => this.props.setTime(Date.now(true)),
        1000
      );
    },
    componentWillUnmount() {
      window.clearTimeout(this.interval);
    }
  }),

  connect(
    state => ({
      modalEdit: state.ui.useModalEdit,
      running: state.simulation.running,
      rate: state.simulation.rate,
      categories: state.ui.config.categories
    }),
    {
      toggleModalEdit: ToggleModalEdit,
      setRate: SetSimulationRate,
      toggleSim: ToggleSimulation,
      clearEntries: ClearEntries,
      addEntries: addEntryAction
    }
  ),
  lifecycle({
    componentDidMount() {
      generators = this.props.categories.map(
        x => new Generator(x, entry => this.props.addEntry(entry))
      );
    },
    componentWillUpdate(nextProps) {
      generators.forEach(gen => {
        gen.Active(nextProps.running);
      });
    },
    componentWillUnmount() {
      generators.forEach(gen => gen.Clear());
    }
  }),
  withHandlers({
    bulkInsert: props => number => {
      let b = number;
      const entries = [];
      while (b > 0) {
        const index = parseInt(Math.random() * generators.length, 10);
        entries.push(generators[index].generateOne());
        b--;
      }
      props.addEntries(entries);
    }
  })
);
export default enhancer(GeneratorConfig);
