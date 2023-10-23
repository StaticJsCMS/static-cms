import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const DeprecatedImage = () => {
  return (
    <Box
      title="Beta Feature. Use at your own risk"
      sx={{
        width: 81,
        height: 20,
        background: '#ffa726',
        borderRadius: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          lineHeight: '20px',
          color: 'white',
        }}
      >
        Deprecated
      </Typography>
    </Box>
  );
};

export default DeprecatedImage;
