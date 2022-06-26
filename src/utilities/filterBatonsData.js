export const filterBatonsData = (data, status) => {
  let filtered = data.filter((e) => e.status == status);
  return filtered;
};
