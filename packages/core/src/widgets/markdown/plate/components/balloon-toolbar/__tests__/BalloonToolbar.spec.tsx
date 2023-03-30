/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import {
  findNodePath,
  getNode,
  getParentNode,
  isElement,
  isElementEmpty,
  someNode,
  usePlateEditorState,
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

    // entry = {
    //   collection: 'posts',
    //   slug: '2022-12-13-post-number-1',
    //   path: '_posts/2022-12-13-post-number-1.md',
    //   partial: false,
    //   raw: '--- title: "This is post # 1" draft: false date: 2022-12-13T00:00:00.000Z --- # The post is number 1\n\nAnd some text',
    //   label: '',
    //   author: '',
    //   mediaFiles: [],
    //   isModification: null,
    //   newRecord: false,
    //   updatedOn: '',
    //   data: {
    //     title: 'This is post # 1',
    //     draft: false,
    //     date: '2022-12-13T00:00:00.000Z',
    //     body: '# The post is number 1\n\nAnd some text',
    //   },
    // };

    mockEditor = {
      selection: undefined,
    } as unknown as MdEditor;

    mockUseEditor.mockReturnValue(mockEditor);
  });

  it('renders empty div by default', () => {
    renderWithProviders(<BalloonToolbarWrapper />);
    expect(screen.queryAllByRole('button').length).toBe(0);
  });

  describe('empty node toolbar', () => {
    interface EmptyNodeToolbarSetupOptions {
      useMdx?: boolean;
    }

    const emptyNodeToolbarSetup = ({ useMdx }: EmptyNodeToolbarSetupOptions = {}) => {
      mockEditor = {
        selection: undefined,
        children: [
          {
            type: 'p',
            children: [{ text: '' }],
          },
          {
            type: 'p',
            children: [{ text: '' }],
          },
        ],
      } as unknown as MdEditor;

      mockUseEditor.mockReturnValue(mockEditor);

      mockGetNode.mockReturnValue({ text: '' });
      mockIsElement.mockReturnValue(true);
      mockIsElementEmpty.mockReturnValue(true);
      mockSomeNode.mockReturnValue(false);
      mockUseFocused.mockReturnValue(true);

      mockFindNodePath.mockReturnValue([1, 0]);
      mockGetParentNode.mockReturnValue([
        {
          type: 'p',
          children: [{ text: '' }],
        },
      ]);

      const { rerender } = renderWithProviders(<BalloonToolbarWrapper />);

      rerender(<BalloonToolbarWrapper useMdx={useMdx} />);
    };

    it('renders empty node toolbar for markdown', () => {
      emptyNodeToolbarSetup();

      expect(screen.queryByTestId('toolbar-button-bold')).toBeInTheDocument();
      expect(screen.queryByTestId('toolbar-button-italic')).toBeInTheDocument();
      expect(screen.queryByTestId('toolbar-button-code')).toBeInTheDocument();
      expect(screen.queryByTestId('toolbar-button-strikethrough')).toBeInTheDocument();

      expect(screen.queryByTestId('font-type-select')).toBeInTheDocument();
      expect(screen.queryByTestId('toolbar-button-add-table')).toBeInTheDocument();
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

      expect(screen.queryByTestId('font-type-select')).toBeInTheDocument();
      expect(screen.queryByTestId('toolbar-button-add-table')).toBeInTheDocument();
      expect(screen.queryByTestId('toolbar-button-insert-link')).toBeInTheDocument();
      expect(screen.queryByTestId('toolbar-button-insert-image')).toBeInTheDocument();

      expect(screen.queryByTestId('toolbar-button-underline')).toBeInTheDocument();
    });
  });
});
