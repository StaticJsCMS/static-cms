import React from 'react';

import type { ChangeEvent } from 'react';
import type { CmsWidgetControlProps } from '../../interface';

export default class StringControl extends React.Component<CmsWidgetControlProps<string>> {
  // The selection to maintain for the input element
  private _sel: number | null = 0;

  // The input element ref
  private _el: HTMLInputElement | null = null;

  // NOTE: This prevents the cursor from jumping to the end of the text for
  // nested inputs. In other words, this is not an issue on top-level text
  // fields such as the `title` of a collection post. However, it becomes an
  // issue on fields nested within other components, namely widgets nested
  // within a `markdown` widget. For example, the alt text on a block image
  // within markdown.
  // SEE: https://github.com/netlify/netlify-cms/issues/4539
  // SEE: https://github.com/netlify/netlify-cms/issues/3578
  componentDidUpdate() {
    if (this._el && this._el.selectionStart !== this._sel) {
      this._el.setSelectionRange(this._sel, this._sel);
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this._sel = e.target.selectionStart;
    this.props.onChange(e.target.value);
  };

  render() {
    const { forID, value, classNameWrapper, setActiveStyle, setInactiveStyle } = this.props;

    return (
      <input
        ref={el => {
          this._el = el;
        }}
        type="text"
        id={forID}
        className={classNameWrapper}
        value={value || ''}
        onChange={this.handleChange}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
      />
    );
  }
}
