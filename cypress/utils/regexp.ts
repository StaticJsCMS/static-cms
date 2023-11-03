export const escapeRegExp = (str: string) => {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
};
