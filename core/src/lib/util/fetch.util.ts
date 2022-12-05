/* eslint-disable import/prefer-default-export */
export async function doesUrlFileExist(url: string): Promise<{ type: string; exists: boolean }> {
  const cleanUrl = url.replace(/^blob:/g, '');

  const baseUrl = `${window.location.protocol}//${window.location.host}/`;

  if (!cleanUrl.startsWith('/') && !cleanUrl.startsWith(baseUrl)) {
    return { type: 'Unknown', exists: true };
  }

  const response = await fetch(cleanUrl, { method: 'HEAD' });
  return { type: response.headers.get('Content-Type') ?? 'text', exists: response.ok };
}
