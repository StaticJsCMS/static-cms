import FileFormatter from './FileFormatter';
declare class YamlFormatter extends FileFormatter {
    fromFile(content: string): any;
    toFile(data: object, sortedKeys?: string[], comments?: Record<string, string>): string;
}
declare const _default: YamlFormatter;
export default _default;
