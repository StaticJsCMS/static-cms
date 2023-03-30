/* eslint-disable import/prefer-default-export */
import { act } from '@testing-library/react';
import React from 'react';

import MediaLibraryModal from '@staticcms/core/components/media-library/MediaLibraryModal';
import { store } from '@staticcms/core/store';
import { createMockWidgetControlProps } from '@staticcms/test/data/widgets.mock';
import { renderWithProviders } from '@staticcms/test/test-utils';

import type {
  BaseField,
  UnknownField,
  ValueOrNestedValue,
  WidgetControlProps,
} from '@staticcms/core/interface';
import type { FC } from 'react';

export interface WidgetControlHarnessOptions {
  useFakeTimers?: boolean;
  withMediaLibrary?: boolean;
}

export const createWidgetControlHarness = <
  T extends ValueOrNestedValue,
  F extends BaseField = UnknownField,
>(
  Component: FC<WidgetControlProps<T, F>>,
  defaults: Omit<Partial<WidgetControlProps<T, F>>, 'field'> &
    Pick<WidgetControlProps<T, F>, 'field'>,
  options?: WidgetControlHarnessOptions,
) => {
  type Params = Parameters<typeof createMockWidgetControlProps<T, F>>[0];
  type Props = Omit<Params, 'field'> & Pick<Partial<Params>, 'field'>;

  return (renderProps?: Props, renderOptions?: WidgetControlHarnessOptions) => {
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

    const rerender = (rerenderProps?: Omit<Props, 'field'>) => {
      const finalRerenderProps = {
        ...props,
        ...rerenderProps,
      };

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
