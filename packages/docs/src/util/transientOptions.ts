import type { CreateMUIStyled } from '@mui/material/styles';

const transientOptions: Parameters<CreateMUIStyled>[1] = {
  shouldForwardProp: (propName: string) => !propName.startsWith('$'),
};

export default transientOptions;
