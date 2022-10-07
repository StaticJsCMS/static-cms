import TextField from '@mui/material/TextField';
import React, { useCallback } from 'react';

import type { ChangeEvent } from 'react';
import type { CmsFieldStringOrText, CmsWidgetControlProps } from '../../interface';

const StringControl = ({
  forID,
  value = '',
  setActiveStyle,
  setInactiveStyle,
  onChange,
}: CmsWidgetControlProps<string, CmsFieldStringOrText>) => {
  // TODO Check if this is still needed
  // const [selection, setSelection] = useState<number | null>(0);
  // const element = useRef();
  // The selection to maintain for the input element

  // NOTE: This prevents the cursor from jumping to the end of the text for
  // nested inputs. In other words, this is not an issue on top-level text
  // fields such as the `title` of a collection post. However, it becomes an
  // issue on fields nested within other components, namely widgets nested
  // within a `markdown` widget. For example, the alt text on a block image
  // within markdown.
  // SEE: https://github.com/netlify/netlify-cms/issues/4539
  // SEE: https://github.com/netlify/netlify-cms/issues/3578
  // componentDidUpdate() {
  //   if (this._el && this._el?.selectionStart !== this._sel) {
  //     this._el.setSelectionRange(this._sel, this._sel);
  //   }
  // }

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // this._sel = e.target.selectionStart;
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <TextField
      id={forID}
      variant="outlined"
      value={value || ''}
      onChange={handleChange}
      onFocus={setActiveStyle}
      onBlur={setInactiveStyle}
      fullWidth
      sx={{
        '.MuiInputBase-root': {
          borderTopLeftRadius: 0,
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#dfdfe3',
          },
          '&:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#dfdfe3',
          },
        },
      }}
    />
  );
};
export default StringControl;
