# Precision Slider for React

[![build status](https://img.shields.io/travis/Hellenic/react-precision-slider/master.svg?style=flat-square)](https://travis-ci.org/Hellenic/react-precision-slider)
![License](https://img.shields.io/npm/l/react-precision-slider.svg)

High-accuracy slider to control floating point values with large decimals.

![Simple preview](https://raw.githubusercontent.com/Hellenic/react-precision-slider/master/slider.png 'Precision slider')

## Example usage

```jsx
<Slider label="Scale" min={0} max={10} step={0.1} defaultValue={defaultValue} />
```

Alternatively you can pass `value` and `onChange` props instead of `defaultValue`
to make it controlled. See the example.
