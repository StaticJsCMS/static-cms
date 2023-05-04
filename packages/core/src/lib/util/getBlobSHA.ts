import { sha256 } from 'js-sha256';

export default (blob: Blob): Promise<string> =>
  new Promise(resolve => {
    const fr = new FileReader();
    fr.onload = ({ target }) => resolve(sha256(target?.result || ''));
    fr.onerror = () => {
      fr.abort();
      resolve('');
    };
    fr.readAsArrayBuffer(blob);
  });
