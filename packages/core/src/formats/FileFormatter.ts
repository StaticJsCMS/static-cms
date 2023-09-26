export default abstract class FileFormatter {
  abstract name: string;
  abstract fromFile(content: string): object;
  abstract toFile(data: object, sortedKeys?: string[], comments?: Record<string, string>): string;
}
