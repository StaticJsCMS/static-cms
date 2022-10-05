import Algolia from './providers/algolia/implementation';
import AssetStore from './providers/assetStore/implementation';

import type { AlgoliaConfig, AssetStoreConfig, CmsIntegrationProvider } from '../interface';

interface IntegrationsConfig {
  providers?: {
    algolia?: AlgoliaConfig;
    'asset-store'?: AssetStoreConfig;
  };
}

interface Integrations {
  algolia?: Algolia;
  'asset-store'?: AssetStore;
}

export function resolveIntegrations(
  config: IntegrationsConfig | undefined,
  getToken: () => Promise<string | null>,
) {
  const integrationInstances: Integrations = {};

  if (config?.providers?.algolia) {
    integrationInstances.algolia = new Algolia(config.providers.algolia);
  }

  if (config?.providers?.['asset-store']) {
    integrationInstances['asset-store'] = new AssetStore(config.providers['asset-store'], getToken);
  }

  return integrationInstances;
}

export const getSearchIntegration = (function () {
  let integrations: Integrations = {};

  return (
    config: IntegrationsConfig | undefined,
    getToken: () => Promise<string | null>,
    provider: 'algolia',
  ) => {
    if (provider in (config?.providers ?? {}))
      if (integrations) {
        return integrations[provider];
      } else {
        integrations = resolveIntegrations(config, getToken);
        return integrations[provider];
      }
  };
})();

export const getIntegrationProvider = (function () {
  let integrations: Integrations = {};

  return (
    config: IntegrationsConfig | undefined,
    getToken: () => Promise<string | null>,
    provider: CmsIntegrationProvider,
  ) => {
    if (provider in (config?.providers ?? {}))
      if (integrations) {
        return integrations[provider];
      } else {
        integrations = resolveIntegrations(config, getToken);
        return integrations[provider];
      }
  };
})();
