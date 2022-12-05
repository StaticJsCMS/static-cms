import trim from 'lodash/trim';
import trimEnd from 'lodash/trimEnd';

import { createNonce, isInsecureProtocol, validateNonce } from './utils';

import type { User, AuthenticatorConfig } from '@staticcms/core/interface';
import type { NetlifyError } from './netlify-auth';

export default class ImplicitAuthenticator {
  private auth_url: string;
  private appID: string;
  private clearHash: () => void;

  constructor(config: AuthenticatorConfig = {}) {
    const baseURL = trimEnd(config.base_url, '/');
    const authEndpoint = trim(config.auth_endpoint, '/');
    this.auth_url = `${baseURL}/${authEndpoint}`;
    this.appID = config.app_id ?? '';
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.clearHash = config.clearHash ?? (() => {});
  }

  authenticate(
    options: { scope: string; prompt?: string | null; resource?: string | null },
    cb: (error: Error | NetlifyError | null, data?: User) => void,
  ) {
    if (isInsecureProtocol()) {
      return cb(new Error('Cannot authenticate over insecure protocol!'));
    }

    const authURL = new URL(this.auth_url);
    authURL.searchParams.set('client_id', this.appID);
    authURL.searchParams.set('redirect_uri', document.location.origin + document.location.pathname);
    authURL.searchParams.set('response_type', 'token');
    authURL.searchParams.set('scope', options.scope);

    if (options.prompt != null && options.prompt != undefined) {
      authURL.searchParams.set('prompt', options.prompt);
    }

    if (options.resource != null && options.resource != undefined) {
      authURL.searchParams.set('resource', options.resource);
    }

    const state = JSON.stringify({ auth_type: 'implicit', nonce: createNonce() });

    authURL.searchParams.set('state', state);

    document.location.assign(authURL.href);
  }

  /**
   * Complete authentication if we were redirected back to from the provider.
   */
  completeAuth(cb: (error: Error | NetlifyError | null, data?: User) => void) {
    const hashParams = new URLSearchParams(document.location.hash.replace(/^#?\/?/, ''));
    if (!hashParams.has('access_token') && !hashParams.has('error')) {
      return;
    }
    // Remove tokens from hash so that token does not remain in browser history.
    this.clearHash();

    const params = [...hashParams.entries()].reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    const { nonce } = JSON.parse(params.state ?? '');
    const validNonce = validateNonce(nonce);
    if (!validNonce) {
      return cb(new Error('Invalid nonce'));
    }

    if ('error' in hashParams) {
      return cb(new Error(`${params.error}: ${params.error_description}`));
    }

    if ('access_token' in params) {
      const { access_token: token, ...data } = params;
      cb(null, { token, ...data } as User);
    }
  }
}
