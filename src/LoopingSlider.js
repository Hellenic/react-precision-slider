import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addEventListener } from 'consolidated-events';

class LoopingSlider extends Component {
  static propTypes = {
    range: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };
  static defaultProps = {
    range:  0.1,
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
    const step = this.props.range / 100;
    const decelerator = 10; // TODO Should this be based on screenWidth or something else?
    const mouseMoved = (event.clientX - clientX);
    const valueFromMouse = (mouseMoved * step) / decelerator;
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
    const { range } = this.props;
    // Get the value between current min & max (actual value can be more than those, so we need to modulo)
    const clampedValue = (value % range);
    // Get percentual position between min & max for the clamped value
    const left = (clampedValue / (range * 2)) * 100;
    const style = { fontSize: '2em', cursor: 'pointer', lineHeight: 0, position: 'relative', left: `${left}%` };
    return (
      <span style={style} onMouseDown={e => this.handleMouseDown(e)}>🔽</span>
    )
  }
}
export default LoopingSlider;
