import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useCallback, useMemo, useState } from 'react';

import { colors, lengths, transitions } from '../../../ui';
import ToolbarButton from './ToolbarButton';

import type { MouseEvent } from 'react';
import type {
  CmsMarkdownWidgetButton,
  EditorComponentWidgetOptions,
  GetAssetFunction,
  TranslatedProps,
} from '../../../interface';
import type AssetProxy from '../../../valueObjects/AssetProxy';

const ToolbarContainer = styled.div`
  background-color: ${colors.textFieldBorder};
  border-top-right-radius: ${lengths.borderRadius};
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 14px;
  min-height: 58px;
  transition: background-color ${transitions.main}, color ${transitions.main};
  color: ${colors.text};
`;

interface ToolbarProps {
  buttons: CmsMarkdownWidgetButton[];
  editorComponents: string[];
  plugins: EditorComponentWidgetOptions[] | undefined;
  onSubmit: (plugin: EditorComponentWidgetOptions) => void;
  onAddAsset: (assetProxy: AssetProxy) => {
    type: 'ADD_ASSET';
    payload: AssetProxy;
  };
  getAsset: GetAssetFunction;
  disabled: boolean;
  onMarkClick: (type: string) => void;
  onBlockClick: (type: string) => void;
  onLinkClick: () => void;
  hasMark: (type: string) => boolean;
  hasInline: (type: string) => boolean;
  hasBlock: (type: string) => boolean;
  hasQuote: (type: string) => boolean;
  hasListItems: (type: string) => boolean;
}

const Toolbar = ({
  onLinkClick,
  plugins,
  disabled,
  onSubmit,
  hasMark,
  onMarkClick,
  hasInline,
  hasBlock,
  onBlockClick,
  hasQuote,
  hasListItems,
  buttons,
  editorComponents,
  t,
}: TranslatedProps<ToolbarProps>) => {
  const isVisible = useCallback(
    (button: CmsMarkdownWidgetButton) => {
      return buttons.includes(button);
    },
    [buttons],
  );

  const handleBlockClick = useCallback(
    (event: MouseEvent | null, type: string) => {
      if (event) {
        event.preventDefault();
      }
      onBlockClick(type);
    },
    [onBlockClick],
  );

  const handleMarkClick = useCallback(
    (event: MouseEvent, type: string) => {
      event.preventDefault();
      onMarkClick(type);
    },
    [onMarkClick],
  );

  const showEditorComponents = useMemo(
    () => !editorComponents || editorComponents.length >= 1,
    [editorComponents],
  );

  function showPlugin(id: string) {
    return editorComponents ? editorComponents.includes(id) : true;
  }

  const pluginsList = plugins
    ? plugins.reduce((acc, plugin) => {
        const { id, type } = plugin;
        if (showPlugin(id ?? type)) {
          acc.push(plugin);
        }
        return acc;
      }, [] as EditorComponentWidgetOptions[])
    : [];

  const headingOptions: Partial<Record<CmsMarkdownWidgetButton, string>> = {
    'heading-one': t('editor.editorWidgets.headingOptions.headingOne'),
    'heading-two': t('editor.editorWidgets.headingOptions.headingTwo'),
    'heading-three': t('editor.editorWidgets.headingOptions.headingThree'),
    'heading-four': t('editor.editorWidgets.headingOptions.headingFour'),
    'heading-five': t('editor.editorWidgets.headingOptions.headingFive'),
    'heading-six': t('editor.editorWidgets.headingOptions.headingSix'),
  };

  const [anchorHeadersEl, setAnchorHeadersEl] = useState<null | HTMLElement>(null);
  const headersOpen = Boolean(anchorHeadersEl);
  const handleHeadersClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorHeadersEl(event.currentTarget);
  }, []);
  const handleHeadersClose = useCallback(() => {
    setAnchorHeadersEl(null);
  }, []);

  const [anchorPluginsEl, setAnchorPluginsEl] = useState<null | HTMLElement>(null);
  const pluginsOpen = Boolean(anchorPluginsEl);
  const handlePluginsClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorPluginsEl(event.currentTarget);
  }, []);
  const handlePluginsClose = useCallback(() => {
    setAnchorPluginsEl(null);
  }, []);

  return (
    <ToolbarContainer>
      <div>
        {isVisible('bold') && (
          <ToolbarButton
            type="bold"
            label={t('editor.editorWidgets.markdown.bold')}
            icon="bold"
            onClick={handleMarkClick}
            isActive={hasMark('bold')}
            disabled={disabled}
          />
        )}
        {isVisible('italic') && (
          <ToolbarButton
            type="italic"
            label={t('editor.editorWidgets.markdown.italic')}
            icon="italic"
            onClick={handleMarkClick}
            isActive={hasMark('italic')}
            disabled={disabled}
          />
        )}
        {isVisible('code') && (
          <ToolbarButton
            type="code"
            label={t('editor.editorWidgets.markdown.code')}
            icon="code"
            onClick={handleMarkClick}
            isActive={hasMark('code')}
            disabled={disabled}
          />
        )}
        {isVisible('link') && (
          <ToolbarButton
            type="link"
            label={t('editor.editorWidgets.markdown.link')}
            icon="link"
            onClick={onLinkClick}
            isActive={hasInline('link')}
            disabled={disabled}
          />
        )}
        {/* Show dropdown if at least one heading is not hidden */}
        {(Object.keys(headingOptions) as CmsMarkdownWidgetButton[]).some(isVisible) && (
          <div>
            <Button
              id="headers-button"
              aria-controls={headersOpen ? 'headers-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={headersOpen ? 'true' : undefined}
              onClick={handleHeadersClick}
              disabled={disabled}
            >
              {t('editor.editorWidgets.markdown.headings')}
            </Button>
            <Menu
              id="headers-menu"
              anchorEl={anchorHeadersEl}
              open={headersOpen}
              onClose={handleHeadersClose}
              MenuListProps={{
                'aria-labelledby': 'headers-button',
              }}
            >
              {!disabled &&
                (Object.keys(headingOptions) as CmsMarkdownWidgetButton[]).map(
                  (optionKey, idx) =>
                    isVisible(optionKey) && (
                      <MenuItem
                        className={hasBlock(optionKey) ? 'active' : ''}
                        key={idx}
                        onClick={() => handleBlockClick(null, optionKey)}
                      >
                        {headingOptions[optionKey]}
                      </MenuItem>
                    ),
                )}
            </Menu>
          </div>
        )}
        {isVisible('quote') && (
          <ToolbarButton
            type="quote"
            label={t('editor.editorWidgets.markdown.quote')}
            icon="quote"
            onClick={handleBlockClick}
            isActive={hasQuote('quote')}
            disabled={disabled}
          />
        )}
        {isVisible('bulleted-list') && (
          <ToolbarButton
            type="bulleted-list"
            label={t('editor.editorWidgets.markdown.bulletedList')}
            icon="list-bulleted"
            onClick={handleBlockClick}
            isActive={hasListItems('bulleted-list')}
            disabled={disabled}
          />
        )}
        {isVisible('numbered-list') && (
          <ToolbarButton
            type="numbered-list"
            label={t('editor.editorWidgets.markdown.numberedList')}
            icon="list-numbered"
            onClick={handleBlockClick}
            isActive={hasListItems('numbered-list')}
            disabled={disabled}
          />
        )}
        {showEditorComponents && (
          <div>
            <Button
              id="plugins-button"
              aria-controls={pluginsOpen ? 'plugins-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={pluginsOpen ? 'true' : undefined}
              onClick={handlePluginsClick}
              disabled={disabled}
            >
              {t('editor.editorWidgets.markdown.addComponent')}
            </Button>
            <Menu
              id="plugins-menu"
              anchorEl={anchorPluginsEl}
              open={pluginsOpen}
              onClose={handlePluginsClose}
              MenuListProps={{
                'aria-labelledby': 'plugins-button',
              }}
            >
              {pluginsList.map((plugin, idx) => (
                <MenuItem key={idx} onClick={() => onSubmit(plugin)}>
                  {plugin.label}
                </MenuItem>
              ))}
            </Menu>
          </div>
        )}
      </div>
    </ToolbarContainer>
  );
};

export default Toolbar;
