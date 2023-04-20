import MuiAlert from '@mui/material/Alert';

import type { AlertProps } from '@mui/material/Alert';

const Alert = ({ children, ...props }: AlertProps) => {
  return (
    <MuiAlert
      {...props}
      sx={{
        borderRadius: '12px',
        lineHeight: '1.5rem',
        fontSize: '16px',
        wordBreak: 'break-word',
        '& p': {
          marginBottom: 0,
          lineHeight: '1.5rem',
          fontSize: '16px',
          wordBreak: 'break-word',
        },
      }}
    >
      {children}
    </MuiAlert>
  );
};

export default Alert;
