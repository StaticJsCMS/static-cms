import type { BaseField, Collection, Entry, MediaField, UnknownField } from '@staticcms/core/interface';
interface CardMediaProps<EF extends BaseField> {
    image: string;
    width?: string | number;
    height?: string | number;
    alt?: string;
    collection?: Collection<EF>;
    field?: MediaField;
    entry?: Entry;
}
declare const CardMedia: <EF extends BaseField = UnknownField>({ image, width, height, alt, collection, field, entry, }: CardMediaProps<EF>) => JSX.Element;
export default CardMedia;
