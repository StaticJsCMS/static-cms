import Box from '@mui/material/Box';

import type { ReactNode } from 'react';

interface TemplatesProps {
  children: ReactNode;
}

const Templates = ({ children }: TemplatesProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '24px',
        marginBottom: '16px',
      }}
    >
      {children}
    </Box>
  );
};

export default Templates;
