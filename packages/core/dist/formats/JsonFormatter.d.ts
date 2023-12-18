import FileFormatter from './FileFormatter';
declare class JsonFormatter extends FileFormatter {
    fromFile(content: string): any;
    toFile(data: object): string;
}
declare const _default: JsonFormatter;
export default _default;
