import { useMemo } from 'react';

import defaultWidgetRules from '../config/widgetRules';

import type { WidgetRulesFactory, WidgetRulesFactoryProps } from '../../../interface';

const useWidgetRules = (
  widgetRules: WidgetRulesFactory | undefined,
  { getAsset, field }: WidgetRulesFactoryProps,
) => {
  return useMemo(() => {
    const rules = defaultWidgetRules({ getAsset, field });
    if (widgetRules) {
      rules.push(...widgetRules({ getAsset, field }));
    }
    return rules;
  }, [field, getAsset, widgetRules]);
};

export default useWidgetRules;
