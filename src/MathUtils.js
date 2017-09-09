export function round(number, precision) {
  const factor = 10 ** precision;
  const tempNumber = number * factor;
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

export default {
  round
};
