import "tether-shepherd/dist/css/shepherd-theme-dark.css";
/* eslint-disable */
import React from "react";
import Shepherd from "tether-shepherd";
import { lifecycle, compose, withState } from "recompose";
import styled from "styled-components";

export const { Provider, Consumer } = React.createContext({});

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 10px;
  padding: 5%;
  box-shadow: ${props =>
    props.visible ? "0 0 0 99999px rgba(0, 0, 0, 0.8)" : "transparent"};
`;

function revisedRandId() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(2, 10);
}

const JoyStepInter = ({ context, uniqueId, setVisible, visible }) => (
  <React.Fragment>
    <Overlay
      visible={visible}
      className={uniqueId}
      onClick={e => {
        setTimeout(() => context().start(), 10);
        setVisible(true);
        if (!visible) {
          e.preventDefault();
          e.stopPropagation();
        }
        // e.nativeEvent.stopImmediatePropagation();
      }}
    />
  </React.Fragment>
);

const Wrapped = compose(
  withState("visible", "setVisible", false),
  lifecycle({
    componentWillUnmount() {
      this.step.destroy();
    },
    componentDidMount() {
      const id = revisedRandId();
      this.setState({ uniqueId: id });
      this.step = this.props.context().addStep({
        id: 1,
        text: this.props.text || "NO text  was passed",
        attachTo: "." + id + " bottom",
        classes: "shepherd-theme-dark example-step-extra-class",
        beforeShowPromise: () => Promise.resolve(this.props.setVisible(true)),
        buttons: [
          {
            text: "Next",
            action: () => {
              this.props.context().next();
              this.props.setVisible(false);
            }
          }
        ]
      });
    }
  })
)(JoyStepInter);

export const Step = props => (
  <Consumer>
    {joyContext => (
      <React.Fragment>
        <Wrapped context={joyContext} {...props} />
        {props.children}
      </React.Fragment>
    )}
  </Consumer>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.tour = new Shepherd.Tour({ classes: "shepherd-theme-dark" });
    this.tour.start();
  }

  render() {
    return (
      <React.Fragment>
        <Provider value={() => this.tour}>{this.props.children}</Provider>
      </React.Fragment>
    );
  }
}

export default App;
