import PropTypes from 'prop-types';
import React from 'react';

const Reset = props => (
  <span className="rpc-reset" onClick={props.onClick}>
    {props.icon}
  </span>
);

Reset.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.any
};

export default Reset;
