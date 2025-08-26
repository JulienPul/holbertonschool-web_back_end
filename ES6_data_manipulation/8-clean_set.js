// Clean set
export default function CleanSet(set, startString) {
  if (!startString || typeof startString !== 'string') return '';
  return [...set]
    .filter((value) => value && value.startsWith(startString))
    .map((value) => value.slice(startString.length))
    .filter((value) => value)
    .join('-');
}