import type { User, AuthenticatorConfig } from '@staticcms/core/interface';
import type { NetlifyError } from './netlify-auth';
export default class ImplicitAuthenticator {
    private auth_url;
    private appID;
    private clearHash;
    constructor(config?: AuthenticatorConfig);
    authenticate(options: {
        scope: string;
        prompt?: string | null;
        resource?: string | null;
    }, cb: (error: Error | NetlifyError | null, data?: User) => void): void;
    /**
     * Complete authentication if we were redirected back to from the provider.
     */
    completeAuth(cb: (error: Error | NetlifyError | null, data?: User) => void): void;
}
