import PropTypes from 'prop-types';
import React from 'react';

const Reset = props => (
  <span className="rpc-reset" onClick={props.onClick}>
    💠
  </span>
);

Reset.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Reset;
