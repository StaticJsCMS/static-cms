import type { TEditableProps } from '@udecode/plate';
import type { MdValue } from './plateTypes';

const editableProps: TEditableProps<MdValue> = {
  spellCheck: false,
  autoFocus: false,
  readOnly: false,
  placeholder: 'Type…',
};

export default editableProps;
