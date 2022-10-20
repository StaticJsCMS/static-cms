declare module 'uploadcare-widget-tab-effects';

declare module 'uploadcare-widget' {
  interface UploadcareFileGroupInfo {
    cdnUrl: string;
    name: string;
    isImage: boolean;
  }

  const Uploadcare: {
    loadFileGroup: (groupId: string | undefined) => {
      done: (callback: (group: UploadcareFileGroupInfo) => void) => void;
    };
    fileFrom: (uploadedOrUrl: 'uploaded' | 'url', url: string) => Promise<UploadcareFileGroupInfo>;
    registerTab: (tab: string, tabContent: unknown) => void;
    openDialog: (
      files:
        | UploadcareFileGroupInfo
        | UploadcareFileGroupInfo[]
        | Promise<UploadcareFileGroupInfo | UploadcareFileGroupInfo[]>,
      settings: Record<string, unknown>,
    ) => {
      done: (
        callback: (values: {
          promise: () => Promise<UploadcareFileGroupInfo>;
          files: () => Promise<UploadcareFileGroupInfo>[];
        }) => void,
      ) => void;
    };
  };

  export default Uploadcare;
}
