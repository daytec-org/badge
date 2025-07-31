export const stringToHexColor = (str: string) => {
  const hash = str
    .split('')
    .slice(0, 10)
    .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);

  const hex = Array.from({ length: 3 }, (_, i) => ((hash >> (i * 8)) & 0xeb).toString(16).padStart(2, '0')).join('');
  return `#${hex}`;
};
