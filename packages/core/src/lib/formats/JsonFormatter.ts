import { isEmpty } from '../lib/util/string.util';
import FileFormatter from './FileFormatter';

class JsonFormatter extends FileFormatter {
  fromFile(content: string) {
    if (isEmpty(content)) {
      return {};
    }

    return JSON.parse(content);
  }

  toFile(data: object) {
    return JSON.stringify(data, null, 2);
  }
}

export default new JsonFormatter();
