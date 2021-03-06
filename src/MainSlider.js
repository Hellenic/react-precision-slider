import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addEventListener } from 'consolidated-events';
import { clamp, roundToStep, getPercentBetween } from './MathUtils';

class MainSlider extends Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    icons: PropTypes.object
  };
  static defaultProps = {
    step: 0.01,
    value: 0
  };
  constructor(props) {
    super(props);
    this.state = {
      clientX: null,
      fraction: 0,
      directionToRight: null,
      dragStartX: null,
      previousValue: null
    };
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value;
  }
  handleMouseDown(event) {
    this.setState({
      clientX: event.clientX,
      fraction:
        this.props.value - roundToStep(this.props.value, this.props.step),
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
    const toRight = event.clientX > clientX;
    // 2. If direction changed, update the drag to previous position since that's where the drag changed
    if (directionToRight === null || toRight !== directionToRight) {
      dragStartX = clientX;
      previousValue = this.props.value;
      this.setState({ dragStartX, previousValue });
    }
    // 3. Calculate the percentage the mouse has moved
    const percentMoved = toRight
      ? (event.screenX - dragStartX) / (screen.availWidth - dragStartX)
      : event.screenX / (dragStartX - 0);

    // 4. Calculate the new value based on the percentage
    let nextValue = toRight
      ? (max - min - previousValue) * percentMoved + previousValue
      : (previousValue - min) * percentMoved + (0 + min);

    // 5. Round to step precision, while keeping the value from precision slider
    nextValue = roundToStep(nextValue, step) + this.state.fraction;
    // 6. If nextValue would be over min/max, clamp it
    nextValue = clamp(nextValue, min, max);

    this.setState({ clientX: event.clientX, directionToRight: toRight });
    this.props.onChange(nextValue);
  }
  bindMouseEvents() {
    this.onMouseMoveListener = addEventListener(document, 'mousemove', e =>
      this.handleMouseMove(e)
    );
    this.onMouseUpListener = addEventListener(document, 'mouseup', () =>
      this.unbindMouseEvents()
    );
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
    const { min, max, value, icons } = this.props;
    // Get percentual position between min & max for the value (and subtract some offset)
    const left = getPercentBetween(value, min, max);

    const style = {
      cursor: 'ew-resize',
      position: 'relative',
      left: `${left}%`
    };
    return (
      <span
        ref={r => {
          this.ref = r;
        }}
        style={style}
        className="rpc-main-slider"
        onMouseDown={e => this.handleMouseDown(e)}
      >
        {icons.main}
      </span>
    );
  }
}
export default MainSlider;
