import type { ConfigWithDefaults } from '../interface';

export default abstract class FileFormatter {
  abstract name: string;
  abstract fromFile(content: string, config: ConfigWithDefaults): object;
  abstract toFile(
    data: object,
    config: ConfigWithDefaults,
    sortedKeys?: string[],
    comments?: Record<string, string>,
  ): string;
}
