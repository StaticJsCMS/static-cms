import React, { useMemo } from 'react';

import EditorControl from '@staticcms/core/components/entry-editor/editor-control-pane/EditorControl';
import useHasChildErrors from '@staticcms/core/lib/hooks/useHasChildErrors';
import { compileStringTemplate } from '@staticcms/core/lib/widgets/stringTemplate';
import ObjectFieldWrapper from './ObjectFieldWrapper';

import type { ObjectField, ObjectValue, WidgetControlProps } from '@staticcms/core/interface';
import type { FC } from 'react';

const ObjectControl: FC<WidgetControlProps<ObjectValue, ObjectField>> = ({
  label,
  field,
  fieldsErrors,
  submitted,
  forList,
  forSingleList,
  duplicate,
  hidden,
  locale,
  path,
  i18n,
  errors,
  disabled,
  value = {},
}) => {
  const objectLabel = useMemo(() => {
    const summary = field.summary;
    return summary ? `${label} - ${compileStringTemplate(summary, null, '', value)}` : label;
  }, [field.summary, label, value]);

  const fields = useMemo(() => field.fields, [field.fields]);

  const hasChildErrors = useHasChildErrors(path, fieldsErrors, i18n, false);

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

        return (
          <EditorControl
            key={index}
            field={field}
            fieldName={fieldName}
            value={fieldValue}
            fieldsErrors={fieldsErrors}
            submitted={submitted}
            parentPath={parentPath}
            disabled={disabled || duplicate}
            parentDuplicate={duplicate}
            parentHidden={hidden}
            locale={locale}
            i18n={i18n}
            forList={forList}
            forSingleList={forSingleList}
          />
        );
      }) ?? null
    );
  }, [
    fields,
    path,
    value,
    forList,
    fieldsErrors,
    submitted,
    disabled,
    duplicate,
    hidden,
    locale,
    i18n,
    forSingleList,
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
        hint={field.hint}
        disabled={disabled}
      >
        {renderedField}
      </ObjectFieldWrapper>
    );
  }

  return <div key="no-fields-found">No field(s) defined for this widget</div>;
};

export default ObjectControl;
