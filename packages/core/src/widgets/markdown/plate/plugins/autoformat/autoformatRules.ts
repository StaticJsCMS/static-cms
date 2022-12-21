import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from '@udecode/plate';

import autoformatBlocks from './autoformatBlocks';
import autoformatLists from './autoformatLists';
import autoformatMarks from './autoformatMarks';

import type { MdAutoformatRule } from '@staticcms/markdown';

const autoformatRules: MdAutoformatRule[] = [
  ...autoformatBlocks,
  ...autoformatLists,
  ...autoformatMarks,
  ...(autoformatSmartQuotes as MdAutoformatRule[]),
  ...(autoformatPunctuation as MdAutoformatRule[]),
  ...(autoformatLegal as MdAutoformatRule[]),
  ...(autoformatLegalHtml as MdAutoformatRule[]),
  ...(autoformatArrow as MdAutoformatRule[]),
  ...(autoformatMath as MdAutoformatRule[]),
];

export default autoformatRules;
