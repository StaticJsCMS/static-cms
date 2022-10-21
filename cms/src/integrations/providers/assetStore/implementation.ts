import pickBy from 'lodash/pickBy';
import trimEnd from 'lodash/trimEnd';

import { unsentRequest } from '../../../lib/util';
import { addParams } from '../../../lib/urlHelper';

import type { AssetStoreConfig } from '../../../interface';

const { fetchWithTimeout: fetch } = unsentRequest;

interface AssetStoreResponse {
  id: string;
  name: string;
  size: number;
  url: string;
}

export default class AssetStore {
  private shouldConfirmUpload: boolean;
  private getSignedFormURL: string;
  private getToken: () => Promise<string | null>;

  constructor(config: AssetStoreConfig, getToken: () => Promise<string | null>) {
    if (config.getSignedFormURL == null) {
      throw 'The AssetStore integration needs the getSignedFormURL in the integration configuration.';
    }
    this.getToken = getToken;

    this.shouldConfirmUpload = config.shouldConfirmUpload ?? false;
    this.getSignedFormURL = trimEnd(config.getSignedFormURL, '/');
  }

  parseJsonResponse(response: Response) {
    return response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    });
  }

  urlFor(path: string, optionParams: Record<string, string> = {}) {
    const params = [];
    for (const key in optionParams) {
      params.push(`${key}=${encodeURIComponent(optionParams[key])}`);
    }
    if (params.length) {
      path += `?${params.join('&')}`;
    }
    return path;
  }

  requestHeaders(headers = {}) {
    return {
      ...headers,
    };
  }

  confirmRequest(assetID: string) {
    this.getToken().then(token =>
      this.request(`${this.getSignedFormURL}/${assetID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ state: 'uploaded' }),
      }),
    );
  }

  async request(
    path: string,
    options: RequestInit & {
      params?: Record<string, string>;
    },
  ) {
    const headers = this.requestHeaders(options.headers || {});
    const url = this.urlFor(path, options.params);
    const response = await fetch(url, { ...options, headers });
    const contentType = response.headers.get('Content-Type');
    const isJson = contentType && contentType.match(/json/);
    const content = isJson ? await this.parseJsonResponse(response) : response.text();
    return content;
  }

  async retrieve(query: string, page: number, privateUpload: boolean) {
    const params = pickBy(
      { search: query, page: `${page}`, filter: privateUpload ? 'private' : 'public' },
      val => !!val,
    );
    const url = addParams(this.getSignedFormURL, params);
    const token = await this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response: AssetStoreResponse[] = await this.request(url, { headers });
    const files = response.map(({ id, name, size, url }) => {
      return { id, name, size, displayURL: url, url, path: url };
    });
    return files;
  }

  delete(assetID: string) {
    const url = `${this.getSignedFormURL}/${assetID}`;
    return this.getToken().then(token =>
      this.request(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    );
  }

  async upload(file: File, privateUpload = false) {
    const fileData: {
      name: string;
      size: number;
      content_type?: string;
      visibility?: 'private';
    } = {
      name: file.name,
      size: file.size,
    };
    if (file.type) {
      fileData.content_type = file.type;
    }

    if (privateUpload) {
      fileData.visibility = 'private';
    }

    try {
      const token = await this.getToken();
      const response = await this.request(this.getSignedFormURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fileData),
      });
      const formURL = response.form.url;
      const formFields = response.form.fields;
      const { id, name, size, url } = response.asset;

      const formData = new FormData();
      Object.keys(formFields).forEach(key => formData.append(key, formFields[key]));
      formData.append('file', file, file.name);

      await this.request(formURL, { method: 'POST', body: formData });

      if (this.shouldConfirmUpload) {
        await this.confirmRequest(id);
      }

      const asset = { id, name, size, displayURL: url, url, path: url };
      return { success: true, asset };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
