import type { WidgetRulesFactory } from '../../../interface';

const imageFilePattern = /(!)?\[([^\]]*)\]\(([^)]+)\)/;

const defaultWidgetRules: WidgetRulesFactory = ({ getAsset, field }) => [
  {
    rule: imageFilePattern,
    toDOM(text) {
      const rule = imageFilePattern;
      const matched = text.match(rule);

      if (matched) {
        if (matched?.length === 4) {
          // Image
          const img = document.createElement('img');
          img.setAttribute('src', getAsset(matched[3] ?? '', field).url);
          img.setAttribute('style', 'width: 100%;');
          img.innerHTML = matched[2] ?? '';
          return img;
        } else {
          // File
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('href', matched[2] ?? '');
          a.innerHTML = matched[1] ?? '';
          return a;
        }
      }

      return document.createElement('div');
    },
  },
];

export default defaultWidgetRules;
