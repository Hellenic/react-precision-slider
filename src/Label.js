import PropTypes from 'prop-types';
import React from 'react';

const Label = props => <span className="rpc-label">{props.label}</span>;

Label.propTypes = {
  label: PropTypes.string.isRequired
};

export default Label;
