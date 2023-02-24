/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import type {
  BaseField,
  Collection,
  Config,
  Entry,
  UnknownField,
  WidgetControlProps,
} from '@staticcms/core/interface';
import type { FC } from 'react';
import type { t } from 'react-polyglot';

export interface CreateControlWrapper<V = unknown, F extends BaseField = UnknownField> {
  defaultField: F;
  control: FC<WidgetControlProps<V, F>>;
  label: string;
  path: string;
}

const createControlWrapper = <V = unknown, F extends BaseField = UnknownField>({
  defaultField,
  control: Control,
  label: defaultLabel,
  path: defaultPath,
}: CreateControlWrapper<V, F>) => {
  const ControlWrapper: FC<Partial<WidgetControlProps<V, F>>> = ({
    collection = {} as Collection<F>,
    config = {} as Config<F>,
    entry = {} as Entry,
    field = defaultField,
    fieldsErrors = {},
    submitted = false,
    forList = false,
    getAsset = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Promise.resolve(null) as any;
    },
    isDisabled = false,
    isDuplicate = false,
    isFieldDuplicate = () => false,
    isHidden = false,
    isFieldHidden = () => false,
    label = defaultLabel,
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
    path = defaultPath,
    query = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Promise.resolve('') as any;
    },
    t = (() => '') as t,
    value = undefined,
  }) => {
    return (
      <Control
        key="control"
        collection={collection}
        config={config}
        entry={entry}
        field={field}
        fieldsErrors={fieldsErrors}
        submitted={submitted}
        forList={forList}
        getAsset={getAsset}
        isDisabled={isDisabled}
        isDuplicate={isDuplicate}
        isFieldDuplicate={isFieldDuplicate}
        isHidden={isHidden}
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

  return ControlWrapper;
};

export default createControlWrapper;
