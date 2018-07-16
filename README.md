# Precision Slider for React

[![build status](https://img.shields.io/travis/Hellenic/react-precision-slider/master.svg?style=flat-square)](https://travis-ci.org/Hellenic/react-precision-slider)
![License](https://img.shields.io/npm/l/react-precision-slider.svg)

High-accuracy slider to control floating point values with large decimals.

![Simple preview](https://raw.githubusercontent.com/Hellenic/react-precision-slider/master/slider.png 'Precision slider')

## Note

This currently works for my use-case and thus might not be developed any further.

## Example usage

```jsx
<Slider
  label="Nice slider"
  min={0}
  max={10}
  step={0.1}
  defaultValue={defaultValue}
/>
```

Alternatively you can pass `value` and `onChange` props instead of `defaultValue`
to make it controlled.

You'll also need to pass in some styles (currently with basic CSS classes).

See the example for both of the above.
