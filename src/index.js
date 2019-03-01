import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MainSlider from './MainSlider';
import Value from './Value';
import ValueBar from './ValueBar';
import Label from './Label';
import Reset from './Reset';
import LoopingSlider from './LoopingSlider';
import { clamp, round } from './MathUtils';

class Slider extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    defaultValue: PropTypes.number,
    value: PropTypes.number,
    label: PropTypes.string,
    onChange: PropTypes.func,
    icons: PropTypes.shape({
      main: PropTypes.any,
      secondary: PropTypes.any,
      reset: PropTypes.any
    })
  };
  static defaultProps = {
    min: 0,
    max: 10,
    step: 0.1,
    defaultValue: 0,
    value: null,
    label: null,
    onChange: () => {},
    icons: {
      main: '↑',
      secondary: '↓',
      reset: '↺'
    }
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
    const initialValue = this.props.value || this.state.value;
    const currentValue = clamp(initialValue, this.props.min, this.props.max);
    if (currentValue !== initialValue) {
      console.warn(
        'Given value/defaultValue should be within given min/max boundaries'
      );
    }
    const { defaultValue, step, onChange, value, label, ...rest } = this.props;
    return (
      <div className="react-precision-slider">
        <div>
          <Reset onClick={this.handleReset} icon={this.props.icons.reset} />
          {label && <Label label={label} />}
          <Value value={round(currentValue, 4)} />
        </div>
        <div>
          <LoopingSlider
            range={step}
            value={currentValue}
            onChange={this.handleChange}
            {...rest}
          />
          <ValueBar />
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
