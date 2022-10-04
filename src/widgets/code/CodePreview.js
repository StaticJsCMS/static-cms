import React from 'react';
import PropTypes from 'prop-types';
import { Record } from 'immutable';
import isString from 'lodash/isString';

import { WidgetPreviewContainer } from '../../ui';

function toValue(value, field) {
  if (isString(value)) {
    return value;
  }
  if (Record.isMap(value)) {
    return value.get(field.getIn(['keys', 'code'], 'code'), '');
  }
  return '';
}

function CodePreview(props) {
  return (
    <WidgetPreviewContainer>
      <pre>
        <code>{toValue(props.value, props.field)}</code>
      </pre>
    </WidgetPreviewContainer>
  );
}

CodePreview.propTypes = {
  value: PropTypes.node,
};

export default CodePreview;
