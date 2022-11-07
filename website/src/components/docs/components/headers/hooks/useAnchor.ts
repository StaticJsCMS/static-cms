const useAnchor = (text: string) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 \-_]/g, '')
    .replace(/[ ]/g, '-');
};

export default useAnchor;
