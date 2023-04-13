/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { configLoaded } from '@staticcms/core/actions/config';
import {
  insertMedia,
  mediaDisplayURLSuccess,
  mediaInserted,
} from '@staticcms/core/actions/mediaLibrary';
import { store } from '@staticcms/core/store';
import { createMockCollection } from '@staticcms/test/data/collections.mock';
import { createMockConfig } from '@staticcms/test/data/config.mock';
import { mockFileField } from '@staticcms/test/data/fields.mock';
import { createWidgetControlHarness } from '@staticcms/test/harnesses/widget.harness';
import withFileControl from '../withFileControl';

import type { Config, FileOrImageField, MediaFile } from '@staticcms/core/interface';

const FileControl = withFileControl();

jest.mock('@staticcms/core/lib/hooks/useMediaFiles', () => {
  const mockMediaFiles: MediaFile[] = [
    {
      name: 'file1.txt',
      key: '12345',
      id: '12345',
      path: 'path/to/file1.txt',
    },
    {
      name: 'file2.png',
      key: '67890',
      id: '67890',
      path: 'path/to/file2.png',
    },
  ];

  return jest.fn(() => mockMediaFiles);
});

jest.mock('@staticcms/core/actions/mediaLibrary', () => ({
  ...jest.requireActual('@staticcms/core/actions/mediaLibrary'),
  closeMediaLibrary: jest.fn(),
  deleteMedia: jest.fn(),
  insertMedia: jest.fn(),
  loadMedia: jest.fn(),
  loadMediaDisplayURL: jest.fn(),
  persistMedia: jest.fn(),
}));

jest.mock('@staticcms/core/lib/hooks/useMediaAsset', () => (url: string) => url);

describe('File Control', () => {
  const collection = createMockCollection({}, mockFileField);
  const config = createMockConfig({
    collections: [collection],
  }) as unknown as Config<FileOrImageField>;

  const mockInsertMedia = insertMedia as jest.Mock;

  const renderControl = createWidgetControlHarness(
    FileControl,
    { field: mockFileField, config },
    { withMediaLibrary: true },
  );

  beforeEach(() => {
    store.dispatch(configLoaded(config as unknown as Config));
    store.dispatch(mediaDisplayURLSuccess('12345', 'path/to/file1.txt'));
    store.dispatch(mediaDisplayURLSuccess('67890', 'path/to/file2.png'));

    mockInsertMedia.mockImplementation((mediaPath: string | string[]) => {
      store.dispatch(mediaInserted(mediaPath, ''));
    });

    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should render', () => {
    const { getByTestId } = renderControl({ label: 'I am a label' });

    const label = getByTestId('label');
    expect(label.textContent).toBe('I am a label');
    expect(label).toHaveClass('text-slate-500');

    const field = getByTestId('field');
    expect(field).toHaveClass('group/active');

    const fieldWrapper = getByTestId('field-wrapper');
    expect(fieldWrapper).not.toHaveClass('mr-14');

    // String Widget uses pointer cursor
    expect(label).toHaveClass('cursor-pointer');
    expect(field).toHaveClass('cursor-pointer');

    // String Widget uses default label layout, without bottom padding on field
    expect(label).toHaveClass('px-3', 'pt-3');
    expect(field).not.toHaveClass('pb-3');
  });

  it('should show only the choose upload button by default', () => {
    const { getByTestId, queryByTestId } = renderControl({ label: 'I am a label' });

    expect(getByTestId('choose-upload')).toBeInTheDocument();
    expect(queryByTestId('choose-url')).not.toBeInTheDocument();
    expect(queryByTestId('add-replace-upload')).not.toBeInTheDocument();
    expect(queryByTestId('replace-url')).not.toBeInTheDocument();
    expect(queryByTestId('remove-upload')).not.toBeInTheDocument();
  });

  it('should show only the choose upload and choose url buttons by default when choose url is true', () => {
    const { getByTestId, queryByTestId } = renderControl({
      label: 'I am a label',
      field: { ...mockFileField, choose_url: true },
    });

    expect(getByTestId('choose-upload')).toBeInTheDocument();
    expect(getByTestId('choose-url')).toBeInTheDocument();
    expect(queryByTestId('add-replace-upload')).not.toBeInTheDocument();
    expect(queryByTestId('replace-url')).not.toBeInTheDocument();
    expect(queryByTestId('remove-upload')).not.toBeInTheDocument();
  });

  it('should show only the add/replace upload and remove buttons by there is a value', () => {
    const { getByTestId, queryByTestId } = renderControl({
      label: 'I am a label',
      value: 'https://example.com/file.pdf',
    });

    expect(queryByTestId('choose-upload')).not.toBeInTheDocument();
    expect(queryByTestId('choose-url')).not.toBeInTheDocument();
    expect(getByTestId('add-replace-upload')).toBeInTheDocument();
    expect(queryByTestId('replace-url')).not.toBeInTheDocument();
    expect(getByTestId('remove-upload')).toBeInTheDocument();
  });

  it('should show the add/replace upload, replace url and remove buttons by there is a value and choose url is true', () => {
    const { getByTestId, queryByTestId } = renderControl({
      label: 'I am a label',
      field: { ...mockFileField, choose_url: true },
      value: 'https://example.com/file.pdf',
    });

    expect(queryByTestId('choose-upload')).not.toBeInTheDocument();
    expect(queryByTestId('choose-url')).not.toBeInTheDocument();
    expect(getByTestId('add-replace-upload')).toBeInTheDocument();
    expect(getByTestId('replace-url')).toBeInTheDocument();
    expect(getByTestId('remove-upload')).toBeInTheDocument();
  });

  it('should render as single list item', () => {
    const { getByTestId } = renderControl({ label: 'I am a label', forSingleList: true });

    const fieldWrapper = getByTestId('field-wrapper');
    expect(fieldWrapper).toHaveClass('mr-14');
  });

  it('should only use prop value as initial value', async () => {
    const { rerender, getByTestId } = renderControl({ value: 'https://example.com/file.pdf' });

    const link = getByTestId('link');
    expect(link.textContent).toBe('https://example.com/file.pdf');

    rerender({ value: 'https://example.com/someoether.pdf' });
    expect(link.textContent).toBe('https://example.com/file.pdf');
  });

  it('should use prop value exclusively if field is i18n duplicate', async () => {
    const { rerender, getByTestId } = renderControl({
      field: { ...mockFileField, i18n: 'duplicate' },
      duplicate: true,
      value: 'https://example.com/file.pdf',
    });

    const link = getByTestId('link');
    expect(link.textContent).toBe('https://example.com/file.pdf');

    rerender({ value: 'https://example.com/someoether.pdf' });
    expect(link.textContent).toBe('https://example.com/someoether.pdf');
  });

  it('should call onChange when selected file changes', async () => {
    const {
      getByTestId,
      props: { onChange },
    } = renderControl();

    const uploadButton = getByTestId('choose-upload');
    await act(async () => {
      await userEvent.click(uploadButton);
    });

    const file = screen.getByTestId('media-card-path/to/file2.png');
    await act(async () => {
      await userEvent.click(file);
    });

    const chooseSelected = screen.getByTestId('choose-selected');
    await act(async () => {
      await userEvent.click(chooseSelected);
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('path/to/file2.png');
    });
  });

  it('should show error', async () => {
    const { getByTestId } = renderControl({
      errors: [{ type: 'error-type', message: 'i am an error' }],
    });

    const error = getByTestId('error');
    expect(error.textContent).toBe('i am an error');

    const field = getByTestId('field');
    expect(field).not.toHaveClass('group/active');

    const label = getByTestId('label');
    expect(label).toHaveClass('text-red-500');
  });

  describe('disabled', () => {
    it('should show only the choose upload button by default', () => {
      const { getByTestId } = renderControl({ label: 'I am a label', disabled: true });

      expect(getByTestId('choose-upload')).toBeDisabled();
    });

    it('should show only the choose upload and choose url buttons by default when choose url is true', () => {
      const { getByTestId } = renderControl({
        label: 'I am a label',
        field: { ...mockFileField, choose_url: true },
        disabled: true,
      });

      expect(getByTestId('choose-upload')).toBeDisabled();
      expect(getByTestId('choose-url')).toBeDisabled();
    });

    it('should show only the add/replace upload and remove buttons by there is a value', () => {
      const { getByTestId } = renderControl({
        label: 'I am a label',
        value: 'https://example.com/file.pdf',
        disabled: true,
      });

      expect(getByTestId('add-replace-upload')).toBeDisabled();
      expect(getByTestId('remove-upload')).toBeDisabled();
    });

    it('should show the add/replace upload, replace url and remove buttons by there is a value and choose url is true', () => {
      const { getByTestId } = renderControl({
        label: 'I am a label',
        field: { ...mockFileField, choose_url: true },
        value: 'https://example.com/file.pdf',
        disabled: true,
      });

      expect(getByTestId('add-replace-upload')).toBeDisabled();
      expect(getByTestId('replace-url')).toBeDisabled();
      expect(getByTestId('remove-upload')).toBeDisabled();
    });
  });
});
