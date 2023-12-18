import FileFormatter from './FileFormatter';
declare class TomlFormatter extends FileFormatter {
    fromFile(content: string): object;
    toFile(data: object): string;
}
declare const _default: TomlFormatter;
export default _default;
