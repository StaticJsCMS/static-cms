import Typography from '@mui/material/Typography';

import type { FC, ReactNode } from 'react';

interface DeprecatedProps {
  children?: ReactNode;
}

const Deprecated: FC<DeprecatedProps> = ({ children }) => {
  return (
    <Typography
      variant="body2"
      color="error.main"
      component="div"
      sx={{
        display: 'block',
        lineHeight: 1.5,
        fontFamily: 'Consolas,Menlo,Monaco,Andale Mono,Ubuntu Mono,monospace',
        fontSize: '13px',
        fontWeight: 700,
        fontStyle: 'italic',
      }}
    >
      Deprecated.{children ? <>&nbsp;{children}</> : null}
    </Typography>
  );
};

export default Deprecated;
