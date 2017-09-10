export function round(number, precision) {
  const factor = 10 ** precision;
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export default {
  round,
  clamp,
  isNumeric
};
