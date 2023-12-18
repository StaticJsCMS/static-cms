import type { Collection, Config, Entry, EntryData, Field, WidgetFor, WidgetsFor } from '@staticcms/core/interface';
export default function useWidgetsFor(config: Config | undefined, collection: Collection, fields: Field[], entry: Entry, data?: EntryData): {
    widgetFor: WidgetFor;
    widgetsFor: WidgetsFor;
};
