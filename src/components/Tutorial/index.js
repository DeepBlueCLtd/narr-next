import "tether-shepherd/dist/css/shepherd-theme-dark.css";
/* eslint-disable */
import React from "react";
import Shepherd from "tether-shepherd";
import { lifecycle, compose, withState } from "recompose";
import styled from "styled-components";
import HighlightOverlay from "./Overlay";
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
  transition: all 0.4s ease-in;
  pointer-events : ${props => (props.prevent ? "all" : "none")}
  background-color: ${props =>
    props.overlay && props.visible ? "rgba(0, 0, 0, 0.8)" : "transparent"};
  /* box-shadow: ${props =>
    props.visible ? "0 0 0 99999px rgba(0, 0, 0, 0.8)" : "transparent"}; */
`;

function revisedRandId() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(2, 10);
}

const JoyStepInter = ({
  context,
  uniqueId,
  setVisible,
  visible,
  order,
  prevent
}) => (
  <React.Fragment>
    <Overlay visible={visible} prevent={prevent} className={uniqueId} />
  </React.Fragment>
);

const Wrapped = compose(
  withState("visible", "setVisible", false),
  lifecycle({
    componentWillUnmount() {
      // this.step.destroy();
      // window.removeEventListener("mousemove", this.listener);
    },
    componentDidMount() {
      const id = revisedRandId();
      // this.listener = window.addEventListener("mousemove", e => {
      //   if (
      //     !this.props.context.tour.currentStep ||
      //     this.props.context.tour.currentStep.id.toString() !=
      //       this.props.order.toString()
      //   ) {
      //     return;
      //   }
      //   const targetObject = document.querySelector("." + id);
      //   const {
      //     top,
      //     left,
      //     width,
      //     height
      //   } = targetObject.getBoundingClientRect();
      //   console.warn(e.clientX, e.clientY);
      //   if (
      //     e.clientX >= left &&
      //     e.clientX <= left + width &&
      //     e.clientY >= top &&
      //     e.clientY <= top + height
      //   ) {
      //     console.warn("inisde", top, left, width, height);
      //     this.setState({ prevent: false });
      //   } else {
      //     this.setState({ prevent: true });
      //   }
      // });
      this.setState({ uniqueId: id });
      this.step = this.props.context.tour.addStep({
        id: this.props.order.toString(),
        title: this.props.title || "",
        text: this.props.text || "NO text  was passed",
        attachTo: {
          element: `.${id}`,
          on: this.props.position
        },
        classes: "shepherd-theme-dark " + this.props.className,
        beforeShowPromise: () => {
          this.props.setVisible(true);
          this.props.context.setOverlay("." + id);
          return Promise.resolve();
        },
        buttons: [
          {
            text: "Next",
            action: () => {
              this.props.context.hideOverlay("." + id);

              this.props.context.next();
              this.props.setVisible(false);
            }
          }
        ]
      });
      if (this.props.show) {
        this.props.setVisible(true);
        this.step.show();
      }
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
    this.state = {
      targets: []
    };
  }

  render() {
    return (
      <React.Fragment>
        <Provider
          value={{
            tour: this.tour,
            next: () => {
              let nextStep = null;
              this.tour.steps.forEach(step => {
                if (
                  parseInt(step.id, 10) > parseInt(this.tour.currentStep.id, 10)
                ) {
                  if (!nextStep || parseInt(nextStep.id) > parseInt(step.id))
                    nextStep = step;
                }
              });

              if (nextStep) this.tour.show(nextStep.id.toString());
              else {
                this.setState({ targets: [] });
                this.tour.hide();
              }
            },
            setOverlay: ta => this.setState({ targets: [ta] }),
            hideOverlay: ta => {
              this.setState({
                targets: this.state.targets.filter(x => x == ta)
              });
            }
          }}
        >
          {this.state.targets.length > 0 && (
            <HighlightOverlay targets={this.state.targets} />
          )}

          {this.props.children}
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
