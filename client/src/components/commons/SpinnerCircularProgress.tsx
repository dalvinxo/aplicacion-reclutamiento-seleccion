import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const SpinnerCircularProgress = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
};
