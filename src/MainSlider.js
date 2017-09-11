import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addEventListener } from 'consolidated-events';
import { roundToStep } from './MathUtils';

class MainSlider extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };
  static defaultProps = {
    min: -0.1,
    max: 0.1,
    step: 0.01,
    value: 0
  }
  constructor(props) {
    super(props);
    this.state = {
      clientX: null,
      directionToRight: null,
      dragStartX: null,
      previousValue: null
    };
  }
  shouldComponentUpdate(nextProps) {
    return (nextProps.value !== this.props.value);
  }
  handleMouseDown(event) {
    this.setState({
      clientX: event.clientX,
      directionToRight: null,
      dragStartX: event.clientX,
      previousValue: this.props.value
    });

    this.bindMouseEvents();
  }
  handleMouseMove(event) {
    event.preventDefault();

    const { clientX, directionToRight } = this.state;
    // Some variables can change throughout the drag, so let's place them aside
    let dragStartX = this.state.dragStartX;
    let previousValue = this.state.previousValue;
    const { min, max, step } = this.props;
    // If mouse hasn't moved on X axis, no need to do anything
    if (clientX === event.clientX) {
      return;
    }

    // 1. Get the direction we're going to
    const toRight = (event.clientX > clientX);
    // 2. If direction changed, update the drag to previous position since that's where the drag changed
    if (directionToRight === null || toRight !== directionToRight) {
      dragStartX = clientX;
      previousValue = this.props.value;
      this.setState({ dragStartX, previousValue });
    }
    // 3. Calculate the percentage the mouse has moved
    const percentMoved = toRight ? ((event.clientX - dragStartX) / (window.innerWidth - dragStartX)) : (event.clientX / (dragStartX - 0));
    // 4. Calculate the new value based on the percentage
    let nextValue = toRight ? ((max - previousValue) * percentMoved) + previousValue : (previousValue - min) * percentMoved;
    // 5. Round to step precision
    nextValue = roundToStep(nextValue, step);

    this.setState({ clientX: event.clientX, directionToRight: toRight });
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
      clientX: null,
      directionToRight: null,
      dragStartX: null,
      previousValue: null
    });
  }
  render() {
    const { min, max, value } = this.props;
    const range = (max - min);
    // Get percentual position between min & max for the value (and subtract some offset)
    const left = ((value / range) * 100) - 1;
    const style = { fontSize: '3em', cursor: 'ew-resize', lineHeight: 0, position: 'relative', left: `${left}%` };
    return (
      <span ref={r => { this.ref = r; }} style={style} onMouseDown={e => this.handleMouseDown(e)}>🔼</span>
    );
  }
}
export default MainSlider;
