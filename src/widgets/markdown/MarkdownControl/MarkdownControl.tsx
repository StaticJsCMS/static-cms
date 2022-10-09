import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';
import { ClassNames } from '@emotion/react';
import debounce from 'lodash/debounce';
import { Value } from 'slate';
import { Editor as Slate, setEventTransfer } from 'slate-react';
import Plain from 'slate-plain-serializer';
import isHotkey from 'is-hotkey';

import { lengths, fonts } from '../../../ui';
import { markdownToHtml } from '../serializers';
import { editorStyleVars, EditorControlBar } from '../styles';
import Toolbar from './Toolbar';
import { CmsFieldMarkdown, CmsWidgetControlProps } from '../../../interface';

function rawEditorStyles({ minimal }) {
  return `
  position: relative;
  overflow: hidden;
  overflow-x: auto;
  min-height: ${minimal ? 'auto' : lengths.richTextEditorMinHeight};
  font-family: ${fonts.mono};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 0;
  margin-top: -${editorStyleVars.stickyDistanceBottom};
`;
}

const RawEditorContainer = styled.div`
  position: relative;
`;

export interface SlateEditor {
  toggleMark(type: string): Focusable;
  toggleBlock: (type: string) => Focusable;
  toggleLink: (processor: (oldLink: string) => string | null) => void;
  hasMark: (type: string) => boolean;
  hasInline: (type: string) => boolean;
  hasBlock: (type: string) => boolean;
  hasQuote: (type: string) => boolean;
  hasListItems: (type: string) => boolean;
  insertShortcode: (plugin: EditorComponentOptions) => void;
  moveToRangeOfDocument: () => void;
  moveToEndOfDocument: () => void;
  value: any;
}

const MarkdownControl = ({
  value: initialValue,
  classNameWrapper,
  field,
  t,
}: CmsWidgetControlProps<string, CmsFieldMarkdown>) => {
  const [value, setValue] = useState(initialValue ?? '');
  const [prevInitialValue, setPrevInitialValue] = useState(initialValue);
  useEffect(() => {
    if (prevInitialValue !== initialValue) {
      setValue(Plain.deserialize(initialValue));
    }
    setPrevInitialValue(initialValue);
  }, [initialValue, prevInitialValue]);

  const [editor, setEditor] = useState<SlateEditor | null>(null);
  const processRef = useCallback((ref: SlateEditor) => {
    setEditor(ref);
  }, []);

  // handleCopy = (event, editor) => {
  //   const { getAsset, resolveWidget } = this.props;
  //   const markdown = Plain.serialize(Value.create({ document: editor.value.fragment }));
  //   const html = markdownToHtml(markdown, { getAsset, resolveWidget });
  //   setEventTransfer(event, 'text', markdown);
  //   setEventTransfer(event, 'html', html);
  //   event.preventDefault();
  // };

  // handleCut = (event, editor, next) => {
  //   this.handleCopy(event, editor, next);
  //   editor.delete();
  // };

  // handlePaste = (event, editor, next) => {
  //   event.preventDefault();
  //   const data = event.clipboardData;
  //   if (isHotkey('shift', event)) {
  //     return next();
  //   }

  //   const value = Plain.deserialize(data.getData('text/plain'));
  //   return editor.insertFragment(value.document);
  // };

  // handleChange = editor => {
  //   if (!this.state.value.document.equals(editor.value.document)) {
  //     this.handleDocumentChange(editor);
  //   }
  //   this.setState({ value: editor.value });
  // };

  // /**
  //  * When the document value changes, serialize from Slate's AST back to plain
  //  * text (which is Markdown) and pass that up as the new value.
  //  */
  // handleDocumentChange = debounce(editor => {
  //   const value = Plain.serialize(editor.value);
  //   this.props.onChange(value);
  // }, 150);

  // handleToggleMode = () => {
  //   this.props.onMode('rich_text');
  // };

  return (
    <RawEditorContainer>
      <EditorControlBar>
        <Toolbar buttons={field.buttons ?? []} disabled t={t} />
      </EditorControlBar>
      <ClassNames>
        {({ css, cx }) => (
          <Slate
            className={cx(
              classNameWrapper,
              css`
                ${rawEditorStyles({ minimal: field.minimal })}
              `,
            )}
            value={this.state.value}
            onChange={this.handleChange}
            onPaste={this.handlePaste}
            onCut={this.handleCut}
            onCopy={this.handleCopy}
            ref={processRef}
          />
        )}
      </ClassNames>
    </RawEditorContainer>
  );
};
