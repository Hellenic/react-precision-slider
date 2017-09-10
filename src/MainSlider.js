import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addEventListener } from 'consolidated-events';
import { clamp } from './MathUtils';

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
    max: 0.1,
    step: 0.01,
    defaultValue: 0
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      previousValue: null,
      clientX: null
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.value !== this.state.value);
  }
  handleMouseDown(event) {
    this.setState({
      clientX: event.clientX,
      previousValue: this.state.value
    });

    this.bindMouseEvents();
  }
  handleMouseMove(event) {
    event.preventDefault();

    const { clientX, value, previousValue } = this.state;
    const { min, max, step } = this.props;
    // 1. Get the amount how much mouse moved
    const mouseMoved = (event.clientX - clientX);
    // 2. Calculate value for amount of mouse move based on given step
    // TODO Would be better to use getBoundingClientRect() and base the movement to the size of the element
    //      Alternative, we could base the movement to the screen size, allowing finer level of control
    const valueFromMouse = (mouseMoved * step);
    // 3. Adjust the new value based on previous value
    const adjustedValue = (valueFromMouse + previousValue);
    // TODO Round the value to the precision of 'step'
    // 4. Make sure the new value is between min & max
    const nextValue = clamp(adjustedValue, min, max);

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
    this.setState({
      previousValue: null
    });
  }
  render() {
    const { value } = this.state;
    const { min, max } = this.props;
    const range = (max - min);
    // Get percentual position between min & max for the value (and subtract some offset)
    const left = ((value / range) * 100) - 1;
    const style = { fontSize: '3em', cursor: 'pointer', lineHeight: 0, position: 'relative', left: `${left}%` };
    return (
      <span ref={r => this.ref = r } style={style} onMouseDown={e => this.handleMouseDown(e)}>🔼</span>
    );
  }
}
export default MainSlider;
