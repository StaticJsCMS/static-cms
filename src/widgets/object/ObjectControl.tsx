import styled from '@emotion/styled';
import React, { useCallback, useMemo, useState } from 'react';

import EditorControl from '../../components/Editor/EditorControlPane/EditorControl';
import ObjectWidgetTopBar from '../../components/UI/ObjectWidgetTopBar';
import Outline from '../../components/UI/Outline';
import { compileStringTemplate } from '../../lib/widgets/stringTemplate';

import type { FieldList, FieldObject, ObjectValue, WidgetControlProps } from '../../interface';

const StyledObjectControlWrapper = styled('div')`
  position: relative;
  background: white;
`;

const StyledFieldsBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
`;

const ObjectControl = ({
  clearFieldErrors,
  field,
  fieldsErrors,
  forList,
  hasError,
  isFieldDuplicate,
  isFieldHidden,
  locale,
  onChange,
  onValidate,
  path,
  t,
  value = {},
}: WidgetControlProps<ObjectValue, FieldObject | FieldList>) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapseToggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const getObjectLabel = useCallback(() => {
    const label = field.label ?? field.name;
    const summary = field.summary;
    return summary ? compileStringTemplate(summary, null, '', value) : label;
  }, [field.label, field.name, field.summary, value]);

  const multiFields = useMemo(() => field.fields, [field.fields]);

  const renderedField = useMemo(() => {
    return (
      multiFields?.map((field, index) => {
        if (field.widget === 'hidden') {
          return null;
        }
        const fieldName = field.name;
        const fieldValue = value && value[fieldName];

        const isDuplicate = isFieldDuplicate && isFieldDuplicate(field);
        const isHidden = isFieldHidden && isFieldHidden(field);

        return (
          <EditorControl
            key={index}
            field={field}
            value={fieldValue}
            onChange={onChange}
            clearFieldErrors={clearFieldErrors}
            fieldsErrors={fieldsErrors}
            onValidate={onValidate}
            parentPath={path}
            isDisabled={isDuplicate}
            isHidden={isHidden}
            isFieldDuplicate={isFieldDuplicate}
            isFieldHidden={isFieldHidden}
            locale={locale}
          />
        );
      }) ?? null
    );
  }, [
    clearFieldErrors,
    fieldsErrors,
    isFieldDuplicate,
    isFieldHidden,
    locale,
    multiFields,
    onChange,
    onValidate,
    path,
    value,
  ]);

  if (multiFields) {
    return (
      <StyledObjectControlWrapper key="object-control-wrapper">
        {forList ? null : (
          <ObjectWidgetTopBar
            key="object-control-top-bar"
            collapsed={collapsed}
            onCollapseToggle={handleCollapseToggle}
            heading={collapsed && getObjectLabel()}
            t={t}
          />
        )}
        <StyledFieldsBox key="object-control-fields">{renderedField}</StyledFieldsBox>
        {forList ? null : <Outline key="object-control-outline" hasError={hasError} />}
      </StyledObjectControlWrapper>
    );
  }

  return <h3>No field(s) defined for this widget</h3>;
};

export default ObjectControl;
