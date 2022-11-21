export const textRule = (val) => {
  if (val) return true;
  return false;
};

export const numberRule = (val) => {
  return val > 0 ? true : false;
};
