/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-empty-function */
import '@testing-library/jest-dom';
import { getByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ListControl from '../ListControl';

import type {
  Collection,
  Config,
  Entry,
  ListField,
  ValueOrNestedValue,
  WidgetControlProps,
} from '@staticcms/core/interface';
import type { FC } from 'react';
import type { t } from 'react-polyglot';

const SingletonListField: ListField = {
  widget: 'list',
  name: 'singleton',
  default: [''],
  fields: [
    {
      widget: 'string',
      name: 'string-input',
    },
  ],
};

const ListControlWrapper: FC<Partial<WidgetControlProps<ValueOrNestedValue[], ListField>>> = ({
  collection = {} as Collection<ListField>,
  config = {} as Config<ListField>,
  entry = {} as Entry,
  field = SingletonListField,
  fieldsErrors = {},
  submitted = false,
  forList = false,
  getAsset = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Promise.resolve(null) as any;
  },
  isDisabled = false,
  isFieldDuplicate = () => false,
  isFieldHidden = () => false,
  label = 'Test List',
  locale = 'en',
  mediaPaths = {},
  onChange = () => {},
  clearMediaControl = () => {},
  openMediaLibrary = () => {},
  removeInsertedMedia = () => ({
    type: 'MEDIA_REMOVE_INSERTED',
    payload: {
      controlID: '123456',
    },
  }),
  removeMediaControl = () => {},
  i18n = undefined,
  hasErrors = false,
  path = 'list',
  query = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Promise.resolve('') as any;
  },
  t = (() => '') as t,
  value = undefined,
}) => {
  return (
    <ListControl
      key="list-control"
      collection={collection}
      config={config}
      entry={entry}
      field={field}
      fieldsErrors={fieldsErrors}
      submitted={submitted}
      forList={forList}
      getAsset={getAsset}
      isDisabled={isDisabled}
      isFieldDuplicate={isFieldDuplicate}
      isFieldHidden={isFieldHidden}
      label={label}
      locale={locale}
      mediaPaths={mediaPaths}
      onChange={onChange}
      clearMediaControl={clearMediaControl}
      openMediaLibrary={openMediaLibrary}
      removeInsertedMedia={removeInsertedMedia}
      removeMediaControl={removeMediaControl}
      i18n={i18n}
      hasErrors={hasErrors}
      path={path}
      query={query}
      t={t}
      value={value}
    />
  );
};

jest.mock('@staticcms/core/components/Editor/EditorControlPane/EditorControl', () => {
  return jest.fn(props => {
    const { parentPath, fieldName } = props;
    console.log(props);
    return (
      <div data-testid="editor-control">
        <div data-testid="parentPath">{parentPath}</div>
        <div data-testid="fieldName">{fieldName}</div>
      </div>
    );
  });
});

describe(ListControl.name, () => {
  describe('singleton list', () => {
    it('renders empty div by default', () => {
      render(<ListControlWrapper value={['Value 1', 'Value 2']} />);
      expect(screen.getByTestId('object-control-0')).not.toBeVisible();
      expect(screen.getByTestId('object-control-1')).not.toBeVisible();
    });

    fit('renders values when opened', async () => {
      render(<ListControlWrapper value={['Value 1', 'Value 2']} />);

      const headerBar = screen.getByTestId('list-header');

      await userEvent.click(getByTestId(headerBar, 'expand-button'));

      const itemOne = screen.getByTestId('object-control-0');
      expect(itemOne).toBeVisible();
      expect(getByTestId(itemOne, 'list-item-title').textContent).toBe('Value 1');
      expect(getByTestId(itemOne, 'parentPath').textContent).toBe('list');
      expect(getByTestId(itemOne, 'fieldName').textContent).toBe('0');

      const itemTwo = screen.getByTestId('object-control-1');
      expect(itemTwo).toBeVisible();
      expect(getByTestId(itemTwo, 'list-item-title').textContent).toBe('Value 2');
      expect(getByTestId(itemTwo, 'parentPath').textContent).toBe('list');
      expect(getByTestId(itemTwo, 'fieldName').textContent).toBe('1');
    });

    it('outputs value as singleton array when adding new value', async () => {
      const onChange = jest.fn();

      render(<ListControlWrapper value={['Value 1', 'Value 2']} onChange={onChange} />);

      const headerBar = screen.getByTestId('list-header');

      await userEvent.click(getByTestId(headerBar, 'expand-button'));

      await userEvent.click(getByTestId(headerBar, 'add-button'));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(['Value 1', 'Value 2', '']);
    });
  });
});
