import PropTypes from "prop-types";
import React from "react";

class HighlightOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }

  componentDidMount() {
    this.updateWindowSize();
    window.onresize = () => this.updateWindowSize();
  }

  componentDidUpdate = () => {
    this.updateCanvas();
  };

  getBodySize = () => document.body.getBoundingClientRect();

  updateCanvas = () => {
    /* eslint-disable-next-line */
    const context = this.refs.canvas.getContext("2d");
    context.save();
    this.drawBackground(context);
    context.globalCompositeOperation = "destination-out";
    /* eslint-disable-next-line */
    for (let index = 0; index < this.props.targets.length; index++) {
      this.drawHighlight(context, this.props.targets[index]);
    }
    context.restore();
  };

  updateWindowSize = () => {
    const { width, height } = this.getBodySize();

    this.setState({
      width,
      height
    });
  };
  drawBackground = context => {
    const { width, height } = this.getBodySize();
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.rect(0, 0, width, height);
    /* eslint-disable-next-line */
    context.fillStyle = this.props.backgroundColor;
    context.fill();
  };

  drawHighlight = (context, target) => {
    const targetObject = document.querySelector(target);
    if (!targetObject) {
      setTimeout(() => {
        this.drawHighlight(context, target);
      }, 200);
      return;
    }
    const { top, left, width, height } = targetObject.getBoundingClientRect();
    context.beginPath();
    context.rect(left, top, width, height);
    /* eslint-disable-next-line */
    context.fillStyle = "white";
    context.fill();
  };

  render = () => (
    <canvas
      /* eslint-disable-next-line */
      ref="canvas"
      width={this.state.width}
      height={this.state.height}
      style={{
        pointerEvents: "none",
        top: 0,
        left: 0,
        position: "absolute",
        zIndex: this.props.zIndex
      }}
    />
  );
}

HighlightOverlay.propTypes = {
  targets: PropTypes.array,
  zIndex: PropTypes.number,
  backgroundColor: PropTypes.string
};

HighlightOverlay.defaultProps = {
  targets: [],
  zIndex: 1400,
  backgroundColor: "rgba(0, 0, 0, 0.6)"
};
export default HighlightOverlay;
