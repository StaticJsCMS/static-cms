/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import {
  ELEMENT_LINK,
  findNodePath,
  getNode,
  getParentNode,
  isElement,
  isElementEmpty,
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

  beforeEach(() => {
    store.dispatch(configLoaded(config as unknown as Config));

    mockEditor = {
      selection: undefined,
    } as unknown as MdEditor;

    mockUseEditor.mockReturnValue(mockEditor);
  });

  it('renders empty div by default', () => {
    renderWithProviders(<BalloonToolbarWrapper />);
    expect(screen.queryAllByRole('button').length).toBe(0);
  });

  describe('empty node toolbar inside table', () => {
    interface EmptyNodeToolbarSetupOptions {
      useMdx?: boolean;
    }

    const emptyNodeToolbarSetup = ({ useMdx }: EmptyNodeToolbarSetupOptions = {}) => {
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
            children: [{ text: '' }],
          },
          {
            type: 'td',
            children: [{ text: '' }],
          },
        ],
      } as unknown as MdEditor;

      mockUseEditor.mockReturnValue(mockEditor);
      mockUsePlateSelection.mockReturnValue(mockEditor.selection);

      mockGetNode.mockReturnValue({ text: '' });
      mockIsElement.mockReturnValue(true);
      mockIsElementEmpty.mockReturnValue(true);
      mockSomeNode.mockImplementation((_editor, { match: { type } }) => type !== ELEMENT_LINK);
      mockUseFocused.mockReturnValue(true);

      mockFindNodePath.mockReturnValue([1, 0]);
      mockGetParentNode.mockReturnValue([
        {
          type: 'td',
          children: [{ text: '' }],
        },
      ]);

      const result = renderWithProviders(<BalloonToolbarWrapper />);

      result.rerender(<BalloonToolbarWrapper useMdx={useMdx} />);

      return result;
    };

    it('renders empty node toolbar for markdown', () => {
      emptyNodeToolbarSetup();

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

      expect(screen.queryByTestId('toolbar-button-insert-link')).toBeInTheDocument();
      expect(screen.queryByTestId('toolbar-button-insert-image')).toBeInTheDocument();

      // MDX Only do not show for markdown version
      expect(screen.queryByTestId('toolbar-button-underline')).not.toBeInTheDocument();
    });

    it('renders empty node toolbar for mdx', () => {
      emptyNodeToolbarSetup({ useMdx: true });

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

      expect(screen.queryByTestId('toolbar-button-insert-link')).toBeInTheDocument();
      expect(screen.queryByTestId('toolbar-button-insert-image')).toBeInTheDocument();

      expect(screen.queryByTestId('toolbar-button-underline')).toBeInTheDocument();
    });
  });
});
