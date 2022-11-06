import { styled } from '@mui/material/styles';
import React, { useCallback, useMemo, useState } from 'react';

import EditorControl from '../../components/Editor/EditorControlPane/EditorControl';
import ObjectWidgetTopBar from '../../components/UI/ObjectWidgetTopBar';
import Outline from '../../components/UI/Outline';
import { transientOptions } from '../../lib';
import { compileStringTemplate } from '../../lib/widgets/stringTemplate';

import type { ObjectField, ObjectValue, WidgetControlProps } from '../../interface';

const StyledObjectControlWrapper = styled('div')`
  position: relative;
  background: white;
  width: 100%;
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
    width: 100%;
    ${
      $collapsed
        ? `
          display: none;
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
}: WidgetControlProps<ObjectValue, ObjectField>) => {
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
        const fieldName = field.name;
        const fieldValue = value && value[fieldName];

        const isDuplicate = isFieldDuplicate && isFieldDuplicate(field);
        const isHidden = isFieldHidden && isFieldHidden(field);

        return (
          <EditorControl
            key={index}
            field={field}
            value={fieldValue}
            fieldsErrors={fieldsErrors}
            submitted={submitted}
            parentPath={path}
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
      <StyledObjectControlWrapper key="object-control-wrapper">
        {forList ? null : (
          <ObjectWidgetTopBar
            key="object-control-top-bar"
            collapsed={collapsed}
            onCollapseToggle={handleCollapseToggle}
            heading={objectLabel}
            hasError={hasErrors}
            t={t}
          />
        )}
        <StyledFieldsBox $collapsed={collapsed} key="object-control-fields">
          {renderedField}
        </StyledFieldsBox>
        {forList ? null : <Outline key="object-control-outline" hasError={hasErrors} />}
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
