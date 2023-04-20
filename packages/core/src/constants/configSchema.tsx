import AJV from 'ajv';
import select from 'ajv-keywords/dist/keywords/select';
import uniqueItemProperties from 'ajv-keywords/dist/keywords/uniqueItemProperties';
import instanceOf from 'ajv-keywords/dist/keywords/instanceof';
import prohibited from 'ajv-keywords/dist/keywords/prohibited';
import ajvErrors from 'ajv-errors';
import { v4 as uuid } from 'uuid';

import { formatExtensions, frontmatterFormats, extensionFormatters } from '../formats/formats';
import { getWidgets } from '../lib/registry';
import {
  I18N_FIELD_DUPLICATE,
  I18N_FIELD_NONE,
  I18N_FIELD_TRANSLATE,
  I18N_STRUCTURE_MULTIPLE_FILES,
  I18N_STRUCTURE_MULTIPLE_FOLDERS,
  I18N_STRUCTURE_SINGLE_FILE,
} from '../lib/i18n';

import type { ErrorObject } from 'ajv';
import type { Config } from '../interface';

const localeType = { type: 'string', minLength: 2, maxLength: 10, pattern: '^[a-zA-Z-_]+$' };

const i18n = {
  type: 'object',
  properties: {
    structure: {
      type: 'string',
      enum: [
        I18N_STRUCTURE_MULTIPLE_FILES,
        I18N_STRUCTURE_MULTIPLE_FOLDERS,
        I18N_STRUCTURE_SINGLE_FILE,
      ],
    },
    locales: {
      type: 'array',
      minItems: 2,
      items: localeType,
      uniqueItems: true,
    },
    defaultLocale: localeType,
  },
};

const i18nRoot = {
  ...i18n,
  required: ['structure', 'locales'],
};

const i18nCollection = {
  oneOf: [{ type: 'boolean' }, i18n],
};

const i18nField = {
  oneOf: [
    { type: 'boolean' },
    { type: 'string', enum: [I18N_FIELD_DUPLICATE, I18N_FIELD_NONE, I18N_FIELD_TRANSLATE] },
  ],
};

/**
 * Config for fields in both file and folder collections.
 */
function fieldsConfig() {
  const id = uuid();
  return {
    $id: `fields_${id}`,
    type: 'array',
    minItems: 1,
    items: {
      // ------- Each field: -------
      $id: `field_${id}`,
      type: 'object',
      properties: {
        name: { type: 'string' },
        label: { type: 'string' },
        widget: { type: 'string' },
        required: { type: 'boolean' },
        i18n: i18nField,
        hint: { type: 'string' },
        pattern: {
          type: 'array',
          minItems: 2,
          maxItems: 2,
          items: [{ oneOf: [{ type: 'string' }, { instanceof: 'RegExp' }] }, { type: 'string' }],
        },
        field: { $ref: `field_${id}` },
        fields: { $ref: `fields_${id}` },
        types: { $ref: `fields_${id}` },
      },
      select: { $data: '0/widget' },
      selectCases: {
        ...getWidgetSchemas(),
      },
      required: ['name'],
    },
    uniqueItemProperties: ['name'],
  };
}

const viewFilters = {
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    properties: {
      label: { type: 'string' },
      field: { type: 'string' },
      pattern: {
        oneOf: [
          { type: 'boolean' },
          {
            type: 'string',
          },
          {
            type: 'number',
          },
        ],
      },
    },
    required: ['label', 'field', 'pattern'],
  },
};

const viewGroups = {
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    properties: {
      label: { type: 'string' },
      field: { type: 'string' },
      pattern: { type: 'string' },
    },
    required: ['label', 'field'],
  },
};

/**
 * The schema had to be wrapped in a function to
 * fix a circular dependency problem for WebPack,
 * where the imports get resolved asynchronously.
 */
function getConfigSchema() {
  return {
    type: 'object',
    properties: {
      backend: {
        type: 'object',
        properties: {
          name: { type: 'string', examples: ['test-repo'] },
          repo: { type: 'string' },
          branch: { type: 'string' },
          api_root: { type: 'string' },
          site_domain: { type: 'string' },
          base_url: { type: 'string' },
          auth_endpoint: { type: 'string' },
          app_id: { type: 'string' },
          auth_type: {
            type: 'string',
            examples: ['implicit', 'pkce'],
            enum: ['implicit', 'pkce'],
          },
          proxy_url: { type: 'string' },
          large_media_url: { type: 'string' },
          login: { type: 'boolean' },
          identity_url: { type: 'string' },
          gateway_url: { type: 'string' },
          auth_scope: {
            type: 'string',
            examples: ['repo', 'public_repo'],
            enum: ['repo', 'public_repo'],
          },
          commit_messages: {
            type: 'object',
            properties: {
              create: { type: 'string' },
              update: { type: 'string' },
              delete: { type: 'string' },
              uploadMedia: { type: 'string' },
              deleteMedia: { type: 'string' },
            },
          },
          use_large_media_transforms_in_media_library: { type: 'boolean' },
        },
        required: ['name'],
      },
      collections: {
        type: 'array',
        minItems: 1,
        items: {
          // ------- Each collection: -------
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            icon: { type: 'string' },
            summary: { type: 'string' },
            summary_fields: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            filter: {
              type: 'object',
              properties: {
                value: { type: 'string' },
                field: { type: 'string' },
              },
              required: ['value', 'field'],
            },
            label_singular: { type: 'string' },
            label: { type: 'string' },
            sortable_fields: {
              type: 'object',
              properties: {
                default: {
                  type: 'object',
                  properties: {
                    field: {
                      type: 'string',
                    },
                    direction: {
                      type: 'string',
                    },
                  },
                  required: ['field'],
                },
                fields: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
              required: ['fields'],
            },
            view_filters: viewFilters,
            view_groups: viewGroups,
            i18n: i18nCollection,
            hide: { type: 'boolean' },
            editor: {
              type: 'object',
              properties: {
                preview: { type: 'boolean' },
                frame: { type: 'boolean' },
              },
            },
            identifier_field: { type: 'string' },
            path: { type: 'string' },
            extension: { type: 'string' },
            format: { type: 'string', enum: Object.keys(formatExtensions) },
            frontmatter_delimiter: {
              type: ['string', 'array'],
              minItems: 2,
              maxItems: 2,
              items: {
                type: 'string',
              },
            },
            slug: { type: 'string' },
            media_folder: { type: 'string' },
            public_folder: { type: 'string' },
            media_library: {
              type: 'object',
              properties: {
                max_file_size: { type: 'number' },
                folder_support: { type: 'boolean' },
              },
            },
            folder: { type: 'string' },
            fields: fieldsConfig(),
            create: { type: 'boolean' },
            delete: { type: 'boolean' },
            nested: {
              type: 'object',
              properties: {
                depth: { type: 'number', minimum: 1, maximum: 1000 },
                summary: { type: 'string' },
                path: {
                  type: 'object',
                  properties: {
                    label: { type: 'string' },
                    index_file: { type: 'string' },
                  },
                  required: ['index_file'],
                },
              },
              required: ['depth'],
            },
            files: {
              type: 'array',
              items: {
                // ------- Each file: -------
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  label: { type: 'string' },
                  file: { type: 'string' },
                  fields: fieldsConfig(),
                  label_singular: { type: 'string' },
                  description: { type: 'string' },
                  media_folder: { type: 'string' },
                  public_folder: { type: 'string' },
                  media_library: {
                    type: 'object',
                    properties: {
                      max_file_size: { type: 'number' },
                      folder_support: { type: 'boolean' },
                    },
                  },
                  i18n: i18nCollection,
                  editor: {
                    type: 'object',
                    properties: {
                      preview: { type: 'boolean' },
                      frame: { type: 'boolean' },
                    },
                  },
                },
                required: ['name', 'label', 'file', 'fields'],
              },
              uniqueItemProperties: ['name'],
            },
          },
          required: ['name', 'label'],
          oneOf: [{ required: ['files'] }, { required: ['folder', 'fields'] }],
          if: { required: ['extension'] },
          then: {
            // Cannot infer format from extension.
            if: {
              properties: {
                extension: { enum: Object.keys(extensionFormatters) },
              },
            },
            else: { required: ['format'] },
          },
          dependencies: {
            frontmatter_delimiter: {
              properties: {
                format: { enum: frontmatterFormats },
              },
              required: ['format'],
            },
          },
        },
        uniqueItemProperties: ['name'],
      },
      locale: { type: 'string', examples: ['en', 'fr', 'de'] },
      site_id: { type: 'string' },
      site_url: { type: 'string', examples: ['https://example.com'] },
      display_url: { type: 'string', examples: ['https://example.com'] },
      base_url: { type: 'string' },
      logo_url: { type: 'string', examples: ['https://example.com/images/logo.svg'] },
      media_folder: { type: 'string', examples: ['assets/uploads'] },
      public_folder: { type: 'string', examples: ['/uploads'] },
      media_folder_relative: { type: 'boolean' },
      media_library: {
        type: 'object',
        properties: {
          max_file_size: { type: 'number' },
          folder_support: { type: 'boolean' },
        },
      },
      slug: {
        type: 'object',
        properties: {
          encoding: { type: 'string', enum: ['unicode', 'ascii'] },
          clean_accents: { type: 'boolean' },
          sanitize_replacement: { type: 'string' },
        },
      },
      i18n: i18nRoot,
      local_backend: {
        oneOf: [
          { type: 'boolean' },
          {
            type: 'object',
            properties: {
              url: { type: 'string', examples: ['http://localhost:8081/api/v1'] },
              allowed_hosts: {
                type: 'array',
                items: { type: 'string' },
              },
            },
          },
        ],
      },
      disable_local_backup: { type: 'boolean' },
      editor: {
        type: 'object',
        properties: {
          preview: { type: 'boolean' },
          frame: { type: 'boolean' },
        },
      },
      search: { type: 'string' },
    },
    required: ['backend', 'collections', 'media_folder'],
  };
}

function getWidgetSchemas() {
  const schemas = getWidgets().reduce((acc, widget) => {
    acc[widget.name] = widget.schema ?? {};
    return acc;
  }, {} as Record<string, unknown>);
  return { ...schemas };
}

class ConfigError extends Error {
  constructor(errors: ErrorObject<string, Record<string, unknown>, unknown>[]) {
    const message = errors
      .map(({ message, schemaPath }) => {
        const dotPath = schemaPath
          .slice(1)
          .split('/')
          .map(seg => (seg.match(/^\d+$/) ? `[${seg}]` : `.${seg}`))
          .join('')
          .slice(1);
        return `${dotPath ? `'${dotPath}'` : 'config'} ${message}`;
      })
      .join('\n');

    super(message);
  }

  toString() {
    return this.message;
  }
}

/**
 * `validateConfig` is a pure function. It does not mutate
 * the config that is passed in.
 */
export default function validateConfig(config: Config) {
  const ajv = new AJV({ allErrors: true, allowUnionTypes: true, $data: true });
  uniqueItemProperties(ajv);
  select(ajv);
  instanceOf(ajv);
  prohibited(ajv);
  ajvErrors(ajv);

  const valid = ajv.validate(getConfigSchema(), config);
  if (!valid) {
    const errors = ajv.errors?.map(e => {
      switch (e.keyword) {
        // TODO: remove after https://github.com/ajv-validator/ajv-keywords/pull/123 is merged
        case 'uniqueItemProperties': {
          const path = e.schemaPath || '';
          let newError = e;
          if (path.endsWith('/fields')) {
            newError = { ...e, message: 'fields names must be unique' };
          } else if (path.endsWith('/files')) {
            newError = { ...e, message: 'files names must be unique' };
          } else if (path.endsWith('/collections')) {
            newError = { ...e, message: 'collections names must be unique' };
          }
          return newError;
        }
        case 'instanceof': {
          const path = e.schemaPath || '';
          let newError = e;
          if (/fields\/\d+\/pattern\/\d+/.test(path)) {
            newError = {
              ...e,
              message: 'should be a regular expression',
            };
          }
          return newError;
        }
        default:
          return e;
      }
    });
    console.error('Config Errors', errors);
    throw new ConfigError(errors ?? []);
  }
}
