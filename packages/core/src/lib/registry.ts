import { oneLine } from 'common-tags';
import cloneDeep from 'lodash/cloneDeep';

import type {
  AdditionalLink,
  AuthorData,
  BackendClass,
  BackendInitializer,
  BackendInitializerOptions,
  BaseField,
  ChangeEventListener,
  Collection,
  Config,
  CustomIcon,
  Entry,
  EntryData,
  EventData,
  EventListener,
  FieldPreviewComponent,
  LocalePhrasesRoot,
  LoginEventListener,
  LogoutEventListener,
  MountedEventListener,
  ObjectValue,
  PostSaveEventListener,
  PreSaveEventListener,
  PreviewStyle,
  PreviewStyleOptions,
  ShortcodeConfig,
  TemplatePreviewCardComponent,
  TemplatePreviewComponent,
  UnknownField,
  Widget,
  WidgetOptions,
  WidgetParam,
  WidgetValueSerializer,
} from '../interface';

export const allowedEvents = [
  'mounted',
  'login',
  'logout',
  'preSave',
  'postSave',
  'change',
] as const;
export type AllowedEvent = (typeof allowedEvents)[number];

type EventHandlerRegistry = {
  preSave: Record<
    string,
    PreSaveEventListener['handler'][] | Record<string, PreSaveEventListener['handler'][]>
  >;
  postSave: Record<
    string,
    PostSaveEventListener['handler'][] | Record<string, PostSaveEventListener['handler'][]>
  >;
  mounted: MountedEventListener['handler'][];
  login: LoginEventListener['handler'][];
  logout: LogoutEventListener['handler'][];
  change: Record<
    string,
    Record<
      string,
      ChangeEventListener['handler'][] | Record<string, ChangeEventListener['handler'][]>
    >
  >;
};

const eventHandlers = allowedEvents.reduce((acc, e) => {
  switch (e) {
    case 'preSave':
    case 'postSave':
    case 'change':
      acc[e] = {};
      break;
    default:
      acc[e] = [];
      break;
  }

  return acc;
}, {} as EventHandlerRegistry);

interface CardPreviews {
  component: TemplatePreviewCardComponent<ObjectValue>;
  getHeight?: (data: { collection: Collection; entry: Entry }) => number;
}

interface Registry {
  backends: Record<string, BackendInitializer>;
  templates: Record<string, TemplatePreviewComponent<ObjectValue>>;
  cards: Record<string, CardPreviews>;
  fieldPreviews: Record<string, Record<string, FieldPreviewComponent>>;
  widgets: Record<string, Widget>;
  icons: Record<string, CustomIcon>;
  additionalLinks: Record<string, AdditionalLink>;
  widgetValueSerializers: Record<string, WidgetValueSerializer>;
  locales: Record<string, LocalePhrasesRoot>;
  eventHandlers: EventHandlerRegistry;
  previewStyles: PreviewStyle[];

  /** Markdown editor */
  shortcodes: Record<string, ShortcodeConfig>;
}

/**
 * Global Registry Object
 */
const registry: Registry = {
  backends: {},
  templates: {},
  cards: {},
  fieldPreviews: {},
  widgets: {},
  icons: {},
  additionalLinks: {},
  widgetValueSerializers: {},
  locales: {},
  eventHandlers,
  previewStyles: [],
  shortcodes: {},
};

export default {
  registerPreviewTemplate,
  getPreviewTemplate,
  registerPreviewCard,
  getPreviewCard,
  registerFieldPreview,
  getFieldPreview,
  registerWidget,
  getWidget,
  getWidgets,
  resolveWidget,
  registerWidgetValueSerializer,
  getWidgetValueSerializer,
  registerBackend,
  getBackend,
  registerLocale,
  getLocale,
  registerEventListener,
  removeEventListener,
  getEventListeners,
  invokeEvent,
  registerIcon,
  getIcon,
  registerAdditionalLink,
  getAdditionalLinks,
  registerPreviewStyle,
  getPreviewStyles,
  registerShortcode,
  getShortcode,
  getShortcodes,
};

/**
 * Preview Styles
 *
 * Valid options:
 *  - raw {boolean} if `true`, `style` value is expected to be a CSS string
 */
export function registerPreviewStyle(style: string, { raw = false }: PreviewStyleOptions = {}) {
  registry.previewStyles.push({ value: style, raw });
}

export function getPreviewStyles() {
  return registry.previewStyles;
}

/**
 * Preview Templates
 */
export function registerPreviewTemplate<T, EF extends BaseField = UnknownField>(
  name: string,
  component: TemplatePreviewComponent<T, EF>,
) {
  registry.templates[name] = component as TemplatePreviewComponent<ObjectValue>;
}

export function getPreviewTemplate(name: string): TemplatePreviewComponent<ObjectValue> | null {
  return registry.templates[name] ?? null;
}

/**
 * Preview Cards
 */
export function registerPreviewCard<T, EF extends BaseField = UnknownField>(
  name: string,
  component: TemplatePreviewCardComponent<T, EF>,
  getHeight?: () => number,
) {
  registry.cards[name] = {
    component: component as TemplatePreviewCardComponent<ObjectValue>,
    getHeight,
  };
}

export function getPreviewCard(name: string): CardPreviews | null {
  return registry.cards[name] ?? null;
}

/**
 * Field Previews
 */
export function registerFieldPreview<T, F extends BaseField = UnknownField>(
  collectionName: string,
  fieldName: string,
  component: FieldPreviewComponent<T, F>,
) {
  if (!(collectionName in registry.fieldPreviews)) {
    registry.fieldPreviews[collectionName] = {};
  }
  registry.fieldPreviews[collectionName][fieldName] = component as FieldPreviewComponent;
}

export function getFieldPreview(
  collectionName: string,
  fieldName: string,
): FieldPreviewComponent | null {
  return registry.fieldPreviews[collectionName]?.[fieldName] ?? null;
}

/**
 * Editor Widgets
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerWidget(widgets: WidgetParam<any, any>[]): void;
export function registerWidget(widget: WidgetParam): void;
export function registerWidget<T = unknown, F extends BaseField = UnknownField>(
  name: string,
  control: string | Widget<T, F>['control'],
  preview?: Widget<T, F>['preview'],
  options?: WidgetOptions<T, F>,
): void;
export function registerWidget<T = unknown, F extends BaseField = UnknownField>(
  nameOrWidgetOrWidgets: string | WidgetParam<T, F> | WidgetParam[],
  control?: string | Widget<T, F>['control'],
  preview?: Widget<T, F>['preview'],
  {
    schema,
    validator = () => false,
    getValidValue = (value: T | null | undefined) => value,
    getDefaultValue,
  }: WidgetOptions<T, F> = {},
): void {
  if (Array.isArray(nameOrWidgetOrWidgets)) {
    nameOrWidgetOrWidgets.forEach(widget => {
      if (typeof widget !== 'object') {
        console.error(`Cannot register widget: ${widget}`);
      } else {
        registerWidget(widget);
      }
    });
  } else if (typeof nameOrWidgetOrWidgets === 'string') {
    // A registered widget control can be reused by a new widget, allowing
    // multiple copies with different previews.
    const newControl = (
      typeof control === 'string' ? registry.widgets[control]?.control : control
    ) as Widget['control'];
    if (newControl) {
      registry.widgets[nameOrWidgetOrWidgets] = {
        control: newControl,
        preview: preview as Widget['preview'],
        validator: validator as Widget['validator'],
        getValidValue: getValidValue as Widget['getValidValue'],
        getDefaultValue: getDefaultValue as Widget['getDefaultValue'],
        schema,
      };
    }
  } else if (typeof nameOrWidgetOrWidgets === 'object') {
    const {
      name: widgetName,
      controlComponent: control,
      previewComponent: preview,
      options: {
        validator = () => false,
        getValidValue = (value: T | undefined | null) => value,
        getDefaultValue,
        schema,
      } = {},
    } = nameOrWidgetOrWidgets;
    if (registry.widgets[widgetName]) {
      console.warn(oneLine`
        [StaticCMS] Multiple widgets registered with name "${widgetName}". Only the last widget registered with
        this name will be used.
      `);
    }
    if (!control) {
      throw Error(`Widget "${widgetName}" registered without \`controlComponent\`.`);
    }
    registry.widgets[widgetName] = {
      control,
      preview,
      validator,
      getValidValue,
      getDefaultValue,
      schema,
    } as unknown as Widget;
  } else {
    console.error('`registerWidget` failed, called with incorrect arguments.');
  }
}

export function getWidget<T = unknown, EF extends BaseField = UnknownField>(
  name: string,
): Widget<T, EF> {
  return registry.widgets[name] as unknown as Widget<T, EF>;
}

export function getWidgets(): ({
  name: string;
} & Widget<unknown>)[] {
  return Object.entries(registry.widgets).map(([name, widget]: [string, Widget<unknown>]) => ({
    name,
    ...widget,
  }));
}

export function resolveWidget<T = unknown, EF extends BaseField = UnknownField>(
  name?: string,
): Widget<T, EF> {
  return getWidget(name || 'string') || getWidget('unknown');
}

/**
 * Widget Serializers
 */
export function registerWidgetValueSerializer(
  widgetName: string,
  serializer: WidgetValueSerializer,
) {
  registry.widgetValueSerializers[widgetName] = serializer;
}

export function getWidgetValueSerializer(widgetName: string): WidgetValueSerializer | undefined {
  return registry.widgetValueSerializers[widgetName];
}

/**
 * Backends
 */
export function registerBackend<
  T extends { new (config: Config, options: BackendInitializerOptions): BackendClass },
>(name: string, BackendClass: T) {
  if (!name || !BackendClass) {
    console.error(
      "Backend parameters invalid. example: CMS.registerBackend('myBackend', BackendClass)",
    );
  } else if (registry.backends[name]) {
    console.error(`Backend [${name}] already registered. Please choose a different name.`);
  } else {
    registry.backends[name] = {
      init: (config: Config, options: BackendInitializerOptions) =>
        new BackendClass(config, options),
    };
  }
}

export function getBackend<EF extends BaseField = UnknownField>(
  name: string,
): BackendInitializer<EF> {
  return registry.backends[name] as unknown as BackendInitializer<EF>;
}

/**
 * Event Handlers
 */
function validateEventName(name: AllowedEvent) {
  if (!allowedEvents.includes(name)) {
    throw new Error(`Invalid event name '${name}'`);
  }
}

export function getEventListeners(options: {
  name: AllowedEvent;
  collection?: string;
  field?: string;
}) {
  const { name } = options;

  validateEventName(name);

  if (name === 'change') {
    if (!options.field || !options.collection) {
      return [];
    }

    return (registry.eventHandlers[name][options.collection] ?? {})[options.field] ?? [];
  }

  if (name === 'preSave' || name === 'postSave') {
    if (!options.collection) {
      return [];
    }

    return registry.eventHandlers[name][options.collection] ?? [];
  }

  return [...registry.eventHandlers[name]];
}

export function registerEventListener(listener: EventListener) {
  const { name, handler } = listener;
  validateEventName(name);

  if (name === 'change') {
    const collection = listener.collection;
    const file = listener.file;
    const field = listener.field;

    if (!(collection in registry.eventHandlers[name])) {
      registry.eventHandlers[name][collection] = {};
    }

    if (file) {
      if (!(file in registry.eventHandlers[name][collection])) {
        registry.eventHandlers[name][collection][file] = {};
      }

      if (Array.isArray(registry.eventHandlers[name][collection][file])) {
        return;
      }

      if (!(field in registry.eventHandlers[name][collection][file])) {
        (
          registry.eventHandlers[name][collection][file] as Record<
            string,
            ChangeEventListener['handler'][]
          >
        )[field] = [];
      }

      (
        registry.eventHandlers[name][collection][file] as Record<
          string,
          ChangeEventListener['handler'][]
        >
      )[field].push(handler);
      return;
    }

    if (!(field in registry.eventHandlers[name][collection])) {
      registry.eventHandlers[name][collection][field] = [];
    }

    if (!Array.isArray(registry.eventHandlers[name][collection][field])) {
      return;
    }

    (registry.eventHandlers[name][collection][field] as ChangeEventListener['handler'][]).push(
      handler,
    );
    return;
  }

  if (name === 'preSave' || name === 'postSave') {
    const collection = listener.collection;
    const file = listener.file;

    if (file) {
      if (!(collection in registry.eventHandlers[name])) {
        registry.eventHandlers[name][collection] = {};
      }

      if (!(file in registry.eventHandlers[name][collection])) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (registry.eventHandlers[name][collection] as Record<string, any[]>)[file] = [];
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (registry.eventHandlers[name][collection] as Record<string, any[]>)[file].push(handler);
      return;
    }

    if (!(collection in registry.eventHandlers[name])) {
      registry.eventHandlers[name][collection] = [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (registry.eventHandlers[name][collection] as any[]).push(handler);
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registry.eventHandlers[name].push(handler as any);
}

export async function invokeEvent(event: { name: 'login'; data: AuthorData }): Promise<void>;
export async function invokeEvent(event: { name: 'logout' }): Promise<void>;
export async function invokeEvent(event: {
  name: 'preSave';
  data: EventData;
  collection: string;
  file?: string;
}): Promise<EntryData>;
export async function invokeEvent(event: {
  name: 'postSave';
  data: EventData;
  collection: string;
  file?: string;
}): Promise<void>;
export async function invokeEvent(event: { name: 'mounted' }): Promise<void>;
export async function invokeEvent(event: {
  name: 'change';
  data: EntryData | undefined;
  collection: string;
  file?: string;
  field: string;
}): Promise<EntryData>;
export async function invokeEvent(event: {
  name: AllowedEvent;
  data?: EventData | EntryData | AuthorData;
  collection?: string;
  file?: string;
  field?: string;
}): Promise<void | EntryData> {
  const { name, data, collection, field } = event;

  validateEventName(name);

  if (name === 'mounted' || name === 'logout') {
    console.info(`[StaticCMS] Firing ${name} event`);
    const handlers = registry.eventHandlers[name];
    for (const handler of handlers) {
      handler();
    }

    return;
  }

  if (name === 'login') {
    console.info('[StaticCMS] Firing login event', data);
    const handlers = registry.eventHandlers[name];
    for (const handler of handlers) {
      handler({ author: data as AuthorData });
    }

    return;
  }

  if (name === 'postSave') {
    if (!collection) {
      return;
    }

    console.info(
      `[StaticCMS] Firing post save event for${
        event.file ? ` "${event.file}" file in` : ''
      } "${collection}" collection`,
      data,
    );
    const handlers = registry.eventHandlers[name][collection];

    let finalHandlers: PostSaveEventListener['handler'][];
    if (event.file && !Array.isArray(handlers)) {
      finalHandlers =
        (
          registry.eventHandlers[name][collection] as Record<
            string,
            PostSaveEventListener['handler'][]
          >
        )[event.file] ?? [];
    } else if (Array.isArray(handlers)) {
      finalHandlers = handlers ?? [];
    } else {
      finalHandlers = [];
    }

    for (const handler of finalHandlers) {
      handler({ data: data as EventData, collection });
    }

    return;
  }

  if (name === 'change') {
    if (!collection || !field || !data) {
      return;
    }

    let _data = cloneDeep(data as EntryData);
    console.info(
      `[StaticCMS] Firing change event for field "${field}" for${
        event.file ? ` "${event.file}" file in` : ''
      } "${collection}" collection, new value:`,
      data,
    );
    const collectionHandlers = registry.eventHandlers[name][collection] ?? {};

    let finalHandlers: Record<string, ChangeEventListener['handler'][]>;
    if (
      event.file &&
      event.file in collectionHandlers &&
      !Array.isArray(collectionHandlers[event.file])
    ) {
      finalHandlers =
        (collectionHandlers as Record<string, Record<string, ChangeEventListener['handler'][]>>)[
          event.file
        ] ?? {};
    } else if (Array.isArray(collectionHandlers[field])) {
      finalHandlers = collectionHandlers as Record<string, ChangeEventListener['handler'][]>;
    } else {
      finalHandlers = {};
    }

    const handlers = finalHandlers[field] ?? [];

    for (const handler of handlers) {
      const result = await handler({ data: _data, collection, field });
      if (_data !== undefined && result) {
        _data = result;
      }
    }

    return _data;
  }

  if (!collection) {
    return;
  }

  let _data = cloneDeep(data as EventData);
  console.info(
    `[StaticCMS] Firing pre save event for${
      event.file ? ` "${event.file}" file in` : ''
    } "${collection}" collection`,
    data,
  );
  const handlers = registry.eventHandlers[name][collection] ?? [];

  let finalHandlers: PreSaveEventListener['handler'][];
  if (event.file && !Array.isArray(handlers)) {
    finalHandlers =
      (
        registry.eventHandlers[name][collection] as Record<
          string,
          PreSaveEventListener['handler'][]
        >
      )[event.file] ?? [];
  } else if (Array.isArray(handlers)) {
    finalHandlers = handlers ?? [];
  } else {
    finalHandlers = [];
  }

  for (const handler of finalHandlers) {
    const result = await handler({ data: _data, collection });
    if (_data !== undefined && result !== undefined) {
      const entry = {
        ..._data.entry,
        data: result,
      } as Entry;
      _data = { ..._data, entry };
    }
  }

  return _data.entry.data;
}

export function removeEventListener(listener: EventListener) {
  const { name, handler } = listener;

  validateEventName(name);
  if (name === 'change') {
    const collection = listener.collection;
    const file = listener.file;
    const field = listener.field;

    if (!(collection in registry.eventHandlers[name])) {
      registry.eventHandlers[name][collection] = {};
    }

    if (file) {
      if (!(file in registry.eventHandlers[name][collection])) {
        registry.eventHandlers[name][collection][file] = {};
      }

      if (!(field in registry.eventHandlers[name][collection][file])) {
        (
          registry.eventHandlers[name][collection][file] as Record<
            string,
            ChangeEventListener['handler'][]
          >
        )[field] = [];
      }

      (
        registry.eventHandlers[name][collection][file] as Record<
          string,
          ChangeEventListener['handler'][]
        >
      )[field].filter(item => item !== handler);

      return;
    }

    if (!(field in registry.eventHandlers[name][collection])) {
      registry.eventHandlers[name][collection][field] = [];
    }

    if (!Array.isArray(registry.eventHandlers[name][collection][field])) {
      return;
    }

    (registry.eventHandlers[name][collection][field] as ChangeEventListener['handler'][]).filter(
      item => item !== handler,
    );
    return;
  }

  if (name === 'preSave' || name === 'postSave') {
    const collection = listener.collection;
    const file = listener.file;

    if (file) {
      if (!(collection in registry.eventHandlers[name])) {
        registry.eventHandlers[name][collection] = {};
      }

      if (!(file in registry.eventHandlers[name][collection])) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (registry.eventHandlers[name][collection] as Record<string, any[]>)[file] = [];
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (registry.eventHandlers[name][collection] as Record<string, any[]>)[file].filter(
        item => item !== handler,
      );
      return;
    }

    if (!(collection in registry.eventHandlers[name])) {
      registry.eventHandlers[name][collection] = [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (registry.eventHandlers[name][collection] as any[]).filter(item => item !== handler);
    return;
  }

  registry.eventHandlers[name] = registry.eventHandlers[name].filter(
    item => item !== handler,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any;
}

/**
 * Locales
 */
export function registerLocale(locale: string, phrases: LocalePhrasesRoot) {
  if (!locale || !phrases) {
    console.error("Locale parameters invalid. example: CMS.registerLocale('locale', phrases)");
  } else {
    registry.locales[locale] = phrases;
  }
}

export function getLocale(locale: string): LocalePhrasesRoot | undefined {
  return registry.locales[locale];
}

/**
 * Icons
 */
export function registerIcon(name: string, icon: CustomIcon) {
  registry.icons[name] = icon;
}

export function getIcon(name: string): CustomIcon | null {
  return registry.icons[name] ?? null;
}

/**
 * Additional Links
 */
export function registerAdditionalLink(link: AdditionalLink) {
  registry.additionalLinks[link.id] = link;
}

export function getAdditionalLinks(): Record<string, AdditionalLink> {
  return registry.additionalLinks;
}

export function getAdditionalLink(id: string): AdditionalLink | undefined {
  return registry.additionalLinks[id];
}

/**
 * Markdown editor shortcodes
 */
export function registerShortcode<P = {}>(name: string, config: ShortcodeConfig<P>) {
  if (registry.backends[name]) {
    console.error(`Shortcode [${name}] already registered. Please choose a different name.`);
    return;
  }
  registry.shortcodes[name] = config as unknown as ShortcodeConfig;
}

export function getShortcode(name: string): ShortcodeConfig {
  return registry.shortcodes[name];
}

export function getShortcodes(): Record<string, ShortcodeConfig> {
  return registry.shortcodes;
}
