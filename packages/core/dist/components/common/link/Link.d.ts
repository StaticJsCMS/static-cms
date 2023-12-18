import type { Collection, MediaField } from '@staticcms/core/interface';
export interface LinkProps<F extends MediaField> {
    href: string | undefined | null;
    children: string;
    collection?: Collection<F>;
    field?: F;
    'data-testid'?: string;
}
declare const Link: <F extends MediaField>({ href, children, collection, field, "data-testid": dataTestId, }: LinkProps<F>) => JSX.Element;
export declare const withMdxLink: <F extends MediaField>({ collection, field, }: Pick<LinkProps<F>, "field" | "collection">) => ({ children, ...props }: Omit<LinkProps<F>, "field" | "collection">) => JSX.Element;
export default Link;
