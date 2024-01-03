/* eslint-disable import/prefer-default-export */
import { act } from '@testing-library/react';
import React from 'react';

import MediaLibraryModal from '@staticcms/core/components/media-library/MediaLibraryModal';
import { store } from '@staticcms/core/store';
import { createMockWidgetControlProps } from '@staticcms/test/data/widgets.mock';
import { renderWithProviders } from '@staticcms/test/test-utils';

import type { BaseField, ObjectValue, UnknownField, WidgetControlProps } from '@staticcms/core';
import type { FC } from 'react';

export interface WidgetControlHarnessOptions {
  useFakeTimers?: boolean;
  withMediaLibrary?: boolean;
}

export type WidgetControlHarnessParams<T, F extends BaseField = UnknownField> = Parameters<
  typeof createMockWidgetControlProps<T, F>
>[0];
export type WidgetControlHarnessProps<T, F extends BaseField = UnknownField> = Omit<
  WidgetControlHarnessParams<T, F>,
  'field'
> &
  Pick<Partial<WidgetControlHarnessParams<T, F>>, 'field'>;

export interface WidgetControlHarnessReturn<T, F extends BaseField = UnknownField>
  extends Omit<ReturnType<typeof renderWithProviders>, 'rerender'> {
  rerender: (rerenderProps?: Omit<WidgetControlHarnessProps<T, F>, 'field'> | undefined) => {
    props: Omit<WidgetControlHarnessProps<T, F>, 'field'> | undefined;
  };
  store: typeof store;
  props: WidgetControlProps<T, F, ObjectValue>;
}

export type WidgetControlHarness<T, F extends BaseField = UnknownField> = (
  renderProps?: WidgetControlHarnessProps<T, F>,
  renderOptions?: WidgetControlHarnessOptions,
) => WidgetControlHarnessReturn<T, F>;

export const createWidgetControlHarness = <T, F extends BaseField = UnknownField>(
  Component: FC<WidgetControlProps<T, F>>,
  defaults: Omit<Partial<WidgetControlProps<T, F>>, 'field'> &
    Pick<WidgetControlProps<T, F>, 'field'>,
  options?: WidgetControlHarnessOptions,
): WidgetControlHarness<T, F> => {
  return (
    renderProps?: WidgetControlHarnessProps<T, F>,
    renderOptions?: WidgetControlHarnessOptions,
  ) => {
    const { useFakeTimers = false, withMediaLibrary = false } = renderOptions ?? options ?? {};
    if (useFakeTimers) {
      jest.useFakeTimers({ now: new Date(2023, 1, 12, 10, 15, 35, 0) });
    } else {
      jest.useRealTimers();
    }

    const field = renderProps?.field ?? defaults.field;

    const props = createMockWidgetControlProps<T, F>({ ...defaults, ...renderProps, field });

    const result = renderWithProviders(
      <>
        <Component {...props} />
        {withMediaLibrary ? <MediaLibraryModal key="library" /> : null}
      </>,
    );

    if (useFakeTimers) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    const rerender = (rerenderProps?: Omit<WidgetControlHarnessProps<T, F>, 'field'>) => {
      const finalRerenderProps = {
        ...props,
        ...rerenderProps,
      } as WidgetControlProps<T, F>;

      result.rerender(
        <>
          <Component {...finalRerenderProps} />
          {withMediaLibrary ? <MediaLibraryModal key="library" /> : null}
        </>,
      );

      return { props: rerenderProps };
    };

    return { ...result, props, rerender, store };
  };
};
