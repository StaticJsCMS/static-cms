/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import React from 'react';

import { currentBackend } from '@staticcms/core/backend';
import { selectCollection } from '@staticcms/core/reducers/selectors/collections';
import { selectConfig } from '@staticcms/core/reducers/selectors/config';
import { selectEditingDraft } from '@staticcms/core/reducers/selectors/entryDraft';
import { selectMediaLibraryFiles } from '@staticcms/core/reducers/selectors/mediaLibrary';
import { useAppSelector } from '@staticcms/core/store/hooks';
import { createMockCollection } from '@staticcms/test/data/collections.mock';
import { createMockConfig } from '@staticcms/test/data/config.mock';
import useMediaFiles from '../useMediaFiles';

import type { MediaField } from '@staticcms/core/interface';
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
        <div key={file.url} data-testid={file.url}>
          {file.url}
        </div>
      ))}
    </div>
  );
};

describe('useMediaFiles', () => {
  const mockSelectCollection = selectCollection as jest.Mock;
  const mockSelectConfig = selectConfig as jest.Mock;
  const mockSelectEditingDraft = selectEditingDraft as jest.Mock;
  const mockSelectMediaLibraryFiles = selectMediaLibraryFiles as jest.Mock;
  const mockCurrentBackend = currentBackend as jest.Mock;
  const mockUseAppSelector = useAppSelector as jest.Mock;

  beforeEach(() => {
    mockUseAppSelector.mockImplementation((fn: () => unknown) => fn());

    const collection = createMockCollection();
    mockSelectCollection.mockReturnValue(undefined);
    mockSelectConfig.mockReturnValue(createMockConfig({ collections: [collection] }));
    mockSelectEditingDraft.mockReturnValue(undefined);
    mockSelectMediaLibraryFiles.mockReturnValue([]);
    mockCurrentBackend.mockReturnValue({
      getMedia: () => [],
    });
  });

  describe('top level', () => {
    it('should retrieve media files', () => {
      const { getByTestId } = render(<MockWidget />);

      expect(getByTestId('file-count').textContent).toBe('0');
    });
  });
});
