export const fahrenheit = (temperature) => {
  return ((+temperature - 273.15) * (9 / 5) + 32).toFixed();
};

export const celsius = (temperature) => {
  return (+temperature - 273.15).toFixed(1);
};

export const kelvin = (temperature) => {
  return temperature;
};
