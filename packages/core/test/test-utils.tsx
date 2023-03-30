/* eslint-disable import/prefer-default-export */
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '@staticcms/core/store';

import type { PropsWithChildren } from 'react';

export function renderWithProviders(ui: React.ReactElement) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper }) };
}
