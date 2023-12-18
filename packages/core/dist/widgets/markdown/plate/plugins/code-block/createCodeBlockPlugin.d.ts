import type { MdValue } from '@staticcms/markdown';
import type { CodeBlockPlugin, PlateEditor } from '@udecode/plate';
/**
 * Enables support for pre-formatted code blocks.
 */
declare const createCodeBlockPlugin: <OP = CodeBlockPlugin, OV extends import("@udecode/plate").Value = MdValue, OE extends PlateEditor<OV> = PlateEditor<OV>>(override?: Partial<import("@udecode/plate").PlatePlugin<import("@udecode/plate").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate").PlatePlugin<import("@udecode/plate").NoInfer<OP>, OV, OE>;
export default createCodeBlockPlugin;
