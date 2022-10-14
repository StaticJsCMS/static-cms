import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';

import EditorControl from '../../components/Editor/EditorControlPane/EditorControl';
import ObjectWidgetTopBar from '../../components/UI/ObjectWidgetTopBar';
import Outline from '../../components/UI/Outline';
import { compileStringTemplate } from '../../lib/widgets/stringTemplate';

import type {
  Field,
  FieldList,
  FieldObject,
  ObjectValue,
  WidgetControlProps,
} from '../../interface';

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

  const controlFor = useCallback(
    (field: Field, key: number) => {
      if (field.widget === 'hidden') {
        return null;
      }
      const fieldName = field.name;
      const fieldValue = value && value[fieldName];

      const isDuplicate = isFieldDuplicate && isFieldDuplicate(field);
      const isHidden = isFieldHidden && isFieldHidden(field);

      return (
        <EditorControl
          key={key}
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
    },
    [
      clearFieldErrors,
      fieldsErrors,
      isFieldDuplicate,
      isFieldHidden,
      locale,
      onChange,
      onValidate,
      path,
      value,
    ],
  );

  const handleCollapseToggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const renderFields = useCallback(
    (multiFields: Field[]) => {
      if (multiFields) {
        return multiFields.map((f, idx) => controlFor(f, idx));
      }
    },
    [controlFor],
  );

  const getObjectLabel = useCallback(() => {
    const label = field.label ?? field.name;
    const summary = field.summary;
    return summary ? compileStringTemplate(summary, null, '', value) : label;
  }, [field.label, field.name, field.summary, value]);

  const isCollapsed = forList ? collapsed : collapsed;
  const multiFields = field.fields;

  if (multiFields) {
    return (
      <StyledObjectControlWrapper>
        {forList ? null : (
          <ObjectWidgetTopBar
            collapsed={isCollapsed}
            onCollapseToggle={handleCollapseToggle}
            heading={isCollapsed && getObjectLabel()}
            t={t}
          />
        )}
        <StyledFieldsBox>{renderFields(multiFields)}</StyledFieldsBox>
        {forList ? null : <Outline hasError={hasError} />}
      </StyledObjectControlWrapper>
    );
  }

  return <h3>No field(s) defined for this widget</h3>;
};

export default ObjectControl;
