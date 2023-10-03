/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import React from 'react';

import { resolveBackend } from '@staticcms/core/backend';
import { createMockConfig } from '@staticcms/test/data/config.mock';
import { renderWithProviders } from '@staticcms/test/test-utils';
import GitGatewayAuthenticationPage from '../AuthenticationPage';

import type { GitGatewayAuthenticationPageProps } from '../AuthenticationPage';

jest.mock('@staticcms/core/backend');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).netlifyIdentity = {
  currentUser: jest.fn(),
  on: jest.fn(),
  close: jest.fn(),
};

describe('GitGatewayAuthenticationPage', () => {
  const props: GitGatewayAuthenticationPageProps = {
    onLogin: jest.fn(),
    inProgress: false,
    config: createMockConfig({ logo_url: 'logo_url', collections: [] }),
    handleAuth: jest.fn(),
  };

  beforeEach(() => {
    (resolveBackend as jest.Mock).mockResolvedValue(null);

    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should render with identity error', () => {
    const { queryByTestId } = renderWithProviders(<GitGatewayAuthenticationPage {...props} />);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorCallback = (window as any).netlifyIdentity.on.mock.calls.find(
      (call: string[]) => call[0] === 'error',
    )[1];

    act(() => {
      errorCallback(
        new Error('Failed to load settings from https://site.netlify.com/.netlify/identity'),
      );
    });

    expect(queryByTestId('login-button')).toBeInTheDocument();
    expect(queryByTestId('login-error')).toBeInTheDocument();
  });

  it('should render with no identity error', () => {
    const { queryByTestId } = renderWithProviders(<GitGatewayAuthenticationPage {...props} />);

    expect(queryByTestId('login-button')).toBeInTheDocument();
    expect(queryByTestId('login-error')).not.toBeInTheDocument();
  });
});
