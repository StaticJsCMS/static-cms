declare module 'what-the-diff' {
  // eslint-disable-next-line import/prefer-default-export
  export const parse: (
    rawDiff: string,
  ) => { oldPath?: string; newPath?: string; binary: boolean; status: string }[];
}
