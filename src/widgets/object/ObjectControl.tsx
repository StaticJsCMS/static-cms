import styled from '@emotion/styled';
import React, { useCallback, useMemo, useState } from 'react';

import EditorControl from '../../components/Editor/EditorControlPane/EditorControl';
import ObjectWidgetTopBar from '../../components/UI/ObjectWidgetTopBar';
import Outline from '../../components/UI/Outline';
import { transientOptions } from '../../lib';
import { compileStringTemplate } from '../../lib/widgets/stringTemplate';

import type { FieldList, FieldObject, ObjectValue, WidgetControlProps } from '../../interface';

const StyledObjectControlWrapper = styled('div')`
  position: relative;
  background: white;
`;

interface StyledFieldsBoxProps {
  $collapsed: boolean;
}

const StyledFieldsBox = styled(
  'div',
  transientOptions,
)<StyledFieldsBoxProps>(
  ({ $collapsed }) => `
    display: flex;
    flex-direction: column;
    gap: 16px;
    ${
      $collapsed
        ? `
          visibility: hidden;
          height: 0;
          width: 0;
        `
        : `
          padding: 16px;
        `
    }
  `,
);

const StyledNoFieldsMessage = styled('div')`
  display: flex;
  padding: 16px;
  width: 100%;
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

  const objectLabel = useMemo(() => {
    const label = field.label ?? field.name;
    const summary = field.summary;
    return summary ? `${label} - ${compileStringTemplate(summary, null, '', value)}` : label;
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
            heading={objectLabel}
            t={t}
          />
        )}
        <StyledFieldsBox $collapsed={collapsed} key="object-control-fields">
          {renderedField}
        </StyledFieldsBox>
        {forList ? null : <Outline key="object-control-outline" hasError={hasError} />}
      </StyledObjectControlWrapper>
    );
  }

  return (
    <StyledNoFieldsMessage key="no-fields-found">
      No field(s) defined for this widget
    </StyledNoFieldsMessage>
  );
};

export default ObjectControl;
