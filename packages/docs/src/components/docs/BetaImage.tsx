import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const BetaImage = () => {
  return (
    <Box
      title="Beta Feature. Use at your own risk"
      sx={{
        width: 81,
        height: 20,
        background: '#0593ca',
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
        Beta Feature
      </Typography>
    </Box>
  );
};

export default BetaImage;
