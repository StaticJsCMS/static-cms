import get from 'lodash/get';

import { CONFIG_SUCCESS } from '../actions/config';

import type { ConfigAction } from '../actions/config';
import type {
  AlgoliaConfig,
  AssetStoreConfig,
  CmsConfig,
  CmsSearchIntegrationProvider,
} from '../interface';

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
          acc.hooks.search = providerData.provider;
          return acc;
        }

        integrationCollections?.forEach(collection => {
          acc.collectionHooks[collection].search = providerData.provider;
        });
      } else if (providerData.provider === 'asset-store') {
        acc.providers[providerData.provider] = providerData;
      }
      return acc;
    },
    { providers: {}, hooks: {} } as IntegrationsState,
  );

  return newState;
}

export interface IntegrationHooks {
  search?: CmsSearchIntegrationProvider;
}

export interface IntegrationsState {
  providers: {
    algolia?: AlgoliaConfig;
    'asset-store'?: AssetStoreConfig;
  };
  hooks: IntegrationHooks;
  collectionHooks: Record<string, IntegrationHooks>;
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
