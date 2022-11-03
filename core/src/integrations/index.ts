import Algolia from './providers/algolia/implementation';

import type { AlgoliaConfig, SearchIntegrationProvider } from '../interface';

interface IntegrationsConfig {
  providers?: {
    algolia?: AlgoliaConfig;
  };
}

interface Integrations {
  algolia?: Algolia;
}

export function resolveIntegrations(
  config: IntegrationsConfig | undefined,
) {
  const integrationInstances: Integrations = {};

  if (config?.providers?.algolia) {
    integrationInstances.algolia = new Algolia(config.providers.algolia);
  }

  return integrationInstances;
}

export const getSearchIntegrationProvider = (function () {
  let integrations: Integrations = {};

  return (
    config: IntegrationsConfig | undefined,
    provider: SearchIntegrationProvider,
  ) => {
    if (provider in (config?.providers ?? {}))
      if (integrations) {
        return integrations[provider];
      } else {
        integrations = resolveIntegrations(config);
        return integrations[provider];
      }
  };
})();
