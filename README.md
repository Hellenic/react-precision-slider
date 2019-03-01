# Precision Slider for React

![npm version](https://img.shields.io/npm/v/react-precision-slider.svg)
![License](https://img.shields.io/npm/l/react-precision-slider.svg)

High-accuracy slider to control floating point values with large decimals.

![Simple preview](https://raw.githubusercontent.com/Hellenic/react-precision-slider/master/slider.png 'Precision slider')

## Note

This currently works for my use-case and thus might not be developed any further.

## Example usage

```jsx
const SLIDER_ICONS = {
  main: '↑',
  secondary: '↓',
  reset: '↺'
};

<Slider
  label="Nice slider"
  min={0}
  max={10}
  step={0.1}
  icons={SLIDER_ICONS} // optional
  defaultValue={defaultValue}
/>;
```

Alternatively you can pass `value` and `onChange` props instead of `defaultValue`
to make it controlled.

You'll also need to pass in some styles (currently with basic CSS classes).

See the example for both of the above.
