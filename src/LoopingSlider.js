import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addEventListener } from 'consolidated-events';

class LoopingSlider extends Component {
  static propTypes = {
    range: PropTypes.number,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  };
  static defaultProps = {
    range: 0.1
  }
  constructor(props) {
    super(props);
    this.state = {
      previousValue: null,
      clientX: null
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.value !== this.props.value);
  }
  handleMouseDown(event) {
    this.setState({
      clientX: event.clientX,
      previousValue: this.props.value
    });

    this.bindMouseEvents();
  }
  handleMouseMove(event) {
    event.preventDefault();

    const { clientX, previousValue } = this.state;
    const { range } = this.props;
    const step = range / 100;
    const decelerator = 5;

    // 1. Get the amount how much mouse moved
    const mouseMoved = (event.clientX - clientX);
    // 2. Calculate value for amount of mouse move based on given step
    // TODO Would be better to use getBoundingClientRect() and base the movement to the size of the element
    //      Alternative, we could base the movement to the screen size, allowing finer level of control
    const valueFromMouse = (mouseMoved * step) / decelerator;
    // 3. Adjust the new value based on previous value
    const nextValue = (valueFromMouse + previousValue);
    // TODO Currently there's no limitation and this value can go over the min / max
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
    const { range } = this.props;
    // Get the value between current min & max (actual value can be more than those, so we need to modulo)
    const remainder = (value % range);
    // Get percentual position between min & max for the remainder
    let left = (remainder / range) * 100;
    // Value can go to negative, so adjust the control knob accordingly to stay on track
    if (left < 0) {
      left += 100;
    }
    const style = { fontSize: '2em', cursor: 'ew-resize', lineHeight: 0, position: 'relative', left: `${left}%` };
    return (
      <span style={style} onMouseDown={e => this.handleMouseDown(e)}>🔽</span>
    );
  }
}
export default LoopingSlider;
