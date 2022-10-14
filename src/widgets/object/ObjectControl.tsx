import { ClassNames } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';

import EditorControl from '../../components/Editor/EditorControlPane/EditorControl';
import ObjectWidgetTopBar from '../../components/UI/ObjectWidgetTopBar';
import { colors, lengths } from '../../components/UI/styles';
import { compileStringTemplate } from '../../lib/widgets/stringTemplate';

import type {
  Field,
  FieldList,
  FieldObject,
  ObjectValue,
  WidgetControlProps,
} from '../../interface';

const styleStrings = {
  nestedObjectControl: `
    padding: 6px 14px 0;
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `,
  objectWidgetTopBarContainer: `
    padding: ${lengths.objectWidgetTopBarContainerPadding};
  `,
  collapsedObjectControl: `
    display: none;
  `,
};

const StyledFieldsBox = styled.div`
  padding-bottom: 14px;
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
      <ClassNames>
        {({ css, cx }) => (
          <div
            className={cx(
              css`
                ${styleStrings.objectWidgetTopBarContainer}
              `,
              {
                [css`
                  ${styleStrings.nestedObjectControl}
                `]: forList,
              },
              {
                [css`
                  border-color: ${colors.textFieldBorder};
                `]: forList ? !hasError : false,
              },
            )}
          >
            {forList ? null : (
              <ObjectWidgetTopBar
                collapsed={isCollapsed}
                onCollapseToggle={handleCollapseToggle}
                heading={isCollapsed && getObjectLabel()}
                t={t}
              />
            )}
            <StyledFieldsBox
              className={cx({
                [css`
                  ${styleStrings.collapsedObjectControl}
                `]: isCollapsed,
              })}
            >
              {renderFields(multiFields)}
            </StyledFieldsBox>
          </div>
        )}
      </ClassNames>
    );
  }

  return <h3>No field(s) defined for this widget</h3>;
};

export default ObjectControl;
