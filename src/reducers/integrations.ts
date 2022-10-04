import get from 'lodash/get';

import { CONFIG_SUCCESS } from '../actions/config';

import type { ConfigAction } from '../actions/config';
import type { CmsConfig } from '../interface';

export function getIntegrations(config: CmsConfig): IntegrationsState {
  const integrations = config.integrations || [];
  const newState = integrations.reduce(
    (acc, integration) => {
      const { hooks, collections, provider, ...providerData } = integration;
      acc.providers[provider] = { ...providerData };
      if (!collections) {
        hooks.forEach(hook => {
          acc.hooks[hook] = provider;
        });
        return acc;
      }
      const integrationCollections =
        collections === '*' ? config.collections.map(collection => collection.name) : collections;
      integrationCollections.forEach(collection => {
        hooks.forEach(hook => {
          acc.hooks[collection]
            ? ((acc.hooks[collection] as Record<string, string>)[hook] = provider)
            : (acc.hooks[collection] = { [hook]: provider });
        });
      });
      return acc;
    },
    { providers: {}, hooks: {} } as IntegrationsState,
  );

  return newState;
}

export interface IntegrationsState {
  providers: Record<string, Record<string, unknown>>;
  hooks: { [collectionOrHook: string]: string | Record<string, string> };
}

const defaultState: IntegrationsState = { providers: {}, hooks: {} };

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

export function selectIntegration(
  state: IntegrationsState,
  collection: string | null,
  hook: string,
): string {
  return collection
    ? get(state, ['hooks', collection, hook], false)
    : get(state, ['hooks', hook], false);
}

export default integrations;
