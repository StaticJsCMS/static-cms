import { useEffect, useState } from 'react';

import type { GetAssetFunction, MarkdownField } from '../../../interface';
import type AssetProxy from '../../../valueObjects/AssetProxy';

interface UseMediaProps {
  value: string | undefined | null;
  getAsset: GetAssetFunction<MarkdownField>;
  field: MarkdownField;
}

export class MediaHolder {
  private media: Record<string, AssetProxy> = {};

  public setBulkMedia(otherMedia: Record<string, AssetProxy>) {
    for (const [url, asset] of Object.entries(otherMedia)) {
      this.setMedia(url, asset);
    }
  }

  public setMedia(url: string, asset: AssetProxy) {
    this.media[url] = asset;
  }

  public getMedia(url: string) {
    return this.media[url];
  }
}

const useMedia = ({ value, getAsset, field }: UseMediaProps) => {
  const [media, setMedia] = useState<Record<string, AssetProxy>>({});

  useEffect(() => {
    if (!value) {
      return;
    }

    let alive = true;

    const getMedia = async () => {
      const regExp = /!\[[^\]()]*\]\(([^)]+)\)/g;
      let matches = regExp.exec(value);

      const mediaToLoad: string[] = [];
      while (matches && matches.length === 2) {
        mediaToLoad.push(matches[1]);
        matches = regExp.exec(value);
      }

      const uniqueMediaToLoad = mediaToLoad.filter(
        (value, index, self) => self.indexOf(value) === index && !(value in media),
      );

      for (const url of uniqueMediaToLoad) {
        const asset = await getAsset(url, field);
        if (!alive) {
          break;
        }

        setMedia(oldValue => ({
          ...oldValue,
          [url]: asset,
        }));
      }
    };

    getMedia();

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return media;
};

export default useMedia;
