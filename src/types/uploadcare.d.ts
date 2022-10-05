declare module 'uploadcare-widget' {
  const Uploadcare: {
    loadFileGroup: (groupId: string | undefined) => void;
  }

  export default Uploadcare;
}
