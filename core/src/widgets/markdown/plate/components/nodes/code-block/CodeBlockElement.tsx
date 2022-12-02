import { styled } from '@mui/material/styles';
import { findNodePath, setNodes } from '@udecode/plate';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Frame from 'react-frame-component';
import { v4 as uuid } from 'uuid';

import Outline from '@staticcms/core/components/UI/Outline';
import { useWindowEvent } from '@staticcms/core/lib/util/window.util';
import CodeBlockFrame from './CodeBlockFrame';

import type { MdCodeBlockElement, MdValue } from '@staticcms/markdown';
import type { PlateRenderElementProps, TCodeBlockElement } from '@udecode/plate';
import type { FC, MutableRefObject, RefObject } from 'react';

const StyledCodeBlock = styled('div')`
  position: relative;
  margin: 12px 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled('input')`
  flex-grow: 1;
  outline: none;
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.35);
  border-radius: 4px 4px 0 0;
  width: 100%;
  height: 34px;
`;

const StyledCodeBlockContent = styled('div')`
  position: relative;
  display: flex;

  & div {
    outline: none;
  }
`;

const StyledHiddenChildren = styled('div')`
  height: 0;
  position: absolute;
`;

const CodeBlockElement: FC<PlateRenderElementProps<MdValue, MdCodeBlockElement>> = props => {
  const [langHasFocus, setLangHasFocus] = useState(false);
  const [codeHasFocus, setCodeHasFocus] = useState(false);

  const { attributes, nodeProps, element, editor, children } = props;
  const id = useMemo(() => uuid(), []);

  const lang = ('lang' in element ? element.lang : '') as string | undefined;
  const code = ('code' in element ? element.code ?? '' : '') as string;

  const handleChange = useCallback(
    (value: string) => {
      const path = findNodePath(editor, element);
      path && setNodes<TCodeBlockElement>(editor, { code: value }, { at: path });
    },
    [editor, element],
  );

  const receiveMessage = useCallback(
    (event: MessageEvent) => {
      switch (event.data.message) {
        case `code_block_${id}_onChange`:
          handleChange(event.data.value);
          break;
        case `code_block_${id}_onFocus`:
          setCodeHasFocus(true);
          break;
        case `code_block_${id}_onBlur`:
          setCodeHasFocus(false);
          break;
      }
    },
    [handleChange, id],
  );

  useWindowEvent('message', receiveMessage);

  const initialFrameContent = useMemo(
    () => `
      <!DOCTYPE html>
      <html>
        <head>
          <base target="_blank"/>
          <style>
            body {
              margin: 0;
              overflow: hidden;
              position: fixed;
              top: 0;
              width: 100%;
            }
          </style>
        </head>
        <body><div></div></body>
      </html>
    `,
    [],
  );

  const [height, setHeight] = useState(24);
  const iframeRef = useRef<Frame & HTMLIFrameElement>();

  const handleResize = useCallback(
    (iframe: MutableRefObject<(Frame & HTMLIFrameElement) | undefined>) => {
      const height = iframe.current?.contentDocument?.body?.scrollHeight ?? 0;
      if (height !== 0) {
        setHeight(height);
      }
    },
    [],
  );

  useEffect(() => handleResize(iframeRef), [handleResize, iframeRef, code]);
  useEffect(() => {
    setTimeout(() => handleResize(iframeRef), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StyledCodeBlock {...attributes} {...nodeProps} contentEditable={false}>
        <StyledInput
          id={id}
          value={lang}
          onFocus={() => setLangHasFocus(true)}
          onBlur={() => setLangHasFocus(false)}
          onChange={event => {
            const value = event.target.value;
            const path = findNodePath(editor, element);
            path && setNodes<TCodeBlockElement>(editor, { lang: value }, { at: path });
          }}
        />
        <StyledCodeBlockContent>
          <Frame
            key={`code-frame-${id}`}
            id={id}
            ref={iframeRef as RefObject<Frame> & RefObject<HTMLIFrameElement>}
            style={{
              border: 'none',
              width: '100%',
              height,
              overflow: 'hidden',
            }}
            initialContent={initialFrameContent}
          >
            <CodeBlockFrame id={id} code={code} lang={lang} />
          </Frame>
        </StyledCodeBlockContent>
        <Outline active={langHasFocus || codeHasFocus} />
        <StyledHiddenChildren>{children}</StyledHiddenChildren>
      </StyledCodeBlock>
    </>
  );
};

export default CodeBlockElement;
