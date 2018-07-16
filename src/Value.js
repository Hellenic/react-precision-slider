import PropTypes from 'prop-types';
import React from 'react';

const Value = props => <span className="rpc-value">{props.value}</span>;

Value.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default Value;
