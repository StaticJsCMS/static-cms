import { registerWidget } from '@staticcms/core/lib/registry';
import UnknownControl from './Unknown/UnknownControl';
import UnknownPreview from './Unknown/UnknownPreview';

registerWidget('unknown', UnknownControl, UnknownPreview);
