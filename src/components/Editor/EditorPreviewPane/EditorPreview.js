import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';

function isVisible(field) {
  return field.widget !== 'hidden';
}

const PreviewContainer = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  font-family: Roboto, 'Helvetica Neue', HelveticaNeue, Helvetica, Arial, sans-serif;
`;

/**
 * Use a stateful component so that child components can effectively utilize
 * `shouldComponentUpdate`.
 */
export default class Preview extends React.Component {
  render() {
    const { collection, fields, widgetFor } = this.props;
    if (!collection || !fields) {
      return null;
    }
    return (
        <PreviewContainer>
          {fields.filter(isVisible).map(field => (
            <div key={field.name}>{widgetFor(field.name)}</div>
          ))}
        </PreviewContainer>
    );
  }
}

Preview.propTypes = {
  collection: ImmutablePropTypes.map.isRequired,
  entry: ImmutablePropTypes.map.isRequired,
  fields: ImmutablePropTypes.list.isRequired,
  getAsset: PropTypes.func.isRequired,
  widgetFor: PropTypes.func.isRequired,
};
