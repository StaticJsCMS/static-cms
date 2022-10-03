import { oneLine } from 'common-tags';
import { produce } from 'immer';
import { Map } from 'immutable';

import EditorComponent from '../valueObjects/EditorComponent';

import type {
  AdditionalLink,
  CmsBackendClass,
  CmsBackendInitializer,
  CmsBackendInitializerOptions,
  CmsConfig,
  CmsEventListener,
  CmsIcon,
  CmsLocalePhrasesRoot,
  CmsMediaLibrary,
  CmsMediaLibraryOptions,
  EventData,
} from '../interface';

export const allowedEvents = ['prePublish', 'postPublish', 'preSave', 'postSave'] as const;
export type AllowedEvent = typeof allowedEvents[number];

const eventHandlers = allowedEvents.reduce((acc, e) => {
  acc[e] = [];
  return acc;
}, {} as Record<AllowedEvent, { handler: CmsEventListener['handler']; options: Record<string, unknown> }[]>);

interface Registry {
  backends: Record<string, CmsBackendInitializer>;
  templates: Record<string, any>;
  previewStyles: any[];
  widgets: Record<string, any>;
  icons: Record<string, CmsIcon>;
  additionalLinks: Record<string, AdditionalLink>;
  editorComponents: Map<string, any>;
  remarkPlugins: any[];
  widgetValueSerializers: Record<string, any>;
  mediaLibraries: (CmsMediaLibrary & { options: CmsMediaLibraryOptions })[];
  locales: Record<string, CmsLocalePhrasesRoot>;
  eventHandlers: typeof eventHandlers;
}

/**
 * Global Registry Object
 */
const registry: Registry = {
  backends: {},
  templates: {},
  previewStyles: [],
  widgets: {},
  icons: {},
  additionalLinks: {},
  editorComponents: Map(),
  remarkPlugins: [],
  widgetValueSerializers: {},
  mediaLibraries: [],
  locales: {},
  eventHandlers,
};

export default {
  registerPreviewStyle,
  getPreviewStyles,
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
 * Preview Styles
 *
 * Valid options:
 *  - raw {boolean} if `true`, `style` value is expected to be a CSS string
 */
export function registerPreviewStyle(style, opts) {
  registry.previewStyles.push({ ...opts, value: style });
}
export function getPreviewStyles() {
  return registry.previewStyles;
}

/**
 * Preview Templates
 */
export function registerPreviewTemplate(name, component) {
  registry.templates[name] = component;
}
export function getPreviewTemplate(name) {
  return registry.templates[name];
}

/**
 * Editor Widgets
 */
export function registerWidget(name, control, preview, validtor = () => {}, schema = {}) {
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
    const newControl = typeof control === 'string' ? registry.widgets[control].control : control;
    registry.widgets[name] = { control: newControl, preview, validtor, schema };
  } else if (typeof name === 'object') {
    const {
      name: widgetName,
      controlComponent: control,
      previewComponent: preview,
      validtor = () => {},
      schema = {},
      allowMapValue,
      globalStyles,
      ...options
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
      control,
      preview,
      validtor,
      schema,
      globalStyles,
      allowMapValue,
      ...options,
    };
  } else {
    console.error('`registerWidget` failed, called with incorrect arguments.');
  }
}
export function getWidget(name) {
  return registry.widgets[name];
}
export function getWidgets() {
  return produce(Object.entries(registry.widgets), draft => {
    return draft.map(([key, value]) => ({ name: key, ...value }));
  });
}
export function resolveWidget(name) {
  return getWidget(name || 'string') || getWidget('unknown');
}

/**
 * Markdown Editor Custom Components
 */
export function registerEditorComponent(component) {
  const plugin = EditorComponent(component);
  if (plugin.type === 'code-block') {
    const codeBlock = registry.editorComponents.find(c => c.type === 'code-block');

    if (codeBlock) {
      console.warn(oneLine`
        Only one editor component of type "code-block" may be registered. Previously registered code
        block component(s) will be overwritten.
      `);
      registry.editorComponents = registry.editorComponents.delete(codeBlock.id);
    }
  }

  registry.editorComponents = registry.editorComponents.set(plugin.id, plugin);
}
export function getEditorComponents() {
  return registry.editorComponents;
}

/**
 * Remark plugins
 */
/** @typedef {import('unified').Pluggable} RemarkPlugin */
/** @type {(plugin: RemarkPlugin) => void} */
export function registerRemarkPlugin(plugin) {
  registry.remarkPlugins.push(plugin);
}
/** @type {() => Array<RemarkPlugin>} */
export function getRemarkPlugins() {
  return registry.remarkPlugins;
}

/**
 * Widget Serializers
 */
export function registerWidgetValueSerializer(widgetName, serializer) {
  registry.widgetValueSerializers[widgetName] = serializer;
}

export function getWidgetValueSerializer(widgetName) {
  return registry.widgetValueSerializers[widgetName];
}

/**
 * Backends
 */
export function registerBackend<
  T extends { new (config: CmsConfig, options: CmsBackendInitializerOptions): CmsBackendClass },
>(name: string, BackendClass: T) {
  if (!name || !BackendClass) {
    console.error(
      "Backend parameters invalid. example: CMS.registerBackend('myBackend', BackendClass)",
    );
  } else if (registry.backends[name]) {
    console.error(`Backend [${name}] already registered. Please choose a different name.`);
  } else {
    registry.backends[name] = {
      init: (config: CmsConfig, options: CmsBackendInitializerOptions) =>
        new BackendClass(config, options),
    };
  }
}

export function getBackend(name: string): CmsBackendInitializer {
  return registry.backends[name];
}

/**
 * Media Libraries
 */
export function registerMediaLibrary(
  mediaLibrary: CmsMediaLibrary,
  options: CmsMediaLibraryOptions = {},
) {
  if (registry.mediaLibraries.find(ml => mediaLibrary.name === ml.name)) {
    throw new Error(`A media library named ${mediaLibrary.name} has already been registered.`);
  }
  registry.mediaLibraries.push({ ...mediaLibrary, options });
}

export function getMediaLibrary(
  name: string,
): (CmsMediaLibrary & { options: CmsMediaLibraryOptions }) | undefined {
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
  { name, handler }: CmsEventListener,
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
      const entry = _data.entry.set('data', result);
      _data = { ...data, entry };
    }
  }
  return _data.entry.data;
}

export function removeEventListener({ name, handler }: CmsEventListener) {
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
export function registerLocale(locale: string, phrases: CmsLocalePhrasesRoot) {
  if (!locale || !phrases) {
    console.error("Locale parameters invalid. example: CMS.registerLocale('locale', phrases)");
  } else {
    registry.locales[locale] = phrases;
  }
}

export function getLocale(locale: string): CmsLocalePhrasesRoot | undefined {
  return registry.locales[locale];
}

/**
 * Icons
 */
export function registerIcon(name: string, icon: CmsIcon) {
  registry.icons[name] = icon;
}

export function getIcon(name: string): CmsIcon | null {
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
