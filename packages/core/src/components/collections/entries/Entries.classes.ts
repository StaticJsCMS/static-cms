import { generateClassNames } from '@staticcms/core/lib/util/theming.util';

const entriesClasses = generateClassNames('Entries', [
  'root',
  'group',
  'group-content-wrapper',
  'group-content',
  'group-button',
  'entry-listing',
  'entry-listing-loading',
  'entry-listing-grid',
  'entry-listing-grid-container',
  'entry-listing-cards',
  'entry-listing-cards-grid-wrapper',
  'entry-listing-cards-grid',
  'entry-listing-table',
  'entry-listing-table-content',
  'entry-listing-table-row',
  'entry-listing-local-backup',
]);

export default entriesClasses;
