export abstract class FileFormatter {
  abstract fromFile(content: string): object;
  abstract toFile(data: object, sortedKeys?: string[], comments?: Record<string, string>): string;
}
