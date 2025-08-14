export const capitalizeString = (str: string): string => {
  const capitalized = str[0]?.toUpperCase() + str.slice(1);
  return capitalized;
};
