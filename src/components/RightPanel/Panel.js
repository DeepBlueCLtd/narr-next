import { Card, CardBody, CardHeader } from "reactstrap";
import { compose, mapProps, withState } from "recompose";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Color = styled.div`
  padding: 10px;
  background-color: ${props => props.color};
  border-radius: 50%
  display:inline-block;
  margin-right : 5px;
`;

const Panel = ({
  color,
  style,
  inverse,
  children,
  title,
  open,
  setOpen,
  ...rest
}) => (
  <Card {...rest} inverse={inverse} style={style}>
    <CardHeader
      onDoubleClick={() => {
        setOpen(!open);
      }}
      className="bg-primary text-center text-white"
      style={{
        textTransform: "uppercase",
        fontWeight: "bolder"
      }}
    >
      <Color color={color} />
      {title}
    </CardHeader>
    {open && <CardBody>{children}</CardBody>}
  </Card>
);

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  collapse: PropTypes.bool,
  color: PropTypes.string,
  style: PropTypes.any,
  inverse: PropTypes.bool,
  children: PropTypes.element,
  open: PropTypes.bool,
  setOpen: PropTypes.func
};

Panel.defaultProps = {
  collapse: false
};

const enhancer = compose(
  withState("openS", "setOpen", false),
  mapProps(props => ({
    ...props,
    open: (props.openS && props.open) || !props.open
  }))
);
export default enhancer(Panel);
