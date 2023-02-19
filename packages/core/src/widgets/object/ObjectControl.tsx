import React, { useMemo } from 'react';

import EditorControl from '@staticcms/core/components/editor/EditorControlPane/EditorControl';
import { compileStringTemplate } from '@staticcms/core/lib/widgets/stringTemplate';
import { getEntryDataPath } from '@staticcms/core/reducers/selectors/entryDraft';
import ObjectFieldWrapper from './ObjectFieldWrapper';

import type { ObjectField, ObjectValue, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const ObjectControl: FC<WidgetControlProps<ObjectValue, ObjectField>> = ({
  label,
  field,
  fieldsErrors,
  submitted,
  forList,
  isFieldDuplicate,
  isFieldHidden,
  locale,
  path,
  i18n,
  errors,
  value = {},
}) => {
  const objectLabel = useMemo(() => {
    const summary = field.summary;
    return summary ? `${label} - ${compileStringTemplate(summary, null, '', value)}` : label;
  }, [field.summary, label, value]);

  const fields = useMemo(() => field.fields, [field.fields]);

  const hasChildErrors = useMemo(() => {
    const dataPath = getEntryDataPath(i18n);
    const fullPath = `${dataPath}.${path}`;

    return Boolean(Object.keys(fieldsErrors).find(key => key.startsWith(fullPath)));
  }, [fieldsErrors, i18n, path]);

  const renderedField = useMemo(() => {
    return (
      fields?.map((field, index) => {
        let fieldName = field.name;
        let parentPath = path;
        const fieldValue = value && value[fieldName];

        if (forList && fields.length === 1) {
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
            disabled={isDuplicate}
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
    fields,
    path,
    submitted,
    value,
  ]);

  if (fields.length) {
    if (forList) {
      return <>{renderedField}</>;
    }

    return (
      <ObjectFieldWrapper
        key="object-control-wrapper"
        field={field}
        openLabel={label}
        closedLabel={objectLabel}
        errors={errors}
        hasChildErrors={hasChildErrors}
      >
        {renderedField}
      </ObjectFieldWrapper>
    );
  }

  return <div key="no-fields-found">No field(s) defined for this widget</div>;
};

export default ObjectControl;
