import type { User, AuthenticatorConfig } from '@staticcms/core/interface';
export declare class NetlifyError {
    private err;
    constructor(err: Error);
    toString(): string;
}
declare class Authenticator {
    private site_id;
    private base_url;
    private auth_endpoint;
    private authWindow;
    constructor(config?: AuthenticatorConfig);
    handshakeCallback(options: {
        provider?: string | undefined;
    }, cb: (error: Error | NetlifyError | null, data?: User) => void): (e: {
        data: string;
        origin: string;
    }) => void;
    authorizeCallback(options: {
        provider?: string | undefined;
    }, cb: (error: Error | NetlifyError | null, data?: User) => void): (e: {
        data: string;
        origin: string;
    }) => void;
    getSiteID(): string;
    authenticate(options: {
        provider?: string | undefined;
        scope?: string;
        login?: boolean;
        beta_invite?: string;
        invite_code?: string;
    }, cb: (error: Error | NetlifyError | null, data?: User) => void): void;
    refresh(options: {
        provider: string;
        refresh_token?: string;
    }, cb?: (error: Error | NetlifyError | null, data?: User) => void): void | Promise<any>;
}
export default Authenticator;
