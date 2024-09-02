import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import LoginForm from './LoginForm';
import LoginIcon from '@mui/icons-material/Login';
import { useAppSelector } from '../../../store/hook';
import { Navigate, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '../../../features/auth/authSlice';

export const Login = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!!user) {
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Card
        variant="outlined"
        sx={{
          maxHeight: 'max-content',
          maxWidth: '100%',
          backgroundColor: 'inherit',
          mx: 'auto',
          overflow: 'auto',
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0.7rem',
          }}
        >
          <LoginIcon sx={{ marginRight: '0.5rem' }} />
          Inicio Sesión
        </Typography>

        <Divider />

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </Box>
  );
};
