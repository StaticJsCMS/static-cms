import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css as coreCss, ClassNames } from '@emotion/react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import { Value, Document, Block, Text } from 'slate';
import { Editor as Slate } from 'slate-react';

import { lengths, fonts, zIndex } from '../../../ui';
import { editorStyleVars, EditorControlBar } from '../styles';
import { slateToMarkdown, markdownToSlate } from '../serializers';
import Toolbar from './Toolbar';
import { renderBlock as renderBlockFactory, renderInline, renderMark } from './renderers';
import plugins from './plugins/visual';
import schema from './schema';
import {
  CmsFieldFileOrImage,
  CmsFieldMarkdown,
  CmsWidgetControlProps,
  EditorComponentOptions,
  EditorComponentWidgetOptions,
} from '../../../interface';
import { merge } from 'lodash';
import { getEditorComponents, getRemarkPlugins, resolveWidget } from '../../../lib/registry';

interface VisualEditorStyles {
  minimal: boolean;
}

function visualEditorStyles({ minimal }: VisualEditorStyles) {
  return `
    position: relative;
    overflow: auto;
    font-family: ${fonts.primary};
    min-height: ${minimal ? 'auto' : lengths.richTextEditorMinHeight};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: 0;
    margin-top: -${editorStyleVars.stickyDistanceBottom};
    padding: 0;
    display: flex;
    flex-direction: column;
    z-index: ${zIndex.zIndex100};
  `;
}

const InsertionPoint = styled.div`
  flex: 1 1 auto;
  cursor: text;
`;

function createEmptyRawDoc() {
  const emptyText = Text.create('');
  const emptyBlock = Block.create({ object: 'block', type: 'paragraph', nodes: [emptyText] });
  return { nodes: [emptyBlock] };
}

function createSlateValue(rawValue, { voidCodeBlock, remarkPlugins }) {
  const rawDoc = rawValue && markdownToSlate(rawValue, { voidCodeBlock, remarkPlugins });
  const rawDocHasNodes = !isEmpty(get(rawDoc, 'nodes'));
  const document = Document.fromJSON(rawDocHasNodes ? rawDoc : createEmptyRawDoc());
  return Value.create({ document });
}

const StyledVisualEditor = styled.div`
  position: relative;
`;

interface Focusable {
  focus: () => void;
}

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

const VisualEditor = ({
  onAddAsset,
  getAsset,
  field,
  t,
  isDisabled,
}: CmsWidgetControlProps<string, CmsFieldMarkdown>) => {
  const rawEditorComponents = useMemo(() => getEditorComponents(), []);

  const shortcodeComponents = useMemo(
    () =>
      Object.values(rawEditorComponents).filter(
        options => 'type' in options && options.type === 'shortcode',
      ) as EditorComponentWidgetOptions[],
    [rawEditorComponents],
  );

  const codeBlockComponent = useMemo(
    () =>
      Object.values(rawEditorComponents).find(
        options => 'type' in options && options.type === 'code-block',
      ) as EditorComponentWidgetOptions,
    [rawEditorComponents],
  );

  const editorComponents = useMemo(
    () =>
      codeBlockComponent || 'code-block' in rawEditorComponents
        ? rawEditorComponents
        : {
            ...rawEditorComponents,
            ['code-block']: { label: 'Code Block', type: 'code-block' },
          },
    [codeBlockComponent, rawEditorComponents],
  );

  const remarkPlugins = useCallback(() => getRemarkPlugins(), []);

  useEffect(() => {
    // merge editor media library config to image components
    if ('image' in editorComponents) {
      const imageComponent = editorComponents.image;
      if ('fields' in imageComponent) {
        const fields = imageComponent?.fields;
        if (fields) {
          const imageFieldIndex = fields.findIndex(f => f.widget === 'image');
          let imageField = fields[imageFieldIndex] as CmsFieldFileOrImage;
          if (imageField) {
            // merge `media_library` config
            if (field.media_library) {
              imageField = {
                ...imageField,
                media_library: merge(field.media_library, imageField.media_library),
              };
            }

            // merge 'media_folder'
            if (field.media_folder && !imageField.media_folder) {
              imageField = {
                ...imageField,
                media_folder: field.media_folder,
              };
            }

            // merge 'public_folder'
            if (field.public_folder && !imageField.public_folder) {
              imageField = {
                ...imageField,
                public_folder: field.public_folder,
              };
            }
          }
          imageComponent.fields = [...imageComponent.fields];
          imageComponent.fields[imageFieldIndex] = imageField;
        }
      }
    }
  }, [editorComponents, field.media_folder, field.media_library, field.public_folder]);

  const renderBlock = useMemo(
    () =>
      renderBlockFactory({
        codeBlockComponent,
      }),
    [],
  );

  //   this.renderInline = renderInline();
  //   this.renderMark = renderMark();
  //   this.schema = schema({ voidCodeBlock: !!this.codeBlockComponent });
  //   this.plugins = plugins({
  //     getAsset: props.getAsset,
  //     resolveWidget: props.resolveWidget,
  //     t: props.t,
  //     remarkPlugins: this.remarkPlugins,
  //   });
  //   this.state = {
  //     value: createSlateValue(this.props.value, {
  //       voidCodeBlock: !!this.codeBlockComponent,
  //       remarkPlugins: this.remarkPlugins,
  //     }),
  //   };
  // }

  const [editor, setEditor] = useState<SlateEditor | null>(null);
  const processRef = useCallback((ref: SlateEditor) => {
    setEditor(ref);
  }, []);

  // static propTypes = {
  //   onAddAsset: PropTypes.func.isRequired,
  //   getAsset: PropTypes.func.isRequired,
  //   onChange: PropTypes.func.isRequired,
  //   className: PropTypes.string.isRequired,
  //   value: PropTypes.string,
  //   field: ImmutablePropTypes.map.isRequired,
  //   getEditorComponents: PropTypes.func.isRequired,
  //   getRemarkPlugins: PropTypes.func.isRequired,
  //   t: PropTypes.func.isRequired,
  // };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!this.state.value.equals(nextState.value)) return true;

  //   const raw = nextState.value.document.toJS();
  //   const markdown = slateToMarkdown(raw, {
  //     voidCodeBlock: this.codeBlockComponent,
  //     remarkPlugins: this.remarkPlugins,
  //   });
  //   return nextProps.value !== markdown;
  // }

  // componentDidMount() {
  //   if (this.props.pendingFocus) {
  //     this.editor.focus();
  //     this.props.pendingFocus();
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.value !== this.props.value) {
  //     this.setState({
  //       value: createSlateValue(this.props.value, {
  //         voidCodeBlock: !!this.codeBlockComponent,
  //         remarkPlugins: this.remarkPlugins,
  //       }),
  //     });
  //   }
  // }

  const handleMarkClick = useCallback(
    (type: string) => {
      editor?.toggleMark(type).focus();
    },
    [editor],
  );

  const handleBlockClick = useCallback(
    (type: string) => {
      editor?.toggleBlock(type).focus();
    },
    [editor],
  );

  const handleLinkClick = useCallback(() => {
    // TODO Change to material dialog
    editor?.toggleLink((oldUrl: string) =>
      window.prompt(t('editor.editorWidgets.markdown.linkPrompt'), oldUrl),
    );
  }, [editor, t]);

  const hasMark = useCallback(
    (type: string) => {
      return Boolean(editor && editor.hasMark(type));
    },
    [editor],
  );

  const hasInline = useCallback(
    (type: string) => {
      return Boolean(editor && editor.hasInline(type));
    },
    [editor],
  );

  const hasBlock = useCallback(
    (type: string) => {
      return Boolean(editor && editor.hasBlock(type));
    },
    [editor],
  );

  const hasQuote = useCallback(
    (type: string) => {
      return Boolean(editor && editor.hasQuote(type));
    },
    [editor],
  );

  const hasListItems = useCallback(
    (type: string) => {
      return Boolean(editor && editor.hasListItems(type));
    },
    [editor],
  );

  const handleInsertShortcode = useCallback(
    (pluginConfig: EditorComponentWidgetOptions) => {
      editor?.insertShortcode(pluginConfig);
    },
    [editor],
  );

  const handleClickBelowDocument = useCallback(() => {
    editor?.moveToEndOfDocument();
  }, [editor]);

  const handleDocumentChange = useCallback(
    () =>
      debounce((editor: SlateEditor) => {
        const raw = editor.value.document.toJS();
        const markdown = slateToMarkdown(raw, {
          voidCodeBlock: codeBlockComponent,
          remarkPlugins,
        });
        onChange(markdown);
      }, 150),
    [],
  );

  // handleChange = editor => {
  //   if (!this.state.value.document.equals(editor.value.document)) {
  //     this.handleDocumentChange(editor);
  //   }
  //   this.setState({ value: editor.value });
  // };

  return (
    <StyledVisualEditor>
      <EditorControlBar>
        <Toolbar
          onMarkClick={handleMarkClick}
          onBlockClick={handleBlockClick}
          onLinkClick={handleLinkClick}
          plugins={editorComponents}
          onSubmit={handleInsertShortcode}
          onAddAsset={onAddAsset}
          getAsset={getAsset}
          buttons={field.buttons}
          editorComponents={field.editor_components ?? []}
          hasMark={hasMark}
          hasInline={hasInline}
          hasBlock={hasBlock}
          hasQuote={hasQuote}
          hasListItems={hasListItems}
          t={t}
          disabled={isDisabled}
        />
      </EditorControlBar>
      <ClassNames>
        {({ css, cx }) => (
          <div
            className={cx(
              className,
              css`
                ${visualEditorStyles({ minimal: field.minimal ?? false })}
              `,
            )}
          >
            <Slate
              className={css`
                padding: 16px 20px 0;
              `}
              value={this.state.value}
              renderBlock={renderBlock}
              renderInline={this.renderInline}
              renderMark={this.renderMark}
              schema={this.schema}
              plugins={this.plugins}
              onChange={this.handleChange}
              ref={processRef}
              spellCheck
            />
            <InsertionPoint onClick={this.handleClickBelowDocument} />
          </div>
        )}
      </ClassNames>
    </StyledVisualEditor>
  );
};
