import Algolia from './providers/algolia/implementation';
import AssetStore from './providers/assetStore/implementation';

import type {
  AlgoliaConfig,
  AssetStoreConfig,
  CmsMediaIntegrationProvider,
  CmsSearchIntegrationProvider,
} from '../interface';

interface IntegrationsConfig {
  providers?: {
    algolia?: AlgoliaConfig;
    assetStore?: AssetStoreConfig;
  };
}

interface Integrations {
  algolia?: Algolia;
  assetStore?: AssetStore;
}

export function resolveIntegrations(
  config: IntegrationsConfig | undefined,
  getToken: () => Promise<string | null>,
) {
  const integrationInstances: Integrations = {};

  if (config?.providers?.algolia) {
    integrationInstances.algolia = new Algolia(config.providers.algolia);
  }

  if (config?.providers?.['assetStore']) {
    integrationInstances['assetStore'] = new AssetStore(config.providers['assetStore'], getToken);
  }

  return integrationInstances;
}

export const getSearchIntegrationProvider = (function () {
  let integrations: Integrations = {};

  return (
    config: IntegrationsConfig | undefined,
    getToken: () => Promise<string | null>,
    provider: CmsSearchIntegrationProvider,
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

export const getMediaIntegrationProvider = (function () {
  let integrations: Integrations = {};

  return (
    config: IntegrationsConfig | undefined,
    getToken: () => Promise<string | null>,
    provider: CmsMediaIntegrationProvider,
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
