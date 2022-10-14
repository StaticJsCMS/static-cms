import { oneLine } from 'common-tags';

import EditorComponent from '../valueObjects/EditorComponent';

import type { Pluggable } from 'unified';
import type {
  AdditionalLink,
  BackendClass,
  BackendInitializer,
  BackendInitializerOptions,
  Config,
  EventListener,
  Field,
  CustomIcon,
  LocalePhrasesRoot,
  MediaLibraryExternalLibrary,
  MediaLibraryOptions,
  TemplatePreviewComponent,
  WidgetParam,
  WidgetValueSerializer,
  EditorComponentOptions,
  Entry,
  EventData,
  Widget,
  WidgetOptions,
} from '../interface';

export const allowedEvents = ['prePublish', 'postPublish', 'preSave', 'postSave'] as const;
export type AllowedEvent = typeof allowedEvents[number];

const eventHandlers = allowedEvents.reduce((acc, e) => {
  acc[e] = [];
  return acc;
}, {} as Record<AllowedEvent, { handler: EventListener['handler']; options: Record<string, unknown> }[]>);

interface Registry {
  backends: Record<string, BackendInitializer>;
  templates: Record<string, TemplatePreviewComponent>;
  widgets: Record<string, Widget>;
  icons: Record<string, CustomIcon>;
  additionalLinks: Record<string, AdditionalLink>;
  editorComponents: Record<string, EditorComponentOptions>;
  remarkPlugins: Pluggable[];
  widgetValueSerializers: Record<string, WidgetValueSerializer>;
  mediaLibraries: (MediaLibraryExternalLibrary & { options: MediaLibraryOptions })[];
  locales: Record<string, LocalePhrasesRoot>;
  eventHandlers: typeof eventHandlers;
}

/**
 * Global Registry Object
 */
const registry: Registry = {
  backends: {},
  templates: {},
  widgets: {},
  icons: {},
  additionalLinks: {},
  editorComponents: {},
  remarkPlugins: [],
  widgetValueSerializers: {},
  mediaLibraries: [],
  locales: {},
  eventHandlers,
};

export default {
  registerPreviewTemplate,
  getPreviewTemplate,
  registerWidget,
  getWidget,
  getWidgets,
  resolveWidget,
  registerEditorComponent,
  getEditorComponents,
  registerRemarkPlugin,
  getRemarkPlugins,
  registerWidgetValueSerializer,
  getWidgetValueSerializer,
  registerBackend,
  getBackend,
  registerMediaLibrary,
  getMediaLibrary,
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
};

/**
 * Preview Templates
 */
export function registerPreviewTemplate(name: string, component: TemplatePreviewComponent) {
  registry.templates[name] = component;
}

export function getPreviewTemplate(name: string): TemplatePreviewComponent {
  return registry.templates[name];
}

/**
 * Editor Widgets
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerWidget(widgets: WidgetParam<any, any>[]): void;
export function registerWidget(widget: WidgetParam): void;
export function registerWidget<T = unknown>(
  name: string,
  control: string | Widget<T>['control'],
  preview: Widget<T>['preview'],
  options?: WidgetOptions,
): void;
export function registerWidget<T = unknown>(
  name: string | WidgetParam<T> | WidgetParam[],
  control?: string | Widget<T>['control'],
  preview?: Widget<T>['preview'],
  { schema, validator, getValidValue }: WidgetOptions = {},
): void {
  if (Array.isArray(name)) {
    name.forEach(widget => {
      if (typeof widget !== 'object') {
        console.error(`Cannot register widget: ${widget}`);
      } else {
        registerWidget(widget);
      }
    });
  } else if (typeof name === 'string') {
    // A registered widget control can be reused by a new widget, allowing
    // multiple copies with different previews.
    const newControl = (
      typeof control === 'string' ? registry.widgets[control]?.control : control
    ) as Widget['control'];
    if (newControl) {
      registry.widgets[name] = {
        control: newControl,
        preview: preview as Widget['preview'],
        validator: validator as Widget['validator'],
        getValidValue: getValidValue as Widget['getValidValue'],
        schema,
      };
    }
  } else if (typeof name === 'object') {
    const {
      name: widgetName,
      controlComponent: control,
      previewComponent: preview,
      options: {
        validator = () => true,
        getValidValue = (value: T | undefined | null) => value,
        schema,
        allowMapValue,
        globalStyles,
      } = {},
    } = name;
    if (registry.widgets[widgetName]) {
      console.warn(oneLine`
        Multiple widgets registered with name "${widgetName}". Only the last widget registered with
        this name will be used.
      `);
    }
    if (!control) {
      throw Error(`Widget "${widgetName}" registered without \`controlComponent\`.`);
    }
    registry.widgets[widgetName] = {
      control: control as Widget['control'],
      preview: preview as Widget['preview'],
      validator: validator as Widget['validator'],
      getValidValue: getValidValue as Widget['getValidValue'],
      schema,
      globalStyles,
      allowMapValue,
    };
  } else {
    console.error('`registerWidget` failed, called with incorrect arguments.');
  }
}

export function getWidget<T = unknown, F extends Field = Field>(name: string): Widget<T, F> {
  return registry.widgets[name] as unknown as Widget<T, F>;
}

export function getWidgets(): ({
  name: string;
} & Widget<unknown>)[] {
  return Object.entries(registry.widgets).map(([name, widget]: [string, Widget<unknown>]) => ({
    name,
    ...widget,
  }));
}

export function resolveWidget<T = unknown, F extends Field = Field>(name?: string): Widget<T, F> {
  return getWidget(name || 'string') || getWidget('unknown');
}

/**
 * Markdown Editor Custom Components
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerEditorComponent(component: EditorComponentOptions<any>) {
  const plugin = EditorComponent(component);
  if ('type' in plugin && plugin.type === 'code-block') {
    const codeBlock = Object.values(registry.editorComponents).find(
      c => 'type' in c && c.type === 'code-block',
    );

    if (codeBlock) {
      console.warn(oneLine`
        Only one editor component of type "code-block" may be registered. Previously registered code
        block component(s) will be overwritten.
      `);
    }
  }

  registry.editorComponents[plugin.id] = plugin;
}

export function getEditorComponents(): Record<string, EditorComponentOptions> {
  return registry.editorComponents;
}

/**
 * Remark plugins
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerRemarkPlugin(plugin: Pluggable) {
  registry.remarkPlugins.push(plugin);
}

export function getRemarkPlugins(): Pluggable[] {
  return registry.remarkPlugins;
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

export function getBackend(name: string): BackendInitializer {
  return registry.backends[name];
}

/**
 * Media Libraries
 */
export function registerMediaLibrary(
  mediaLibrary: MediaLibraryExternalLibrary,
  options: MediaLibraryOptions = {},
) {
  if (registry.mediaLibraries.find(ml => mediaLibrary.name === ml.name)) {
    throw new Error(`A media library named ${mediaLibrary.name} has already been registered.`);
  }
  registry.mediaLibraries.push({ ...mediaLibrary, options });
}

export function getMediaLibrary(
  name: string,
): (MediaLibraryExternalLibrary & { options: MediaLibraryOptions }) | undefined {
  return registry.mediaLibraries.find(ml => ml.name === name);
}

/**
 * Event Handlers
 */
function validateEventName(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!allowedEvents.includes(name as any)) {
    throw new Error(`Invalid event name '${name}'`);
  }
}

export function getEventListeners(name: AllowedEvent) {
  validateEventName(name);
  return [...registry.eventHandlers[name]];
}

export function registerEventListener(
  { name, handler }: EventListener,
  options: Record<string, unknown> = {},
) {
  validateEventName(name);
  registry.eventHandlers[name].push({ handler, options });
}

export async function invokeEvent({ name, data }: { name: AllowedEvent; data: EventData }) {
  validateEventName(name);
  const handlers = registry.eventHandlers[name];

  let _data = { ...data };
  for (const { handler, options } of handlers) {
    const result = await handler(_data, options);
    if (result !== undefined) {
      const entry = {
        ..._data.entry,
        data: result,
      } as Entry;
      _data = { ...data, entry };
    }
  }
  return _data.entry.data;
}

export function removeEventListener({ name, handler }: EventListener) {
  validateEventName(name);
  if (handler) {
    registry.eventHandlers[name] = registry.eventHandlers[name].filter(
      item => item.handler !== handler,
    );
  } else {
    registry.eventHandlers[name] = [];
  }
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
