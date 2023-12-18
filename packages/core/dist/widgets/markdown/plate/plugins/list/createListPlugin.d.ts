import type { MdValue } from '@staticcms/markdown';
import type { PlateEditor, PlatePlugin } from '@udecode/plate';
import type { ListPlugin } from '@udecode/plate-list';
export declare const ELEMENT_UL = "ul";
export declare const ELEMENT_OL = "ol";
export declare const ELEMENT_LI = "li";
export declare const ELEMENT_LIC = "lic";
export type MdListPlugin = PlatePlugin<ListPlugin, MdValue, PlateEditor<MdValue>>;
/**
 * Enables support for bulleted, numbered and to-do lists.
 */
declare const createListPlugin: <OP = ListPlugin, OV extends import("@udecode/plate").Value = MdValue, OE extends PlateEditor<OV> = PlateEditor<OV>>(override?: Partial<PlatePlugin<import("@udecode/plate").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate").OverrideByKey<OV, OE> | undefined) => PlatePlugin<import("@udecode/plate").NoInfer<OP>, OV, OE>;
export default createListPlugin;
