import { FileFormatter } from './FileFormatter';

class JsonFormatter extends FileFormatter {
  fromFile(content: string) {
    return JSON.parse(content);
  }

  toFile(data: object) {
    return JSON.stringify(data, null, 2);
  }
}

export default new JsonFormatter();
