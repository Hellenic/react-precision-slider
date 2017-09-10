import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MainSlider from './MainSlider';
import LoopingSlider from './LoopingSlider';
import { round } from './MathUtils';

class Slider extends Component {
  static propTypes = {
    label: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };
  static defaultProps = {
    label: null,
    min: 0,
    max: 10,
    step: 0.1,
    defaultValue: 0
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      miniValue: 0
    };
  }
  handleMiniChange(nextMini) {
    const { value, miniValue } = this.state;
    const nextValue = (value - miniValue) + nextMini;

    this.setState({
      value: nextValue,
      miniValue: nextMini
    });
    this.props.onChange(nextValue);
  }
  handleChange(value) {
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    const { boundingBox, value, miniValue } = this.state;
    const { defaultValue, label, step, onChange, ...rest } = this.props;
    return (
      <div style={{ textAlign: 'left' }}>
        <span>{label}</span>
        <span style={{ marginLeft: '60%' }}>💠</span>
        <span style={{ float: 'right', }}>{round(value, 4)}</span>
        <div>
          <LoopingSlider range={step} defaultValue={miniValue} onChange={v => this.handleMiniChange(v)} />
          <div style={{ width: '100%', height: '5px', background: 'repeating-linear-gradient(to right,#f6ba52,#f6ba52 10px,#ffd180 10px,#ffd180 20px)' }} />
          <MainSlider step={step} defaultValue={value} {...rest} onChange={v => this.handleChange(v)} />
        </div>
      </div>
    );
  }
}
export default Slider;
