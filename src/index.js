import PropTypes from 'prop-types';
import React from 'react';

const handleChange = (event, type, cb) => {
  let value = event.target.value;
  const isInt = v => /^-?[0-9]+$/.test(`${v}`);
  value = isInt(value) ? parseInt(value, 10) : parseFloat(value);
  cb(value);
};

const Slider = props => {
  const { onChange, ...rest } = props;
  return (
    <input {...rest} onChange={e => handleChange(e, props.type, props.onChange)} />
  )
};

Slider.propTypes = {
  onChange: PropTypes.func
};

export default Slider;
