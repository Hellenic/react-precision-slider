import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
    }
  }
  handleMiniChange(event) {
    const { value, miniValue } = this.state;
    const nextMini = parseFloat(event.target.value);
    const nextValue = (value - miniValue) + nextMini
    this.setState({
      value: nextValue,
      miniValue: nextMini
    });
    this.props.onChange(nextValue);
  }
  handleChange(event) {
    let value = parseFloat(event.target.value);
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    const { value, miniValue } = this.state;
    const { defaultValue, label, step, onChange, ...rest } = this.props;
    return (
      <div>
        <label>{label}</label>
        <header>{value}</header>
        <div>
          <input type="range" min={-step} max={step} step={step/100} value={miniValue} onChange={e => this.handleMiniChange(e)} />
          <input type="range" step={step} {...rest} value={value} onChange={e => this.handleChange(e)} />
        </div>
      </div>
    )
  }
}
export default Slider;
