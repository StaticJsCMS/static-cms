import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Toggle } from '../../ui';

export default class BooleanControl extends React.Component {
  render() {
    const { value, forID, onChange, classNameWrapper, setActiveStyle, setInactiveStyle } =
      this.props;
    return (
      <div className={classNameWrapper}>
        <Toggle
          id={forID}
          active={value}
          onChange={onChange}
          onFocus={setActiveStyle}
          onBlur={setInactiveStyle}
        />
      </div>
    );
  }
}

BooleanControl.propTypes = {
  field: ImmutablePropTypes.map.isRequired,
  onChange: PropTypes.func.isRequired,
  classNameWrapper: PropTypes.string.isRequired,
  setActiveStyle: PropTypes.func.isRequired,
  setInactiveStyle: PropTypes.func.isRequired,
  forID: PropTypes.string,
  value: PropTypes.bool,
};

BooleanControl.defaultProps = {
  value: false,
};
