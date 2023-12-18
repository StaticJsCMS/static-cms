import type { AutoformatPlugin } from '@udecode/plate';
import type { MdEditor, MdPlatePlugin, MdValue } from '@staticcms/markdown';
declare const autoformatPlugin: Partial<MdPlatePlugin<AutoformatPlugin<MdValue, MdEditor>>>;
export default autoformatPlugin;
