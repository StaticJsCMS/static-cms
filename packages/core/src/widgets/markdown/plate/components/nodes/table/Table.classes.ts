import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

const widgetMarkdownTableClasses = generateClassNames('WidgetMarkdown_Table', [
  'root',
  'header',
  'body',
  'row',
  'header-cell',
  'body-cell',
]);

export default widgetMarkdownTableClasses;
