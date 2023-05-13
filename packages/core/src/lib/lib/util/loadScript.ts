/**
 * Simple script loader that returns a promise.
 */
export default function loadScript(url: string) {
  return new Promise<void>((resolve, reject) => {
    const head = document.getElementsByTagName('head')[0];
    const script: HTMLScriptElement = document.createElement('script');
    script.src = url;
    script.onload = () => {
      resolve();
    };
    script.onerror = error => {
      reject(error);
    };
    head.appendChild(script);
  });
}
