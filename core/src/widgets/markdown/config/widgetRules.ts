import type { WidgetRulesFactory } from '../../../interface';

const imageFilePattern = /(!)?\[([^\]]*)\]\(([^)]+)\)/;

const defaultWidgetRules: WidgetRulesFactory = ({ getAsset, field }) => [
  {
    rule: imageFilePattern,
    toDOM(text) {
      console.log('[MARKDOWN] hello');
      const rule = imageFilePattern;
      const matched = text.match(rule);

      if (matched) {
        console.log('[MARKDOWN] matched', matched);
        if (matched?.length === 4) {
          // Image
          const img = document.createElement('img');
          img.setAttribute('src', getAsset(matched[3] ?? '', field).url ?? matched[3]);
          img.setAttribute('style', 'width: 100%;');
          img.setAttribute('title', matched[2] ?? '');
          console.log('[MARKDOWN] img', img);
          return img;
        } else {
          // File
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('href', matched[2] ?? '');
          a.innerHTML = matched[1] ?? '';
          console.log('[MARKDOWN] a', a);
          return a;
        }
      }

      console.log('[MARKDOWN] missed', text);
      return document.createElement('div');
    },
  },
];

export default defaultWidgetRules;
