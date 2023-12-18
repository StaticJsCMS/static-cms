import type { User, AuthenticatorConfig } from '@staticcms/core/interface';
import type { NetlifyError } from './netlify-auth';
export default class PkceAuthenticator {
    private auth_url;
    private auth_token_url;
    private appID;
    constructor(config?: AuthenticatorConfig);
    authenticate(options: {
        scope: string;
        prompt?: string | null;
        resource?: string | null;
    }, cb: (error: Error | NetlifyError | null, data?: User) => void): Promise<void>;
    /**
     * Complete authentication if we were redirected back to from the provider.
     */
    completeAuth(cb: (error: Error | NetlifyError | null, data?: User) => void): Promise<void>;
}
