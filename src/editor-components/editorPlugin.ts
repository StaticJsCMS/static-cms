import type { EditorProps } from '@toast-ui/react-editor';

const editorPlugin: Required<EditorProps>['plugins'][number] = (context, options) => {
  return null;
};

export default editorPlugin;
