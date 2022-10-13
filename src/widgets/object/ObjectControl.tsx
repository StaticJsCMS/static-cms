import { ClassNames } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';

import EditorControl from '../../components/Editor/EditorControlPane/EditorControl';
import { stringTemplate } from '../../lib/widgets';
import { colors, lengths, ObjectWidgetTopBar } from '../../ui';

import type {
  CmsField,
  CmsFieldList,
  CmsFieldObject,
  CmsWidgetControlProps,
  ValueOrNestedValue,
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
  value = {},
  field,
  forID,
  forList,
  hasError,
  onChangeObject,
  onValidateObject,
  clearFieldErrors,
  fieldsErrors,
  parentIds,
  isFieldDuplicate,
  isFieldHidden,
  locale,
  t,
}: CmsWidgetControlProps<
  {
    [key: string]: ValueOrNestedValue;
  },
  CmsFieldObject | CmsFieldList
>) => {
  const [collapsed, setCollapsed] = useState(false);

  // TODO Implement object validation
  // componentValidate = {};

  // validate = () => {
  //   const { field } = this.props;
  //   let fields = field.field || field.fields;
  //   fields = List.isList(fields) ? fields : List([fields]);
  //   fields.forEach(field => {
  //     if (field.widget === 'hidden') return;
  //     this.componentValidate[field.name]();
  //   });
  // };

  const controlFor = useCallback(
    (field: CmsField, key: number) => {
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
          onChange={onChangeObject}
          clearFieldErrors={clearFieldErrors}
          fieldsErrors={fieldsErrors}
          onValidate={onValidateObject}
          parentIds={parentIds}
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
      onChangeObject,
      onValidateObject,
      parentIds,
      value,
    ],
  );

  const handleCollapseToggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const renderFields = useCallback(
    (multiFields: CmsField[]) => {
      if (multiFields) {
        return multiFields.map((f, idx) => controlFor(f, idx));
      }
    },
    [controlFor],
  );

  const getObjectLabel = useCallback(() => {
    const label = field.label ?? field.name;
    const summary = field.summary;
    return summary ? stringTemplate.compileStringTemplate(summary, null, '', value) : label;
  }, [field.label, field.name, field.summary, value]);

  const isCollapsed = forList ? collapsed : collapsed;
  const multiFields = field.fields;

  if (multiFields) {
    return (
      <ClassNames>
        {({ css, cx }) => (
          <div
            id={forID}
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
