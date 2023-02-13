import React, { useCallback, useMemo, useState } from 'react';

import EditorControl from '@staticcms/core/components/editor/EditorControlPane/EditorControl';
import ObjectWidgetTopBar from '@staticcms/core/components/UI/ObjectWidgetTopBar';
import Outline from '@staticcms/core/components/UI/Outline';
import { compileStringTemplate } from '@staticcms/core/lib/widgets/stringTemplate';
import { getEntryDataPath } from '@staticcms/core/reducers/selectors/entryDraft';

import type { ObjectField, ObjectValue, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const ObjectControl: FC<WidgetControlProps<ObjectValue, ObjectField>> = ({
  field,
  fieldsErrors,
  submitted,
  forList,
  isFieldDuplicate,
  isFieldHidden,
  locale,
  path,
  t,
  i18n,
  hasErrors,
  value = {},
}) => {
  const [collapsed, setCollapsed] = useState(field.collapsed ?? false);

  const handleCollapseToggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const objectLabel = useMemo(() => {
    const label = field.label ?? field.name;
    const summary = field.summary;
    return summary ? `${label} - ${compileStringTemplate(summary, null, '', value)}` : label;
  }, [field.label, field.name, field.summary, value]);

  const multiFields = useMemo(() => field.fields, [field.fields]);

  const childHasError = useMemo(() => {
    const dataPath = getEntryDataPath(i18n);
    const fullPath = `${dataPath}.${path}`;

    return Boolean(Object.keys(fieldsErrors).find(key => key.startsWith(fullPath)));
  }, [fieldsErrors, i18n, path]);

  const renderedField = useMemo(() => {
    return (
      multiFields?.map((field, index) => {
        let fieldName = field.name;
        let parentPath = path;
        const fieldValue = value && value[fieldName];

        if (forList && multiFields.length === 1) {
          const splitPath = path.split('.');
          fieldName = splitPath.pop() ?? field.name;
          parentPath = splitPath.join('.');
        }

        const isDuplicate = isFieldDuplicate && isFieldDuplicate(field);
        const isHidden = isFieldHidden && isFieldHidden(field);

        return (
          <EditorControl
            key={index}
            field={field}
            fieldName={fieldName}
            value={fieldValue}
            fieldsErrors={fieldsErrors}
            submitted={submitted}
            parentPath={parentPath}
            isDisabled={isDuplicate}
            isHidden={isHidden}
            isFieldDuplicate={isFieldDuplicate}
            isFieldHidden={isFieldHidden}
            locale={locale}
            i18n={i18n}
          />
        );
      }) ?? null
    );
  }, [
    fieldsErrors,
    forList,
    i18n,
    isFieldDuplicate,
    isFieldHidden,
    locale,
    multiFields,
    path,
    submitted,
    value,
  ]);

  if (multiFields) {
    return (
      <div key="object-control-wrapper">
        {forList ? null : (
          <ObjectWidgetTopBar
            key="object-control-top-bar"
            collapsed={collapsed}
            onCollapseToggle={handleCollapseToggle}
            heading={objectLabel}
            hasError={hasErrors || childHasError}
            t={t}
            testId="object-title"
          />
        )}
        <div key="object-control-fields">
          {/* TODO $collapsed={collapsed} */}
          {renderedField}
        </div>
        {forList ? null : (
          <Outline key="object-control-outline" hasError={hasErrors || childHasError} />
        )}
      </div>
    );
  }

  return <div key="no-fields-found">No field(s) defined for this widget</div>;
};

export default ObjectControl;
