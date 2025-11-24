export const formatString = (str: string | null): string => {
  if (!str) return "";

  return str
    .split("_")
    .map((word) => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
};
