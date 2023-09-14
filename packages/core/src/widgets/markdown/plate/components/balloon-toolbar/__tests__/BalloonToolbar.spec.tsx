/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, screen } from '@testing-library/react';
import {
  ELEMENT_LINK,
  findNodePath,
  getNode,
  getParentNode,
  getSelectionBoundingClientRect,
  getSelectionText,
  isElement,
  isElementEmpty,
  isSelectionExpanded,
  someNode,
  usePlateEditorState,
  usePlateSelection,
} from '@udecode/plate';
import React, { useRef } from 'react';
import { useFocused } from 'slate-react';

import { configLoaded } from '@staticcms/core/actions/config';
import { store } from '@staticcms/core/store';
import { createMockCollection } from '@staticcms/test/data/collections.mock';
import { createMockConfig } from '@staticcms/test/data/config.mock';
import { mockMarkdownField } from '@staticcms/test/data/fields.mock';
import { renderWithProviders } from '@staticcms/test/test-utils';
import BalloonToolbar from '../BalloonToolbar';

import type { Config, MarkdownField } from '@staticcms/core/interface';
import type { MdEditor } from '@staticcms/markdown/plate/plateTypes';
import type { TRange } from '@udecode/plate';
import type { FC } from 'react';

jest.mock('@staticcms/core/backend');

interface BalloonToolbarWrapperProps {
  useMdx?: boolean;
}

const BalloonToolbarWrapper: FC<BalloonToolbarWrapperProps> = ({ useMdx = false }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={ref}>
      <BalloonToolbar
        key="balloon-toolbar"
        useMdx={useMdx}
        containerRef={ref.current}
        collection={createMockCollection({}, mockMarkdownField)}
        field={mockMarkdownField}
        disabled={false}
      />
    </div>
  );
};

const config = createMockConfig({
  collections: [],
}) as unknown as Config<MarkdownField>;

describe(BalloonToolbar.name, () => {
  const mockUseEditor = usePlateEditorState as jest.Mock;
  const mockUsePlateSelection = usePlateSelection as jest.Mock;
  let mockEditor: MdEditor;

  const mockGetNode = getNode as jest.Mock;
  const mockIsElement = isElement as unknown as jest.Mock;
  const mockIsElementEmpty = isElementEmpty as jest.Mock;
  const mockSomeNode = someNode as jest.Mock;
  const mockUseFocused = useFocused as jest.Mock;
  const mockFindNodePath = findNodePath as jest.Mock;
  const mockGetParentNode = getParentNode as jest.Mock;
  const mockGetSelectionText = getSelectionText as jest.Mock;
  const mockIsSelectionExpanded = isSelectionExpanded as jest.Mock;
  const mockGetSelectionBoundingClientRect = getSelectionBoundingClientRect as jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();

    store.dispatch(configLoaded(config as unknown as Config));

    mockEditor = {
      selection: undefined,
    } as unknown as MdEditor;

    mockUseEditor.mockReturnValue(mockEditor);

    mockGetSelectionBoundingClientRect.mockReturnValue({
      x: 1,
      y: 1,
      width: 1,
      height: 1,
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders empty div by default', () => {
    renderWithProviders(<BalloonToolbarWrapper />);
    expect(screen.queryAllByRole('button').length).toBe(0);
  });

  interface BalloonToolbarSetupOptions {
    inTable?: boolean;
    selectedText?: string;
  }

  const emptyNodeToolbarSetup = ({ inTable, selectedText }: BalloonToolbarSetupOptions = {}) => {
    mockEditor = {
      selection: {
        anchor: {
          path: [1, 0],
          offset: 0,
        },
        focus: {
          path: [1, 0],
          offset: 0,
        },
      } as TRange,
      children: [
        {
          type: 'p',
          children: [{ text: !inTable && selectedText ? selectedText : '' }],
        },
        {
          type: 'td',
          children: [{ text: inTable && selectedText ? selectedText : '' }],
        },
      ],
    } as unknown as MdEditor;

    mockUseEditor.mockReturnValue(mockEditor);
    mockUsePlateSelection.mockReturnValue(mockEditor.selection);

    mockGetNode.mockReturnValue({ text: '' });
    mockIsElement.mockReturnValue(true);
    mockIsElementEmpty.mockReturnValue(true);
    mockUseFocused.mockReturnValue(true);

    if (selectedText) {
      mockIsSelectionExpanded.mockReturnValue(true);
      mockGetSelectionText.mockReturnValue(selectedText);
    } else {
      mockIsSelectionExpanded.mockReturnValue(false);
      mockGetSelectionText.mockReturnValue('');
    }

    if (inTable) {
      mockSomeNode.mockImplementation((_editor, { match: { type } }) => type !== ELEMENT_LINK);
      mockFindNodePath.mockReturnValue([1, 0]);
    } else {
      mockSomeNode.mockReturnValue(false);
      mockFindNodePath.mockReturnValue([0, 0]);
    }

    mockGetParentNode.mockReturnValue([
      {
        type: 'td',
        children: [{ text: '' }],
      },
    ]);

    const result = renderWithProviders(<BalloonToolbarWrapper />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    result.rerender(<BalloonToolbarWrapper />);

    return result;
  };

  it('does not render empty node toolbar', () => {
    emptyNodeToolbarSetup();

    expect(screen.queryByTestId('balloon-toolbar')).not.toBeInTheDocument();
  });

  it('renders selected node toolbar when text is selected', () => {
    emptyNodeToolbarSetup({ selectedText: 'Test Text' });

    expect(screen.queryByTestId('balloon-toolbar')).toBeInTheDocument();

    expect(screen.queryByTestId('toolbar-button-bold')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-italic')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-code')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-strikethrough')).toBeInTheDocument();

    expect(screen.queryByTestId('font-type-select')).toBeInTheDocument();

    expect(screen.queryByTestId('toolbar-button-insert-row')).not.toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-delete-row')).not.toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-insert-column')).not.toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-delete-column')).not.toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-delete-table')).not.toBeInTheDocument();

    expect(screen.queryByTestId('toolbar-button-link')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-image')).not.toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-shortcode')).not.toBeInTheDocument();
  });

  it('renders empty table node toolbar when in table', () => {
    emptyNodeToolbarSetup({ inTable: true });

    expect(screen.queryByTestId('balloon-toolbar')).toBeInTheDocument();

    expect(screen.queryByTestId('toolbar-button-bold')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-italic')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-code')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-strikethrough')).toBeInTheDocument();

    expect(screen.queryByTestId('font-type-select')).not.toBeInTheDocument();

    expect(screen.queryByTestId('toolbar-button-insert-row')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-delete-row')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-insert-column')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-delete-column')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-delete-table')).toBeInTheDocument();

    expect(screen.queryByTestId('toolbar-button-link')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-image')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-shortcode')).toBeInTheDocument();
  });

  it('renders selected table node toolbar when text is selected in table', () => {
    emptyNodeToolbarSetup({ inTable: true, selectedText: 'Test Text' });

    expect(screen.getByTestId('balloon-toolbar')).toBeInTheDocument();

    expect(screen.queryByTestId('toolbar-button-bold')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-italic')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-code')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-strikethrough')).toBeInTheDocument();

    expect(screen.queryByTestId('font-type-select')).not.toBeInTheDocument();

    expect(screen.queryByTestId('toolbar-button-insert-row')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-delete-row')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-insert-column')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-delete-column')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-delete-table')).toBeInTheDocument();

    expect(screen.queryByTestId('toolbar-button-link')).toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-image')).not.toBeInTheDocument();
    expect(screen.queryByTestId('toolbar-button-shortcode')).not.toBeInTheDocument();
  });
});
