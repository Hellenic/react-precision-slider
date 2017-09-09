import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addEventListener } from 'consolidated-events';

class MainSlider extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };
  static defaultProps = {
    min: -0.1,
    max:  0.1,
    step: 0.01,
    defaultValue: 0
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      clientX: null
    }
  }
  handleMouseDown(event) {
    this.setState({
      clientX: event.clientX
    });

    this.bindMouseEvents();
  }
  handleMouseMove(event) {
    const { clientX, value } = this.state;
    const mouseMoved = (event.clientX - clientX);
    const valueFromMouse = mouseMoved * this.props.step;
    const nextValue = value + valueFromMouse;

    this.setState({ value: nextValue });
    this.props.onChange(nextValue);
  }
  bindMouseEvents() {
    this.onMouseMoveListener = addEventListener(document, 'mousemove', e => this.handleMouseMove(e));
    this.onMouseUpListener = addEventListener(document, 'mouseup', () => this.unbindMouseEvents());
  }
  unbindMouseEvents() {
    this.onMouseMoveListener();
    this.onMouseUpListener();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.value !== this.state.value);
  }
  render() {
    const { value } = this.state;
    const { min, max } = this.props;
    const range = (max - min);
    // Get percentual position between min & max for the value
    const left = (value / range) * 100;
    const style = { fontSize: '3em', cursor: 'pointer', lineHeight: 0, position: 'relative', left: `${left}%` };
    return (
      <span style={style} onMouseDown={e => this.handleMouseDown(e)}>🔼</span>
    )
  }
}
export default MainSlider;
