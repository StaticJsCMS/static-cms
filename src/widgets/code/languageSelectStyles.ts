import { reactSelectStyles, borders } from '../../components/UI/styles';

import type { CSSProperties } from 'react';
import type { OptionStyleState } from '../../components/UI/styles';

const languageSelectStyles = {
  ...reactSelectStyles,
  container: (provided: CSSProperties) => ({
    ...reactSelectStyles.container(provided),
    'margin-top': '2px',
  }),
  control: (provided: CSSProperties) => ({
    ...reactSelectStyles.control(provided),
    border: borders.textField,
    padding: 0,
    fontSize: '13px',
    minHeight: 'auto',
  }),
  dropdownIndicator: (provided: CSSProperties) => ({
    ...reactSelectStyles.dropdownIndicator(provided),
    padding: '4px',
  }),
  option: (provided: CSSProperties, state: OptionStyleState) => ({
    ...reactSelectStyles.option(provided, state),
    padding: 0,
    paddingLeft: '8px',
  }),
  menu: (provided: CSSProperties) => ({
    ...reactSelectStyles.menu(provided),
    margin: '2px 0',
  }),
  menuList: (provided: CSSProperties) => ({
    ...provided,
    'max-height': '200px',
  }),
};

export default languageSelectStyles;
