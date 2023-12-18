import type { AutoformatBlockRule } from '@udecode/plate';
import type { MdEditor, MdValue } from '@staticcms/markdown';
export declare const preFormat: AutoformatBlockRule<MdValue, MdEditor>['preFormat'];
export declare const format: (editor: MdEditor, customFormatting: any) => void;
export declare const formatList: (editor: MdEditor, elementType: string) => void;
export declare const formatText: (editor: MdEditor, text: string) => void;
