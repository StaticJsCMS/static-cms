/* eslint-disable import/prefer-default-export */
import React from 'react';

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

export const createWidgetControlHarness = <
  T extends ValueOrNestedValue,
  F extends BaseField = UnknownField,
>(
  Component: FC<WidgetControlProps<T, F>>,
  defaults: Omit<Partial<WidgetControlProps<T, F>>, 'field'> &
    Pick<WidgetControlProps<T, F>, 'field'>,
) => {
  type Params = Parameters<typeof createMockWidgetControlProps<T, F>>[0];
  type Options = Omit<Params, 'field'> & Pick<Partial<Params>, 'field'>;

  return (options?: Options) => {
    const field = options?.field ?? defaults.field;

    const props = createMockWidgetControlProps<T, F>({ ...defaults, ...options, field });

    const result = renderWithProviders(<Component {...props} />);

    const rerender = (renderOptions?: Omit<Options, 'field'>) => {
      const rerenderProps = createMockWidgetControlProps<T, F>({
        ...defaults,
        ...renderOptions,
        field,
      });

      result.rerender(<Component {...rerenderProps} />);

      return { props: rerenderProps };
    };

    return { ...result, props, rerender, store };
  };
};
