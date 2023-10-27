/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import React from 'react';

import { currentBackend } from '@staticcms/core/backend';
import { selectCollection } from '@staticcms/core/reducers/selectors/collections';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { selectMediaLibraryFiles } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { createMockFolderCollection } from '@staticcms/test/data/collections.mock';
import { createMockConfig } from '@staticcms/test/data/config.mock';
import { createMockEntry } from '@staticcms/test/data/entry.mock';
import useMediaFiles from '../useMediaFiles';
import { mockFileField } from '@staticcms/test/data/fields.mock';

import type { MediaField, MediaFile } from '@staticcms/core/interface';
import type { FC } from 'react';

interface MockWidgetProps {
  field?: MediaField;
  currentFolder?: string;
}

jest.mock('@staticcms/core/reducers/selectors/collections');
jest.mock('@staticcms/core/reducers/selectors/config');
jest.mock('@staticcms/core/reducers/selectors/entryDraft');
jest.mock('@staticcms/core/reducers/selectors/mediaLibrary');
jest.mock('@staticcms/core/backend');
jest.mock('@staticcms/core/store/hooks');

const MockWidget: FC<MockWidgetProps> = ({ field, currentFolder }) => {
  const files = useMediaFiles(field, currentFolder);

  return (
    <div data-testid="files">
      <div data-testid="file-count">{files.length}</div>
      {files.map(file => (
        <div key={file.path} data-testid={file.path}>
          {file.path}
        </div>
      ))}
    </div>
  );
};

const testMediaFiles: MediaFile[] = [
  {
    name: 'file.txt',
    id: 'file.txt',
    path: 'path/to/file.txt',
  },
  {
    name: 'other-file.png',
    id: 'other-file.png',
    path: 'path/to/other-file.png',
  },
  {
    name: '.gitkeep',
    id: '.gitkeep',
    path: 'path/to/.gitkeep',
  },
  {
    name: 'A Directory',
    id: 'A Directory',
    path: 'path/to/A Directory',
    isDirectory: true,
  },
];

const testEntryMediaFiles: Record<string, MediaFile[]> = {
  'path/to': [
    {
      name: 'file-entry.txt',
      id: 'file-entry.txt',
      path: 'path/to/file-entry.txt',
    },
    {
      name: 'other-entry-file.png',
      id: 'other-entry-file.png',
      path: 'path/to/other-entry-file.png',
    },
    {
      name: '.gitkeep',
      id: '.gitkeep',
      path: 'path/to/.gitkeep',
    },
    {
      name: 'An Entry Directory',
      id: 'An Entry Directory',
      path: 'path/to/An Entry Directory',
      isDirectory: true,
    },
    {
      name: 'An Empty Directory',
      id: 'An Empty Directory',
      path: 'path/to/An Empty Entry Directory',
      isDirectory: true,
    },
  ],
  'path/to/An Entry Directory': [
    {
      name: '.gitkeep',
      id: '.gitkeep',
      path: 'path/to/An Entry Directory/.gitkeep',
    },
    {
      name: 'sub-folder-file.jpg',
      id: 'sub-folder-file.jpg',
      path: 'path/to/An Entry Directory/sub-folder-file.jpg',
    },
  ],
  'path/to/An Empty Entry Directory': [
    {
      name: '.gitkeep',
      id: '.gitkeep',
      path: 'path/to/An Empty Entry Directory/.gitkeep',
    },
  ],
};

describe('useMediaFiles', () => {
  const mockSelectCollection = selectCollection as unknown as jest.Mock;
  const mockSelectConfig = selectConfig as jest.Mock;
  const mockSelectEditingDraft = selectEditingDraft as jest.Mock;
  const mockSelectMediaLibraryFiles = selectMediaLibraryFiles as jest.Mock;
  const mockCurrentBackend = currentBackend as jest.Mock;
  const mockUseAppSelector = useAppSelector as jest.Mock;

  const mockGetMedia = jest.fn();

  const mockCollection = createMockFolderCollection();

  const createMockComponent = async (props: MockWidgetProps = {}) => {
    const { rerender, ...result } = render(<MockWidget {...props} />);

    await act(async () => {
      await Promise.resolve();
    });

    const rerenderMockComponent = async (rerenderProps: Partial<MockWidgetProps> = {}) => {
      rerender(<MockWidget {...props} {...rerenderProps} />);

      await act(async () => {
        await Promise.resolve();
      });
    };

    return { ...result, rerender: rerenderMockComponent };
  };

  beforeEach(() => {
    jest.useFakeTimers();
    mockUseAppSelector.mockImplementation((fn: () => unknown) => {
      if (typeof fn !== 'function') {
        return undefined;
      }

      return fn();
    });

    mockSelectCollection.mockReturnValue(() => undefined);
    mockSelectConfig.mockReturnValue(
      createMockConfig({
        collections: [mockCollection],
        media_folder: 'path/to',
        public_folder: 'public/path',
      }),
    );
    mockSelectEditingDraft.mockReturnValue(undefined);
    mockSelectMediaLibraryFiles.mockReturnValue(testMediaFiles);
    mockCurrentBackend.mockReturnValue({
      getMedia: mockGetMedia,
    });
    mockGetMedia.mockImplementation(path => Promise.resolve(testEntryMediaFiles[path] ?? []));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('top level', () => {
    it('should retrieve media files, ignoring .gitkeep files', async () => {
      const { getByTestId } = await createMockComponent();

      expect(getByTestId('file-count').textContent).toBe('2');
      expect(getByTestId('path/to/file.txt')).toBeInTheDocument();
      expect(getByTestId('path/to/other-file.png')).toBeInTheDocument();

      expect(mockGetMedia).not.toHaveBeenCalled();
    });

    it('shows folders when folder support is on', async () => {
      mockSelectConfig.mockReturnValue(
        createMockConfig({
          collections: [mockCollection],
          media_library: { folder_support: true },
        }),
      );

      const { getByTestId } = await createMockComponent();

      expect(getByTestId('file-count').textContent).toBe('3');
      expect(getByTestId('path/to/file.txt')).toBeInTheDocument();
      expect(getByTestId('path/to/other-file.png')).toBeInTheDocument();
      expect(getByTestId('path/to/A Directory')).toBeInTheDocument();

      expect(mockGetMedia).not.toHaveBeenCalled();
    });
  });

  describe('entry', () => {
    beforeEach(() => {
      mockSelectEditingDraft.mockReturnValue(createMockEntry({ data: {} }));
      mockSelectCollection.mockReturnValue(() => mockCollection);
    });

    it('should retrieve media files, ignoring .gitkeep files', async () => {
      const { getByTestId } = await createMockComponent({
        field: mockFileField,
        currentFolder: 'path/to',
      });

      expect(getByTestId('file-count').textContent).toBe('2');
      expect(getByTestId('path/to/file-entry.txt')).toBeInTheDocument();
      expect(getByTestId('path/to/other-entry-file.png')).toBeInTheDocument();

      expect(mockGetMedia).toHaveBeenCalledWith('path/to', false, 'public/path');
    });

    it('shows folders when folder support is on', async () => {
      const { getByTestId } = await createMockComponent({
        field: { ...mockFileField, media_library: { folder_support: true } },
        currentFolder: 'path/to',
      });

      expect(getByTestId('file-count').textContent).toBe('4');
      expect(getByTestId('path/to/file-entry.txt')).toBeInTheDocument();
      expect(getByTestId('path/to/other-entry-file.png')).toBeInTheDocument();
      expect(getByTestId('path/to/An Entry Directory')).toBeInTheDocument();
      expect(getByTestId('path/to/An Empty Entry Directory')).toBeInTheDocument();

      expect(mockGetMedia).toHaveBeenCalledWith('path/to', true, 'public/path');
    });

    it('should retrieve sub folder media files, ignoring .gitkeep files', async () => {
      const { getByTestId } = await createMockComponent({
        field: mockFileField,
        currentFolder: 'path/to/An Entry Directory',
      });

      expect(getByTestId('file-count').textContent).toBe('1');
      expect(getByTestId('path/to/An Entry Directory/sub-folder-file.jpg')).toBeInTheDocument();

      expect(mockGetMedia).toHaveBeenCalledWith(
        'path/to/An Entry Directory',
        false,
        'public/path/An Entry Directory',
      );
    });

    it('should return no files for empty directory, ignoring .gitkeep files', async () => {
      const { getByTestId } = await createMockComponent({
        field: mockFileField,
        currentFolder: 'path/to/An Empty Entry Directory',
      });

      expect(getByTestId('file-count').textContent).toBe('0');

      expect(mockGetMedia).toHaveBeenCalledWith(
        'path/to/An Empty Entry Directory',
        false,
        'public/path/An Empty Entry Directory',
      );
    });

    it('should retrieve media as user transitions through folders', async () => {
      const { getByTestId, rerender } = await createMockComponent({
        field: { ...mockFileField, media_library: { folder_support: true } },
        currentFolder: 'path/to',
      });

      expect(getByTestId('file-count').textContent).toBe('4');
      expect(getByTestId('path/to/file-entry.txt')).toBeInTheDocument();
      expect(getByTestId('path/to/other-entry-file.png')).toBeInTheDocument();
      expect(getByTestId('path/to/An Entry Directory')).toBeInTheDocument();
      expect(getByTestId('path/to/An Empty Entry Directory')).toBeInTheDocument();

      expect(mockGetMedia).toHaveBeenLastCalledWith('path/to', true, 'public/path');

      const promise = rerender({
        currentFolder: 'path/to/An Entry Directory',
      });

      expect(getByTestId('file-count').textContent).toBe('0');

      await promise;

      expect(getByTestId('file-count').textContent).toBe('1');
      expect(getByTestId('path/to/An Entry Directory/sub-folder-file.jpg')).toBeInTheDocument();

      expect(mockGetMedia).toHaveBeenCalledWith(
        'path/to/An Entry Directory',
        true,
        'public/path/An Entry Directory',
      );

      const promise2 = await rerender({
        currentFolder: 'path/to/An Empty Entry Directory',
      });

      expect(getByTestId('file-count').textContent).toBe('0');

      await promise2;

      expect(getByTestId('file-count').textContent).toBe('0');

      expect(mockGetMedia).toHaveBeenCalledWith(
        'path/to/An Empty Entry Directory',
        true,
        'public/path/An Empty Entry Directory',
      );
    });

    it('should retrieve media as user transitions through draft folders', async () => {
      mockSelectEditingDraft.mockReturnValue(
        createMockEntry({
          data: {},
          mediaFiles: [
            {
              name: '.gitkeep',
              id: '.gitkeep',
              path: 'path/to/Draft Folder/.gitkeep',
              draft: true,
            },
            {
              name: '.gitkeep',
              id: '.gitkeep',
              path: 'path/to/Draft Folder/Sub Folder/.gitkeep',
              draft: true,
            },
            {
              name: 'image.gif',
              id: 'image.gif',
              path: 'path/to/Draft Folder/Sub Folder/image.gif',
              draft: true,
            },
          ],
        }),
      );

      const { getByTestId, rerender } = await createMockComponent({
        field: { ...mockFileField, media_library: { folder_support: true } },
        currentFolder: 'path/to',
      });

      expect(getByTestId('file-count').textContent).toBe('5');
      expect(getByTestId('path/to/file-entry.txt')).toBeInTheDocument();
      expect(getByTestId('path/to/other-entry-file.png')).toBeInTheDocument();
      expect(getByTestId('path/to/An Entry Directory')).toBeInTheDocument();
      expect(getByTestId('path/to/An Empty Entry Directory')).toBeInTheDocument();
      expect(getByTestId('path/to/Draft Folder')).toBeInTheDocument();

      expect(mockGetMedia).toHaveBeenLastCalledWith('path/to', true, 'public/path');

      const promise = rerender({
        currentFolder: 'path/to/Draft Folder',
      });

      // Draft files/folders should appear immediately
      expect(getByTestId('file-count').textContent).toBe('1');
      expect(getByTestId('path/to/Draft Folder/Sub Folder')).toBeInTheDocument();

      await promise;

      expect(getByTestId('file-count').textContent).toBe('1');
      expect(getByTestId('path/to/Draft Folder/Sub Folder')).toBeInTheDocument();

      expect(mockGetMedia).toHaveBeenCalledWith(
        'path/to/Draft Folder',
        true,
        'public/path/Draft Folder',
      );

      const promise2 = await rerender({
        currentFolder: 'path/to/Draft Folder/Sub Folder',
      });

      // Draft files/folders should appear immediately
      expect(getByTestId('file-count').textContent).toBe('1');
      expect(getByTestId('path/to/Draft Folder/Sub Folder/image.gif')).toBeInTheDocument();

      await promise2;

      expect(getByTestId('file-count').textContent).toBe('1');
      expect(getByTestId('path/to/Draft Folder/Sub Folder/image.gif')).toBeInTheDocument();

      expect(mockGetMedia).toHaveBeenCalledWith(
        'path/to/Draft Folder/Sub Folder',
        true,
        'public/path/Draft Folder/Sub Folder',
      );

      const promise3 = await rerender({
        currentFolder: 'path/to/Draft Folder',
      });

      // Draft files/folders should appear immediately
      expect(getByTestId('file-count').textContent).toBe('1');
      expect(getByTestId('path/to/Draft Folder/Sub Folder')).toBeInTheDocument();

      await promise3;

      expect(getByTestId('file-count').textContent).toBe('1');
      expect(getByTestId('path/to/Draft Folder/Sub Folder')).toBeInTheDocument();

      expect(mockGetMedia).toHaveBeenCalledWith(
        'path/to/Draft Folder',
        true,
        'public/path/Draft Folder',
      );
    });
  });
});
