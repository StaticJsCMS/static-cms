import get from 'lodash/get';

import { CONFIG_SUCCESS } from '../actions/config';

import type { ConfigAction } from '../actions/config';
import type {
  AlgoliaConfig,
  AssetStoreConfig,
  CmsConfig,
  CmsMediaIntegrationProvider,
  CmsSearchIntegrationProvider,
} from '../interface';

export interface IntegrationHooks {
  search?: CmsSearchIntegrationProvider;
  listEntries?: CmsSearchIntegrationProvider;
  'assetStore'?: CmsMediaIntegrationProvider;
}

export interface IntegrationsState {
  providers: {
    algolia?: AlgoliaConfig;
    'assetStore'?: AssetStoreConfig;
  };
  hooks: IntegrationHooks;
  collectionHooks: Record<string, IntegrationHooks>;
}

export function getIntegrations(config: CmsConfig): IntegrationsState {
  const integrations = config.integrations || [];
  const newState = integrations.reduce(
    (acc, integration) => {
      const { collections, ...providerData } = integration;
      const integrationCollections =
        collections === '*' ? config.collections.map(collection => collection.name) : collections;

      if (providerData.provider === 'algolia') {
        acc.providers[providerData.provider] = providerData;

        if (!collections) {
          providerData.hooks.forEach(hook => (acc.hooks[hook] = providerData.provider));
          return acc;
        }

        integrationCollections?.forEach(collection => {
          providerData.hooks.forEach(
            hook => (acc.collectionHooks[collection][hook] = providerData.provider),
          );
        });
      } else if (providerData.provider === 'assetStore') {
        acc.providers[providerData.provider] = providerData;
      }
      return acc;
    },
    { providers: {}, hooks: {} } as IntegrationsState,
  );

  return newState;
}

const defaultState: IntegrationsState = { providers: {}, hooks: {}, collectionHooks: {} };

function integrations(
  state: IntegrationsState = defaultState,
  action: ConfigAction,
): IntegrationsState {
  switch (action.type) {
    case CONFIG_SUCCESS: {
      return getIntegrations(action.payload);
    }
    default:
      return state;
  }
}

export function selectIntegration<K extends keyof IntegrationHooks>(
  state: IntegrationsState,
  collection: string | null,
  hook: string,
): IntegrationHooks[K] | false {
  return collection
    ? get(state, ['collectionHooks', collection, hook], false)
    : get(state, ['hooks', hook], false);
}

export default integrations;
