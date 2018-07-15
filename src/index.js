import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MainSlider from './MainSlider';
import LoopingSlider from './LoopingSlider';
import { clamp, round } from './MathUtils';

class Slider extends Component {
  static propTypes = {
    label: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    defaultValue: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };
  static defaultProps = {
    label: null,
    min: 0,
    max: 10,
    step: 0.1,
    defaultValue: 0,
    value: null
  };
  constructor(props) {
    super(props);
    this.state = {
      initialValue: props.value || props.defaultValue,
      value: props.defaultValue
    };
  }
  handleChange = value => {
    this.setState({ value });
    this.props.onChange(value);
  };
  handleReset = () => {
    const { initialValue } = this.state;
    this.setState({ value: initialValue });
    this.props.onChange(initialValue);
  };
  render() {
    // If 'value' prop is given, this becomes a controlled component
    const currentValue = this.props.value || this.state.value;
    if (clamp(currentValue, this.props.min, this.props.max) !== currentValue) {
      throw new Error(
        'Given value/defaultValue should be within given min/max boundaries'
      );
    }
    const { defaultValue, label, step, onChange, value, ...rest } = this.props;
    return (
      <div style={{ textAlign: 'left' }}>
        <span>{label}</span>
        <span
          style={{ marginLeft: '60%', cursor: 'pointer' }}
          onClick={this.handleReset}
        >
          💠
        </span>
        <span style={{ float: 'right' }}>{round(currentValue, 4)}</span>
        <div>
          <LoopingSlider
            range={step}
            value={currentValue}
            onChange={this.handleChange}
          />
          <div
            style={{
              width: '100%',
              height: '5px',
              background:
                'repeating-linear-gradient(to right,#f6ba52,#f6ba52 10px,#ffd180 10px,#ffd180 20px)'
            }}
          />
          <MainSlider
            step={step}
            value={currentValue}
            {...rest}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
export default Slider;
