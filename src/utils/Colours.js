export const generateRandomColor = () => {
  // Generates values between 0-200 to keep them slightly darker (better for white backgrounds)
  const r = Math.floor(Math.random() * 200)
    .toString(16)
    .padStart(2, "0");
  const g = Math.floor(Math.random() * 200)
    .toString(16)
    .padStart(2, "0");
  const b = Math.floor(Math.random() * 200)
    .toString(16)
    .padStart(2, "0");

  return `#${r}${g}${b}`;
};
