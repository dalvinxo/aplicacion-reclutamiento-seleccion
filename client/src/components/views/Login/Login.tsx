import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import LoginForm from './LoginForm';
import LoginIcon from '@mui/icons-material/Login';

export const Login = () => {
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
          //   resize: 'horizontal',
        }}
      >
        {/* <Typography variant="h6" gutterBottom sx={{ padding: '0.7rem', in }}>
          <LoginIcon /> Iniciar Sesión
        </Typography> */}

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
