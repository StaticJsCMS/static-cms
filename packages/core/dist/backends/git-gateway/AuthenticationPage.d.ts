import type { AuthenticationPageProps, TranslatedProps, User } from '@staticcms/core/interface';
export interface GitGatewayAuthenticationPageProps extends TranslatedProps<AuthenticationPageProps> {
    handleAuth: (email: string, password: string) => Promise<User | string>;
}
declare const GitGatewayAuthenticationPage: ({ onLogin, t }: GitGatewayAuthenticationPageProps) => JSX.Element;
export default GitGatewayAuthenticationPage;
