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
  CollectionWithDefaults,
  ConfigWithDefaults,
  CustomIcon,
  Entry,
  EntryData,
  EventData,
  EventListener,
  FieldPreviewComponent,
  LoginEventListener,
  LogoutEventListener,
  MountedEventListener,
  ObjectValue,
  PartialTheme,
  PostPublishEventListener,
  PostSaveEventListener,
  PrePublishEventListener,
  PreSaveEventListener,
  PreviewStyle,
  PreviewStyleOptions,
  ShortcodeConfig,
  TemplatePreviewCardComponent,
  TemplatePreviewComponent,
  Theme,
  UnknownField,
  ValueOrNestedValue,
  Widget,
  WidgetOptions,
  WidgetParam,
  WidgetValueSerializer,
} from '../interface';
import type { LocalePhrasesRoot } from '../locales/types';

export const allowedEvents = [
  'mounted',
  'login',
  'logout',
  'prePublish',
  'postPublish',
  'preSave',
  'postSave',
  'change',
] as const;
export type AllowedEvent = (typeof allowedEvents)[number];

export interface CollectionListener<T> {
  all: T[];
  collections: Record<string, T[]>;
  files: Record<string, Record<string, T[]>>;
}

export interface ChangeListener extends CollectionListener<ChangeEventListener['handler']> {
  collectionField: Record<string, Record<string, ChangeEventListener['handler'][]>>;
  fileField: Record<string, Record<string, Record<string, ChangeEventListener['handler'][]>>>;
}

export type EventHandlerRegistry = {
  prePublish: CollectionListener<PrePublishEventListener['handler']>;
  postPublish: CollectionListener<PostPublishEventListener['handler']>;
  preSave: CollectionListener<PreSaveEventListener['handler']>;
  postSave: CollectionListener<PostSaveEventListener['handler']>;
  mounted: MountedEventListener['handler'][];
  login: LoginEventListener['handler'][];
  logout: LogoutEventListener['handler'][];
  change: ChangeListener;
};

const eventHandlers = allowedEvents.reduce((acc, e) => {
  switch (e) {
    case 'prePublish':
    case 'postPublish':
    case 'preSave':
    case 'postSave':
      acc[e] = {
        all: [],
        collections: {},
        files: {},
      };
      break;
    case 'change':
      acc[e] = {
        all: [],
        collections: {},
        files: {},
        collectionField: {},
        fileField: {},
      };
      break;
    default:
      acc[e] = [];
      break;
  }

  return acc;
}, {} as EventHandlerRegistry);

interface CardPreviews {
  component: TemplatePreviewCardComponent<ObjectValue>;
  getHeight?: (data: { collection: CollectionWithDefaults; entry: Entry }) => number;
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

  /** Themes */
  themes: (Theme | PartialTheme)[];
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
  themes: [],
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
  registerTheme,
  getThemes,
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
    converters = {
      deserialize: (value: ValueOrNestedValue) => value as T | null | undefined,
      serialize: (value: T | null | undefined) => value as ValueOrNestedValue,
    },
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
        converters: converters as Widget['converters'],
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
        converters = {
          deserialize: (value: ValueOrNestedValue) => value as T | null | undefined,
          serialize: (value: T | null | undefined) => value as ValueOrNestedValue,
        },
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
      converters,
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
  T extends { new (config: ConfigWithDefaults, options: BackendInitializerOptions): BackendClass },
>(name: string, BackendClass: T) {
  if (!name || !BackendClass) {
    console.error(
      "Backend parameters invalid. example: CMS.registerBackend('myBackend', BackendClass)",
    );
  } else if (registry.backends[name]) {
    console.error(`Backend [${name}] already registered. Please choose a different name.`);
  } else {
    registry.backends[name] = {
      init: (config: ConfigWithDefaults, options: BackendInitializerOptions) =>
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

export function getEventListeners<T extends EventListener['handler']>(options: {
  name: AllowedEvent;
  collection?: string;
  file?: string;
  field?: string;
}): T[] {
  const { name, collection, file, field } = options;

  validateEventName(name);

  const handlers: T[] = [];

  if (name === 'change') {
    handlers.push(...(registry.eventHandlers[name].all as T[]));
    if (!collection) {
      return handlers;
    }

    handlers.push(...((registry.eventHandlers[name].collections[collection] ?? []) as T[]));
    if (!file && !field) {
      return handlers;
    }

    if (field) {
      handlers.push(
        ...((registry.eventHandlers[name].collectionField[collection]?.[field] ?? []) as T[]),
      );
    }
    if (!file) {
      return handlers;
    }

    handlers.push(...((registry.eventHandlers[name].files[collection]?.[file] ?? []) as T[]));
    if (!field) {
      return handlers;
    }

    handlers.push(
      ...((registry.eventHandlers[name].fileField[collection]?.[file]?.[field] ?? []) as T[]),
    );
    return handlers;
  }

  if (
    name === 'prePublish' ||
    name === 'postPublish' ||
    name === 'preSave' ||
    name === 'postSave'
  ) {
    handlers.push(...(registry.eventHandlers[name].all as T[]));
    if (!collection) {
      return handlers;
    }

    handlers.push(...((registry.eventHandlers[name].collections[collection] ?? []) as T[]));
    if (!file) {
      return handlers;
    }

    handlers.push(...((registry.eventHandlers[name].files[collection]?.[file] ?? []) as T[]));
    return handlers;
  }

  return [...registry.eventHandlers[name]] as T[];
}

export function registerEventListener(listener: EventListener) {
  const { name, handler } = listener;
  validateEventName(name);

  if (name === 'change') {
    const collection = listener.collection;
    const file = listener.file;
    const field = listener.field;

    if (!collection) {
      registry.eventHandlers[name].all.push(handler);
      return;
    }

    if (!(collection in registry.eventHandlers[name])) {
      registry.eventHandlers[name].collections[collection] = [];
      registry.eventHandlers[name].collectionField[collection] = {};
      registry.eventHandlers[name].files[collection] = {};
      registry.eventHandlers[name].fileField[collection] = {};
    }

    if (!file) {
      if (!field) {
        registry.eventHandlers[name].collections[collection].push(handler);
        return;
      }

      if (!(field in registry.eventHandlers[name].collectionField[collection])) {
        registry.eventHandlers[name].collectionField[collection][field] = [];
      }

      registry.eventHandlers[name].collectionField[collection][field].push(handler);
      return;
    }

    if (!field) {
      if (!(file in registry.eventHandlers[name].files[collection])) {
        registry.eventHandlers[name].files[collection][file] = [];
      }

      registry.eventHandlers[name].files[collection][file].push(handler);
      return;
    }

    if (!(file in registry.eventHandlers[name].fileField[collection])) {
      registry.eventHandlers[name].fileField[collection][file] = {};
    }

    if (!(field in registry.eventHandlers[name].fileField[collection][file])) {
      registry.eventHandlers[name].fileField[collection][file][field] = [];
    }

    registry.eventHandlers[name].fileField[collection][file][field].push(handler);
    return;
  }

  if (name === 'preSave') {
    const collection = listener.collection;
    const file = listener.file;

    if (!collection) {
      registry.eventHandlers[name].all.push(handler);
      return;
    }

    if (!(collection in registry.eventHandlers[name])) {
      registry.eventHandlers[name].collections[collection] = [];
      registry.eventHandlers[name].files[collection] = {};
    }

    if (!file) {
      registry.eventHandlers[name].collections[collection].push(handler);
      return;
    }

    if (!(file in registry.eventHandlers[name].files[collection])) {
      registry.eventHandlers[name].files[collection][file] = [];
    }

    registry.eventHandlers[name].files[collection][file].push(handler);
    return;
  }

  if (name === 'postSave' || name === 'prePublish' || name === 'postPublish') {
    const collection = listener.collection;
    const file = listener.file;

    if (!collection) {
      registry.eventHandlers[name].all.push(handler);
      return;
    }

    if (!(collection in registry.eventHandlers[name])) {
      registry.eventHandlers[name].collections[collection] = [];
      registry.eventHandlers[name].files[collection] = {};
    }

    if (!file) {
      registry.eventHandlers[name].collections[collection].push(handler);
      return;
    }

    if (!(file in registry.eventHandlers[name].files[collection])) {
      registry.eventHandlers[name].files[collection][file] = [];
    }

    registry.eventHandlers[name].files[collection][file].push(handler);
    return;
  }

  if (name === 'login') {
    registry.eventHandlers[name].push(handler);
    return;
  }

  registry.eventHandlers[name].push(handler);
}

export async function invokeEvent(event: { name: 'login'; data: AuthorData }): Promise<void>;
export async function invokeEvent(event: { name: 'logout' }): Promise<void>;
export async function invokeEvent(event: {
  name: 'prePublish';
  data: EventData;
  collection: string;
  file?: string;
}): Promise<void>;
export async function invokeEvent(event: {
  name: 'postPublish';
  data: EventData;
  collection: string;
  file?: string;
}): Promise<void>;
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
  fieldName: string;
  field: string;
}): Promise<EntryData>;
export async function invokeEvent(event: {
  name: AllowedEvent;
  data?: EventData | EntryData | AuthorData;
  collection?: string;
  file?: string;
  fieldName?: string;
  field?: string;
}): Promise<void | EntryData> {
  const { name, data, collection, file, fieldName, field } = event;

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

  if (name === 'postSave' || name === 'prePublish' || name === 'postPublish') {
    if (!collection) {
      return;
    }

    const handlers = getEventListeners<
      | PrePublishEventListener['handler']
      | PostPublishEventListener['handler']
      | PostSaveEventListener['handler']
    >({ name, collection, file });

    console.info(
      `[StaticCMS] Firing post save event for${
        file ? ` "${file}" file in` : ''
      } "${collection}" collection`,
      data,
    );

    for (const handler of handlers) {
      handler({ data: data as EventData, collection, file });
    }

    return;
  }

  if (name === 'change') {
    if (!collection || !field || !data) {
      return;
    }

    const handlers = getEventListeners<ChangeEventListener['handler']>({
      name,
      collection,
      file,
      field,
    });

    let _data = cloneDeep(data as EntryData);
    console.info(
      `[StaticCMS] Firing change event for field "${fieldName ?? field}" for${
        event.file ? ` "${event.file}" file in` : ''
      } "${collection}" collection`,
    );

    for (const handler of handlers) {
      const result = await handler({ data: _data, collection, file, field });
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

  const handlers = getEventListeners<PreSaveEventListener['handler']>({ name, collection, file });

  for (const handler of handlers) {
    const result = await handler({ data: _data, collection, file });
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

function filterEventListeners<T extends EventListener['handler']>(
  handlers: T[],
  handlerToRemove: T,
): T[] {
  return handlers.filter(item => item !== handlerToRemove);
}

export function removeEventListener(listener: EventListener) {
  const { name, handler } = listener;
  validateEventName(name);

  if (name === 'change') {
    const collection = listener.collection;
    const file = listener.file;
    const field = listener.field;

    if (!collection) {
      registry.eventHandlers[name].all = filterEventListeners(
        registry.eventHandlers[name].all,
        handler,
      );
      return;
    }

    if (!(collection in registry.eventHandlers[name])) {
      registry.eventHandlers[name].collections[collection] = [];
      registry.eventHandlers[name].collectionField[collection] = {};
      registry.eventHandlers[name].files[collection] = {};
      registry.eventHandlers[name].fileField[collection] = {};
    }

    if (!file) {
      if (!field) {
        registry.eventHandlers[name].collections[collection] = filterEventListeners(
          registry.eventHandlers[name].collections[collection],
          handler,
        );
        return;
      }

      if (!(field in registry.eventHandlers[name].collectionField[collection])) {
        registry.eventHandlers[name].collectionField[collection][field] = [];
      }

      registry.eventHandlers[name].collectionField[collection][field] = filterEventListeners(
        registry.eventHandlers[name].collectionField[collection][field],
        handler,
      );
      return;
    }

    if (!field) {
      if (!(file in registry.eventHandlers[name].files[collection])) {
        registry.eventHandlers[name].files[collection][file] = [];
      }

      registry.eventHandlers[name].files[collection][file] = filterEventListeners(
        registry.eventHandlers[name].files[collection][file],
        handler,
      );
      return;
    }

    if (!(file in registry.eventHandlers[name].fileField[collection])) {
      registry.eventHandlers[name].fileField[collection][file] = {};
    }

    if (!(field in registry.eventHandlers[name].fileField[collection][file])) {
      registry.eventHandlers[name].fileField[collection][file][field] = [];
    }

    registry.eventHandlers[name].fileField[collection][file][field] = filterEventListeners(
      registry.eventHandlers[name].fileField[collection][file][field],
      handler,
    );
    return;
  }

  if (name === 'preSave') {
    const collection = listener.collection;
    const file = listener.file;

    if (!collection) {
      registry.eventHandlers[name].all = filterEventListeners(
        registry.eventHandlers[name].all,
        handler,
      );
      return;
    }

    if (!(collection in registry.eventHandlers[name])) {
      registry.eventHandlers[name].collections[collection] = [];
      registry.eventHandlers[name].files[collection] = {};
    }

    if (!file) {
      registry.eventHandlers[name].collections[collection] = filterEventListeners(
        registry.eventHandlers[name].collections[collection],
        handler,
      );
      return;
    }

    if (!(file in registry.eventHandlers[name].files[collection])) {
      registry.eventHandlers[name].files[collection][file] = [];
    }

    registry.eventHandlers[name].files[collection][file] = filterEventListeners(
      registry.eventHandlers[name].files[collection][file],
      handler,
    );
    return;
  }

  if (name === 'postSave' || name === 'prePublish' || name === 'postPublish') {
    const collection = listener.collection;
    const file = listener.file;

    if (!collection) {
      registry.eventHandlers[name].all = filterEventListeners(
        registry.eventHandlers[name].all,
        handler,
      );
      return;
    }

    if (!(collection in registry.eventHandlers[name])) {
      registry.eventHandlers[name].collections[collection] = [];
      registry.eventHandlers[name].files[collection] = {};
    }

    if (!file) {
      registry.eventHandlers[name].collections[collection] = filterEventListeners(
        registry.eventHandlers[name].collections[collection],
        handler,
      );
      return;
    }

    if (!(file in registry.eventHandlers[name].files[collection])) {
      registry.eventHandlers[name].files[collection][file] = [];
    }

    registry.eventHandlers[name].files[collection][file] = filterEventListeners(
      registry.eventHandlers[name].files[collection][file],
      handler,
    );
    return;
  }

  if (name === 'login') {
    registry.eventHandlers[name] = filterEventListeners(registry.eventHandlers[name], handler);
    return;
  }

  registry.eventHandlers[name] = filterEventListeners(registry.eventHandlers[name], handler);
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
  if (registry.shortcodes[name]) {
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

/**
 * Markdown editor shortcodes
 */
export function registerTheme(theme: Theme | PartialTheme) {
  registry.themes.push(theme);
}

export function getThemes(): (Theme | PartialTheme)[] {
  return registry.themes;
}
